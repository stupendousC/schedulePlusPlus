import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ToastUndo from './ToastUndo';
import Accordion from 'react-bootstrap/Accordion';
import { isPhoneValid, isEmailValid, convertToValidPhoneNumberIfInParens, convertToValidPhoneNumberIfAllNums } from './Helpers';


///////////////////// People can be either admins, employees, or clients /////////////////////
const PeopleTable = ({personType, peopleList, URL_endpoint, setStateKey, updatePeopleListCB }) => {
  const [personSpotlight, setPersonSpotlight] = useState(null);
  const [updateSpotlightBool, setUpdateSpotlightBool] = useState(false);
  const [updatedPerson, setUpdatedPerson] = useState(null);
  const [newPerson, setNewPerson] = useState({name: null, phone: null, email: null, address: null, active: true});
  const [addFormErrorMsgs, setAddFormErrorMsgs] = useState([]);
  const [updateFormErrorMsgs, setUpdateFormErrorMsgs] = useState([]);

  // no useState on the following b/c that's asynch AND I don't need re-rendering for it
  let personInPurgatory = null;

  // need this for adding new people
  const uuidv4 = require('uuid/v4');

  const showAll = (peopleList) => {
    return ( peopleList.map((person, i) => {
      return (
        <section key={i} className="margin-all-1rem">
          <section className="peopleTable">
            <section>{person.name}</section>
            <section><button onClick={() => read(i, peopleList)} className="btn btn-primary">Info</button></section>
            <section><button onClick={() => update(i, peopleList)} className="btn btn-warning">Update</button></section>
            <section><button onClick={() => deactivate(person)} className="btn btn-danger">Deactivate</button></section>
          </section>
          <section>
            {personSpotlight === person ? showPersonSpotlight(person):null}
          </section>
        </section>
      )})
    );
  }

  const showPersonSpotlight = (person) => {
    if (updateSpotlightBool === true) {
      return (
        <form className="margin-all-1rem">
          <fieldset>
            <section className="form-group">
              <label>NAME</label>
              <input type="text" className="form-control" name="name" placeholder={person.name} onChange={onUpdateFieldChange}/>
              <label>ADDRESS</label>
              <input type="text" className="form-control" name="address" placeholder={person.address} onChange={onUpdateFieldChange}/>
              <label>PHONE</label>
              <input type="text" className="form-control" name="phone" placeholder={person.phone} onChange={onUpdateFieldChange}/>
              <label>EMAIL</label>
              <input type="text" className="form-control" name="email" placeholder={person.email} onChange={onUpdateFieldChange}/>
            </section>

            <section className="margin-all-1rem">
              {updateFormErrorMsgs === [] ? null : showErrorMsgs(updateFormErrorMsgs)}
              <button onClick={sendUpdateAPI} className="btn btn-primary">UPDATE</button>
            </section>
          </fieldset>
        </form>
      );
    } else { 
      // read only
      return (
        <section className={`card-person lightblue-bg`}>
          <p>ID</p>
          <p>{person.id}</p> 
          <p>NAME</p>
          <p>{person.name}</p> 
          <p>PHONE</p>
          <p>{person.phone}</p> 
          <p>EMAIL</p>
          <p>{person.email}</p> 
          <p>ADDRESS</p>
          <p>{person.address}</p> 
          <p>UUID (for 1st time login)</p>
          <p>{person.uuid}</p> 
        </section>
    );
    }
  }

  ////////////////////// ADD person //////////////////////
  const showAddSection = () => {
    const uuid = uuidv4();

    return (
      <Accordion>
      <section>
        <Accordion.Toggle eventKey="showForm" className={`accordion-toggle_button gold-bg`}>
            <section className="margin-all-1rem capitalize">
              ▼ add new {personType} ▼
            </section>
        </Accordion.Toggle>

        <Accordion.Collapse eventKey="showForm">
        <form className="margin-all-1rem lightgold-bg">
          <fieldset>
            <section className="margin-all-1rem form-group">
              <label>NAME</label>
              <input type="text" className="form-control" name="name" onChange={onAddFieldChange}/>
              <label>ADDRESS</label>
              <input type="text" className="form-control" name="address" onChange={onAddFieldChange}/>
              <label>PHONE</label>
              <input type="text" className="form-control" name="phone" onChange={onAddFieldChange}/>
              <label>EMAIL</label>
              <input type="text" className="form-control" name="email" onChange={onAddFieldChange}/>
              <label>UUID</label>
              <input type="text" className="form-control" disabled name="uuid" placeholder={uuid}/>
            </section>
            <section className="centered-children-per-row_container margin-all-1rem">
              {addFormErrorMsgs === [] ? null : showErrorMsgs(addFormErrorMsgs)}
              <button onClick={sendAddAPI} className="btn btn-primary">ADD</button>
            </section>
          </fieldset>
        </form>
        </Accordion.Collapse>

      </section>
    </Accordion>
    );
  }

  const onAddFieldChange = (e) => {
    newPerson[e.target.name] = e.target.value;
    setNewPerson(newPerson);
  }

  const sendAddAPI = (e) => {
    e.preventDefault();

    if (!isFormValid(newPerson, setAddFormErrorMsgs)) return;
    
    axios.post(URL_endpoint, newPerson)
    .then(response => {
      toast.success(`${newPerson.name} added successfully`);
      const updatedPeopleList = [...peopleList];
      updatedPeopleList.push(newPerson);
      updatePeopleListCB(setStateKey, updatedPeopleList)})
    .catch(error => toast.error(`ERROR: ${error.message}`));
  }
  ////////////////////// FORM VALIDATION //////////////////////
  const isFormValid = (newOrUpdatedPerson, setAddOrUpdatedFormMsgs) => {
    let errorMsgs = [];

    // name must be present
    if (newOrUpdatedPerson.name === "" || !newOrUpdatedPerson.name) {
      errorMsgs.push("Name cannot be blank");
    }

    // if phone given, make sure it's correct format
    if (newOrUpdatedPerson.phone && newOrUpdatedPerson.phone !== "") {
      if (!isPhoneValid(newOrUpdatedPerson.phone)) {
        // if phone is actually in technically correct format of (425)111-2222, then we'll convert it to correct format of 425-111-2222 for user
        const correctedPhoneNum = convertToValidPhoneNumberIfInParens(newOrUpdatedPerson.phone);
        if (correctedPhoneNum) {
          newOrUpdatedPerson.phone = correctedPhoneNum;
        } else {
          errorMsgs.push(`Phone number format invalid`);
        }
      } else {
        // convert from format of '4251112222' or '14251112222' to 425-111-2222 for readability
        const newReadablePhone = convertToValidPhoneNumberIfAllNums(newOrUpdatedPerson.phone);
        newOrUpdatedPerson.phone = newReadablePhone;
      }
    }

    // if email given, make sure it's correct format
    if (newOrUpdatedPerson.email && newOrUpdatedPerson.email !== "") {
      if (!isEmailValid(newOrUpdatedPerson.email)) {
        errorMsgs.push(`Email invalid`);
      }
    }

    setAddOrUpdatedFormMsgs(errorMsgs);
    return (errorMsgs.length === 0 ? true : false);
  }

  const showErrorMsgs = (addOrUpdatedFormMsgs) => {
    const rowsOfMsgs = addOrUpdatedFormMsgs.map( (msg,i) => {
      return (
        <li key={i} className="centered-text">{msg}</li>
      );
    });

    return (
      <ul className="centered-children-per-row_container">{rowsOfMsgs}</ul>
    );
  }

  ////////////////////// READ person //////////////////////
  const toggleAsPersonSpotlight = (selectedPerson) => {
    if (personSpotlight === selectedPerson) {
      setPersonSpotlight("");
    } else {
      setPersonSpotlight(selectedPerson);
      setUpdateFormErrorMsgs([]);
    }   
  }

  const read = (i, peopleList) => {
    const selectedPerson = peopleList[i];
    toggleAsPersonSpotlight(selectedPerson);

    setUpdateSpotlightBool(false);
  }

  ////////////////////// UPDATE person //////////////////////
  const update = (i, peopleList) => {
    const selectedPerson = peopleList[i];
    toggleAsPersonSpotlight(selectedPerson);

    setUpdateSpotlightBool(true);
    const copiedPerson = JSON.parse(JSON.stringify(selectedPerson));
    setUpdatedPerson(copiedPerson);
  }

  const onUpdateFieldChange = (e) => {
    updatedPerson[e.target.name] = e.target.value;
    setUpdatedPerson(updatedPerson);
  }

  const sendUpdateAPI = (e) => {
    e.preventDefault();

    if (!isFormValid(updatedPerson, setUpdateFormErrorMsgs)) return;
    
    axios.put(`${URL_endpoint}/${updatedPerson.id}`, updatedPerson)
    .then( response => {
      toast.success(`${updatedPerson.name} updated successfully`);
      const updatedPeopleList = peopleList.map(person => {
        if (person.id === updatedPerson.id) {
          return response.data;
        } else {
          return person;
        }
      });
      updatePeopleListCB(setStateKey, updatedPeopleList)
    }
    )
    .catch(error => toast.error(`ERROR: ${error.message}`));
  }

  ////////////////////// DEACTIVATE person //////////////////////
  const deactivate = (person) => {
    setPersonSpotlight("");
    personInPurgatory = person;

    console.log("\n\nTODO: If employee, need to reopen shifts they alreay committed to!!! and inform employees!!!");
    console.log("TODO: If client, need to close shifts they alreay committed to!!! and inform employees!!!");

    toast(<ToastUndo undo={undo} message={`Deleting ${person.name}`}/>, {
      // hook will be called when the component unmount
      onClose: sendDeleteAPIOrNot
    });
  }

  const undo = () => {
    personInPurgatory = null;
  }

  const sendDeleteAPIOrNot = () => {
    if (!personInPurgatory) {
      return;
    }

    // if there's really a person to deactivate
    axios.delete(URL_endpoint + "/" + personInPurgatory.id)
    .then(response => {
      const updatedPeopleList = peopleList.filter( p => p !== personInPurgatory );
      updatePeopleListCB(setStateKey, updatedPeopleList);
    })
    .catch(error => toast.error(`ERROR: ${error.message}`));
  }

  //////////////////////////// render ////////////////////////////
  return (
    <section>
      <h1 className="text-centered margin-all-1rem">ALL {personType.toUpperCase()}S</h1>
      {showAddSection()}
      {showAll(peopleList)}
    </section>
  );

}


export default PeopleTable;