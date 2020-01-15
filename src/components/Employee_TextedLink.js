import React, { useState } from 'react';
import axios from 'axios';
import ErrorGeneral from './ErrorGeneral';
import MessageComponent from './MessageComponent';
import {convertTimeString} from './Helpers';

export default function LinkTextedToEmployee({match}) {
  const URL_ENDPOINT = `${process.env.REACT_APP_TEXTED_LINK}/${match.params.uuid}`;

  const [shift, setShiftOrMsg] = useState("LOADING");

  axios.get(URL_ENDPOINT)
  .then(response => setShiftOrMsg(response.data))
  .catch(error => setShiftOrMsg(`ERROR: ${error.message}`));

  const acceptShift = () => {
    // send API call to backend to accept shift
    console.log("sending info to backend");

    axios.post(URL_ENDPOINT)
    .then(response => console.log(setShiftOrMsg("ACCEPTED")))
    .catch(error => console.log(error.message));

    // setting state should redirect to congrats page
  }

  ///////////////////////// render //////////////////////////
  if (shift === "LOADING") {
    return <MessageComponent message="Loading..." />;

  } else if (shift === null) {
    return <ErrorGeneral message="Sorry, shift is taken" icon="alarm"/>;
  
  } else if (shift === "ACCEPTED") {
    return <MessageComponent message="YAY YOU GOT IT!" icon="thumbsUp"/>;

  } else if (shift.startsWith("ERROR") ) {
    return<ErrorGeneral message={shift} />;

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
          <p>{shift.client.name}</p>
          <p>PHONE</p>
          <p>{shift.client.phone}</p>
          <p>EMAIL</p>
          <p>{shift.client.email}</p>
          <p>ADDRESS</p>
          <p>{shift.client.address}</p>
        </section>

        <section className="text-centered">
          <button onClick={acceptShift} className="btn btn-primary">YES, I WANT THIS SHIFT!</button>
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