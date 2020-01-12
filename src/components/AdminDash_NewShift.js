import React, { useState } from 'react';
import axios from 'axios';
import { formatDate, dateInThePast } from './Helpers';


const NewShift = ({daySpotlight, allClients}) => {
  // need for sending POST request to backend
  const ALL_SHIFTS = process.env.REACT_APP_ALL_SHIFTS;

  // these are for <form> use
  const [clientId, setClientId] = useState(null);
  const defaultStartTime = "09:00:00";
  const defaultEndTime = "17:00:00";
  const [startTime, setStartTime] = useState(defaultStartTime);
  const [endTime, setEndTime] = useState(defaultEndTime);

  const isFormValid = () => {
    if (dateInThePast(daySpotlight) || !clientId ) {
      return (false);
    } else {
      return (true);
    }
  }

  const onClientChange = (e) => {
    if (e.target.value === "-- Select --") {
      setClientId(null);
    } else {
      setClientId(parseInt(e.target.value));
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

    // maybe find clientObj so backend doesn't have to?
    const clientObj = allClients.find( client => {
      return (client.id === clientId);
    });

    const jsonForAPI = {
      "shift_date": daySpotlight,
      "start_time": startTime,
      "end_time": endTime,
      "client": clientObj,  
      "client_id": clientId
    }

    axios.post(ALL_SHIFTS+`/${clientId}`, jsonForAPI )
    .then(response => {
      console.log(response.data);
        // should probably add to curr allShifts via callback
      })
    .catch(error => console.log(error.message));
  }
  
  const showDateHeader = () => {
    if (dateInThePast(daySpotlight)) {
      return (
        <section className="gray-bg">
          <h1>{formatDate(daySpotlight)}</h1>
          <h3>In the past...</h3>
        </section>
      );
    } else {
      return (<h1>{formatDate(daySpotlight)}</h1>);
    } 
  }

  //////////////////// render ///////////////////

  return(
    <section className="newShift-component"> 
      {showDateHeader()}

        <form onSubmit={onFormSubmit} className="px-4 py-3">

          {/* Decided to disable this for now, looks prettier when user clicks on the calendar
          IF I decide to enable this section, will need a setDaySpotlightCallback to send back to <AdminDash> so the calendar highted tile will match user input
          <section className="form-group">
            <label>Date</label>
            <input className="form-control" value={daySpotlight} />
          </section> */}

          <section className="form-group">

            <label>Client</label>
            <select className="form-control" onChange={onClientChange}>
              <option defaultValue>-- Select --</option>
              {allClients.map(client => <option key={client.id} value={client.id}>{client.name}</option>)}
            </select>

            <label>Start time</label>
            <input id="startTime" onChange={onTimeChange} className="form-control" type="time" defaultValue={defaultStartTime}></input>
            
            <label>End time</label>
            <input id="endTime" onChange={onTimeChange} className="form-control" type="time" defaultValue={defaultEndTime}></input>
          
          </section>

          <input type="submit" className="btn btn-primary" value="STAFF IT" disabled={!isFormValid()}/>
        </form>

    </section>
  );
}

export default NewShift;


