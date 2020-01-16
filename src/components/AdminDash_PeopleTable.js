import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ToastUndo from './ToastUndo';


///////////////////// People can be either admins, employees, or clients /////////////////////
const PeopleTable = ({peopleList, URL_endpoint, setStateKey, updatePeopleListCB }) => {
  const [personSpotlight, setPersonSpotlight] = useState("");

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

  const deactivate = (person, URL_endpoint) => {
    console.log("If employee, need to reopen shifts they alreay committed to!!!");
    toast(<ToastUndo msg="are you sure?"/>);

    setPersonSpotlight("");
    axios.delete(URL_endpoint + "/" + person.id)
    .then(response => {
      console.log(`deactivated ${person.name} from database`);
      const updatedPeopleList = peopleList.filter( p => p !== person );
      updatePeopleListCB(setStateKey, updatedPeopleList);
    })
    .catch(error => console.log("ERROR:", error.message));
  }

  //////////////////////////// render ////////////////////////////
  return (
    <section>
      {showAll(peopleList, URL_endpoint)}
    </section>
  );

}


export default PeopleTable;