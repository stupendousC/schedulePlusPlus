import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { formatDate, dateInThePast } from './Helpers';
import { toast } from 'react-toastify';

const NewShift = ({daySpotlight, allClients, availEmpsOfDay, updateAllShiftsCallback, textEmployeesCallback, showColorBasedOnDay}) => {
  // need for sending POST request to backend
  const ALL_SHIFTS = process.env.REACT_APP_ALL_SHIFTS;

  // these are for <form> use
  const [clientId, setClientId] = useState(null);
  const defaultStartTime = "09:00:00";
  const defaultEndTime = "17:00:00";
  const [startTime, setStartTime] = useState(defaultStartTime);
  const [endTime, setEndTime] = useState(defaultEndTime);

  const isFormValid = () => {
    if (dateInThePast(daySpotlight) || !clientId || (endTime <= startTime)) {
      return (false);
    } else {
      return (true);
    }
  }

  const genErrorMsgs = () => {
      // evaluate all form inputs and save invalid reasons in errorMsgs
      let errorMsgs = [];

      if (dateInThePast(daySpotlight)) {
        errorMsgs.push("Date cannot be in the past");
      }
      if (!clientId) {
        errorMsgs.push("Please select a client before submitting form");
      }
      if (endTime <= startTime) {
        errorMsgs.push("Start time must be before end time");
      }

      return errorMsgs;
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

  const onFormSubmit = (e) => {
    e.preventDefault();

    const clientObj = allClients.find( client => {
      return (client.id === clientId);
    });

    const jsonForNewShiftAPI = {
      "shift_date": daySpotlight,
      "start_time": startTime,
      "end_time": endTime,
      "client": clientObj,  
      "client_id": clientId
    }

    let newShift = null;

    // send new shift to backend, to add to db
      // employees also can see the new shift when they login to their own dashboard
    axios.post(ALL_SHIFTS, jsonForNewShiftAPI )
    .then(response => {
      newShift = response.data;
      
      // send callback back up to <CalendarTab> which will pass up to <AdminDash> for new API call
      // which gets latest allShifts from backend db, and re-render everything
      updateAllShiftsCallback();

      // send text to temployees who have non-null phone numbers
      textEmployeesCallback(newShift);
      })
    .catch(error => toast.error(`ERROR: Can't make new shift: ${error.message}`));
  }

  const showErrorMsgs = () => {
    const errorMsgs = genErrorMsgs();
      const rowsOfMsgs = errorMsgs.map( (msg,i) => {
        return (
          <li key={i} className="centered-text">{msg}</li>
        );
      });

      return (
        <ul className="centered-children-per-row_container">{rowsOfMsgs}</ul>
      );
    
  }

  const showButtonValue = () => {
    if (availEmpsOfDay.length === 0) {
      return "No one is available -> MAKE NEW SHIFT anyway";
    } else {
      return "MAKE NEW SHIFT & NOTIFY ALL THOSE AVAILABLE";
    }
  }

  //////////////////// render ///////////////////

  return(
    <section className={showColorBasedOnDay()}> 
      <h1 className="text-centered">{formatDate(daySpotlight)}</h1>
      
      <form onSubmit={onFormSubmit} className="px-4 py-3">

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
        
        {isFormValid() ? null: showErrorMsgs()}

        <section className="centered-children-per-row_container">
          <input type="submit" className="btn btn-primary" value={showButtonValue()} disabled={!isFormValid()}/>
          <li className="fine-print centered-text">New shift will be visible on employee dashboards, open on a first-come-first-served basis</li>
          <li className="fine-print centered-text">Texts will also be sent to all those available, with valid phone numbers in their record</li>
        </section>
        
      </form>

    </section>
  );
}

export default NewShift;

NewShift.propTypes = {
  daySpotlight: PropTypes.string.isRequired, 
  allClients: PropTypes.arrayOf(PropTypes.object), 
  availEmpsOfDay: PropTypes.oneOfType(PropTypes.arrayOf(PropTypes.object), PropTypes.string), // coud be eihter "LOADING" or actual array of Employees
  updateAllShiftsCallback: PropTypes.func.isRequired, 
  textEmployeesCallback: PropTypes.func.isRequired, 
  showColorBasedOnDay: PropTypes.func.isRequired,
};