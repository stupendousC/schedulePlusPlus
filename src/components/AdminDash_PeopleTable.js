import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ToastUndo from './ToastUndo';


///////////////////// People can be either admins, employees, or clients /////////////////////
const PeopleTable = ({title, peopleList, URL_endpoint, setStateKey, updatePeopleListCB }) => {
  const [personSpotlight, setPersonSpotlight] = useState("");
  const [updateSpotlightBool, setUpdateSpotlightBool] = useState(false);

  // not gonna useState on the following b/c that's asynch AND I don't need re-rendering for it
  let personInPurgatory = null;

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
              <input type="text" className="form-control" placeholder={person.name}/>
              <label>Address</label>
              <input type="text" className="form-control" placeholder={person.address}/>
              <label>Phone</label>
              <input type="text" className="form-control" placeholder={person.phone}/>
              <label>Email</label>
              <input type="text" className="form-control" placeholder={person.email}/>
            </div>
            <button onClick={sendUpdateAPI} className="btn btn-primary">READ ONLY FOR NOW</button>
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
  ////////////////////// read/update/deactivate //////////////////////
  const toggleAsPersonSpotlight = (selectedPerson) => {
    if (personSpotlight === selectedPerson) {
      setPersonSpotlight("");
    } else {
      setPersonSpotlight(selectedPerson);
    }   
  }

  const read = (i, peopleList) => {
    const selectedPerson = peopleList[i];
    setUpdateSpotlightBool(false);
    toggleAsPersonSpotlight(selectedPerson);
  }

  const update = (i, peopleList) => {
    const selectedPerson = peopleList[i];
    setUpdateSpotlightBool(true);
    toggleAsPersonSpotlight(selectedPerson);


    // updatePeopleListCB(setStateKey, updatedPeopleList);
  }

  const sendUpdateAPI = (e) => {
    e.preventDefault();

    console.log("what do we have...?", e.target);

    // axios.get(`${URL_endpoint}/${id}`)
    // .then(respone => console.log('update from backend:', response.data))
    // .catch(error => toast.error(`ERROR: ${error.message}`));
  }

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
      <h1 className="text-centered">{title}</h1>
      
      {showAll(peopleList, URL_endpoint)}
    </section>
  );

}


export default PeopleTable;