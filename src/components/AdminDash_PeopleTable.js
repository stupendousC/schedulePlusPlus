import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ToastUndo from './ToastUndo';
import Accordion from 'react-bootstrap/Accordion';


///////////////////// People can be either admins, employees, or clients /////////////////////
const PeopleTable = ({title, peopleList, URL_endpoint, setStateKey, updatePeopleListCB }) => {
  const [personSpotlight, setPersonSpotlight] = useState(null);
  const [updateSpotlightBool, setUpdateSpotlightBool] = useState(false);
  const [updatedPerson, setUpdatedPerson] = useState(null);

  // not gonna useState on the following b/c that's asynch AND I don't need re-rendering for it
  let personInPurgatory = null;

  // need this for adding new people
  const uuidv4 = require('uuid/v4');

  const showAll = (peopleList, URL_endpoint) => {
    return ( peopleList.map((person, i) => {
      return (
        <section key={i} className="margin-all-1rem">
          <section className="peopleTable">
            <section>{person.name}</section>
            <section><button onClick={() => read(i, peopleList)} className="btn btn-primary">Info</button></section>
            <section><button onClick={() => update(i, peopleList)} className="btn btn-warning">Update</button></section>
            <section><button onClick={() => deactivate(person, URL_endpoint)} className="btn btn-danger">Deactivate</button></section>
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
            <div className="form-group">
              <label>NAME</label>
              <input type="text" className="form-control" name="name" placeholder={person.name} onChange={onUpdateFieldChange}/>
              <label>Address</label>
              <input type="text" className="form-control" name="address" placeholder={person.address} onChange={onUpdateFieldChange}/>
              <label>Phone</label>
              <input type="text" className="form-control" name="phone" placeholder={person.phone} onChange={onUpdateFieldChange}/>
              <label>Email</label>
              <input type="text" className="form-control" name="email" placeholder={person.email} onChange={onUpdateFieldChange}/>
            </div>
            <button onClick={sendUpdateAPI} className="btn btn-primary">UPDATE</button>
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
  const showAddButton = () => {
    const uuid = uuidv4();

    return (
      <Accordion>
      <section>
        <Accordion.Toggle eventKey="showForm" className={`accordion-toggle_button gold-bg`}>
            <section className="margin-all-1rem">
              ▼ Add New Person ▼
            </section>
        </Accordion.Toggle>

        <Accordion.Collapse eventKey="showForm">
        <form className="margin-all-1rem lightgold-bg">
          <fieldset>
            <div className="form-group">
              <label>NAME</label>
              <input type="text" className="form-control" name="name" onChange={onAddFieldChange}/>
              <label>Address</label>
              <input type="text" className="form-control" name="address" onChange={onAddFieldChange}/>
              <label>Phone</label>
              <input type="text" className="form-control" name="phone" onChange={onAddFieldChange}/>
              <label>Email</label>
              <input type="text" className="form-control" name="email" onChange={onAddFieldChange}/>
            </div>
            <button onClick={sendUpdateAPI} className="btn btn-primary">READ ONLY FOR NOW</button>
          </fieldset>
        </form>
        </Accordion.Collapse>

      </section>
    </Accordion>
    );
  }

  const onAddFieldChange = () => {
    console.log("adding");
  }

  ////////////////////// READ person //////////////////////
  const toggleAsPersonSpotlight = (selectedPerson) => {
    if (personSpotlight === selectedPerson) {
      setPersonSpotlight("");
    } else {
      setPersonSpotlight(selectedPerson);
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
    // console.log("input: ", e.target.name, "-->", e.target.value);
    updatedPerson[e.target.name] = e.target.value;
    setUpdatedPerson(updatedPerson);
  }

  const sendUpdateAPI = (e) => {
    e.preventDefault();
    console.log("UPDATED PERSON = ", updatedPerson);
    console.log("personspotlight =", personSpotlight);

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
      <h1 className="text-centered margin-all-1rem">{title}</h1>
      {showAddButton()}
      {showAll(peopleList, URL_endpoint)}
    </section>
  );

}


export default PeopleTable;