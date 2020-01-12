import React, { useState } from 'react';
import axios from 'axios';
import { formatDate } from './Helpers';


const NewShift = ({daySpotlight, allClients}) => {

  const [client, setClient] = useState(null);
  const defaultStartTime = "09:00:00";
  const defaultEndTime = "17:00:00";
  const [startTime, setStartTime] = useState(defaultStartTime);
  const [endTime, setEndTime] = useState(defaultEndTime);
  const [missingInfo, setMissingInfo] = useState(true);

  const onClientChange = (e) => {
    if (e.target.value === "-- Select --") {
      setClient(null);
      setMissingInfo(true);
    } else {
      setClient(e.target.value);
      setMissingInfo(false);
    }
  }

  const onTimeChange = (e) => {
    if (e.target.id === "startTime") { 
      setStartTime(e.target.value) 
    } else if (e.target.id === "endTime") {
      setEndTime(e.target.value);
    }
  }

  const onFormSubmit = (event) => {
    event.preventDefault();
    // unless times are entered, we'll use defaultStartTime and defaultEndTime as specified

    // must have selected a client
    if (!client) {
      console.log("NEED A CLIENT!");
    } else {
      console.log("let's send an API!");

    }

  }

  


  //////////////////// render ////////////////////
  return(
    <section className="newShift-component"> 
      <h1>{formatDate(daySpotlight)}</h1>

        <form onSubmit={onFormSubmit} className="px-4 py-3">

          {/* <section className="form-group">
            <label>Date</label>
            <input className="form-control" value={daySpotlight} />
          </section> */}

          <section className="form-group">

            <label>Client</label>
            <select className="form-control" onChange={onClientChange}>
              <option>-- Select --</option>
              {allClients.map(client => <option key={client.id}>{client.name}</option>)}
            </select>

            <label>Start time</label>
            <input id="startTime" onChange={onTimeChange} className="form-control" type="time" defaultValue={defaultStartTime}></input>
            
            <label>End time</label>
            <input id="endTime" onChange={onTimeChange} className="form-control" type="time" defaultValue={defaultEndTime}></input>
          
          </section>

          <input type="submit" className="btn btn-primary" value="STAFF IT" disabled={missingInfo}/>
        </form>

    </section>
  );
}

export default NewShift;


