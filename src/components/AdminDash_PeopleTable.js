import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ToastUndo from './ToastUndo';


///////////////////// People can be either admins, employees, or clients /////////////////////
const PeopleTable = ({title, peopleList, URL_endpoint, setStateKey, updatePeopleListCB }) => {
  const [personSpotlight, setPersonSpotlight] = useState("");
  
  // not gonna useState on this b/c that's asynch AND I don't need re-rendering for it
  let personInPurgatory = null;

  const showAll = (peopleList, URL_endpoint) => {
    return ( peopleList.map((person, i) => {
      return (
        <section key={i}>
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
    return (
      <ul>
        <li>ID: {person.id}</li>
        <li>OAuthId:{person.oauthid}</li>
        <li>Name: {person.name}</li>
        <li>Address: {person.address}</li>
        <li>Phone: {person.phone}</li>
        <li>Email: {person.email}</li>
      </ul>
    );
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
    toggleAsPersonSpotlight(selectedPerson);
  }

  const update = (i, peopleList) => {
    const selectedPerson = peopleList[i];
    toggleAsPersonSpotlight(selectedPerson);
    // TODO: add fields for input
  }

  const deactivate = (person) => {
    setPersonSpotlight("");
    personInPurgatory = person;

    console.log("TODO: If employee, need to reopen shifts they alreay committed to!!! and inform employees!!!");
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