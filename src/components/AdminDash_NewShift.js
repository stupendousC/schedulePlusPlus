import React, { useState } from 'react';
import axios from 'axios';


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
            <label>Date</label>
            <input className="form-control" value={daySpotlight} />
          </section>

          <section className="form-group">
            <label>Client</label>
            <select className="form-control">
              <option>Client choices</option>
              {allClients.map(client => <option key={client.id} onClick={()=> setClient(client.id)}>{client.name}</option>)}
            </select>
            <label>Start time</label>
            <input className="form-control" type="time" defaultValue="09:00:00"></input>
            <label>End time</label>
            <input className="form-control" type="time" defaultValue="17:00:00"></input>
          </section>

          <button className="btn btn-primary" onClick={() => {makeNewShift()}}>STAFF IT!</button>
        </form>
      </section>
    );
  }

  return(
    <section className="newShift-component"> 

      {showForm()}
      
      <li>make new unmanned shift for shifts table</li>
      <li>get list of people who are not excluded from unavails table</li>
      <li>send twilio texts</li>
    </section>
  );
}

export default NewShift;