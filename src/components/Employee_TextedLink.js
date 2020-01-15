import React, { useState } from 'react';
import axios from 'axios';
import ErrorGeneral from './ErrorGeneral';
import {convertTimeString} from './Helpers';

export default function LinkTextedToEmployee({match}) {

  const [shift, setShiftOrNull] = useState("LOADING");

  axios.get(`http://localhost:5000/text/${match.params.uuid}`)
  .then(response => setShiftOrNull(response.data))
  .catch(error => console.log(error.message));


  
  if (shift === "LOADING") {
    return (
      <section>LOADING...</section>
    )
  } else if (shift === null) {
    return (
      <ErrorGeneral message="Sorry, shift is taken" />
    )
  } else {
    return (
      <section className="homepage-section">
        <h1 className="text-centered">Please Confirm Below</h1>
        <section className="card-shift blue-bg">
          <p>DATE</p>
          <p>{shift.shift_date}</p>
          <p>START</p>
          <p>{convertTimeString(shift.start_time)}</p>
          <p>END</p>
          <p>{convertTimeString(shift.end_time)}</p>
        </section>

        <section className="card-client">
          <p>CLIENT</p>
          { shift.client ? <p>{shift.client.name}</p> : <p></p> }
          <p>PHONE</p>
          { shift.client ? <p>{shift.client.phone}</p> : <p></p> }
          <p>EMAIL</p>
          { shift.client ? <p>{shift.client.email}</p> : <p></p> }
          <p>ADDRESS</p>
          { shift.client ? <p>{shift.client.address}</p> : <p></p> }
        </section>

        <section className="text-centered">
          <button  className="btn btn-primary">YES, I WANT THIS SHIFT!</button>
          <li className="fine-print">This shift will appear on your employee dashboard after you accept.</li>
          <li className="fine-print">Close this window if you want to cancel.</li>
          <li className="fine-print">Or login above to access your dashboard for other options.</li>
        </section>
        
      </section>
    );
  }
}

{/* <h1>LOGIC FLOW</h1>
    1. client clicking on this link, will send api call to backend and check to see if 
    shift obj still exists in Texts db. <br/><br/>
    2A. If yes, then see confirmation screen <br/>
      ...2A1. Once emp clicks on confirm button, send API call to backend,<br/>
      ...2A2. add that emp obj to the shift obj,<br/>
      ...2A3. delete all rows in Texts that belong to that shift obj<br/><br/>
    2B. If no, then see shift taken screen <br /> */}