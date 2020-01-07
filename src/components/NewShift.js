import React, { useState } from 'react';
import axios from 'axios';
import './CSS/NewShift.css';


const NewShift = ({daySpotlight, allClients, allUnavails, allEmployees, allShifts}) => {

  const makeNewShift = (e) => {
    e.preventDefault();

    console.log("\nmakign new shift!", e);
    console.log("client =", chosenClient);
  }

  // const getAvailEmployees = () => {

  //   axios.get(process.env.ALL_SHIFTS + "/" + daySpotlight)
  //   .then(response => {
  //     console.log(response.data);
  //   })
  //   .catch(error => console.log("ERROR", error.message));
  // }

  const [chosenClient, setClient] = useState(null);

  const onInputChange = (event) => {
    const updatedState = {};

    const field = event.target.name;
    const value = event.target.value;

    updatedState[field] = value;
    this.setState(updatedState);
  }


  const showForm = () => {
    return (
      <section>
        <h1>MAKE A NEW SHIFT</h1>

        <form className="px-4 py-3">

          <section className="form-group">
            <input className="form-control" value={daySpotlight} />
          </section>

          <section className="form-group">
            <label for="client">Client</label>
            <select className="form-control">
              <option>Client choices</option>
              {allClients.map(client => <option key={client.id} onClick={()=> setClient(client.id)}>{client.name}</option>)}
            </select>
          </section>

          <button className="btn btn-primary" onClick={() => {makeNewShift()}}>STAFF IT!</button>
        </form>
      </section>
    );
  }

  return(
    <section className="newShift-component"> 

      {showForm()}
      
      <li>add start & end times later</li>
      <li>make new unmanned shift for shifts table</li>
      <li>get list of people who are not excluded from unavails table</li>
      <li>send twilio texts</li>
    </section>
  );
}

export default NewShift;