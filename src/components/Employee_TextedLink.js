import React, { useState } from 'react';
import axios from 'axios';
import ErrorGeneral from './ErrorGeneral';
import MessageComponent from './MessageComponent';
import {formatTime} from './Helpers';

export default function LinkTextedToEmployee({match}) {
  const URL_ENDPOINT = `${process.env.REACT_APP_TEXTED_LINK}/${match.params.uuid}`;

  const [shiftOrMsg, setShiftOrMsg] = useState("LOADING");

  const getFromDb = () => {
    // if shift is still available, response from backend will be the shift obj, otherwise null
    axios.get(URL_ENDPOINT)
      .then(response => setShiftOrMsg(response.data))
      .catch(error => console.log('ERROR:', error.message));
  }

  const acceptShift = () => {
    // send API call to backend to accept shift
    console.log("sending info to backend");

    // response from backend will be a boolean, as to whether user really got the shift, or if someone else beat them to it
    axios.post(URL_ENDPOINT)
    .then(response => setShiftOrMsg(response.data))
    .catch(error => console.log('ERROR:', error.message));
  }

  ///////////////////////// render //////////////////////////

  if (shiftOrMsg === "LOADING") {
    getFromDb();
    return <MessageComponent message="Loading..." icon="hourglass"/>;

  } else if (shiftOrMsg === null || shiftOrMsg === false) {
    // you'll see this if... 1. clicked on link after shift is taken.
    // 2. clicked on link before shift is taken, but clicked confirm after someone else did. 
    // 3. if you typed in base-url/text/{bogus-uuid-here}
    return <ErrorGeneral message="Sorry, shift is taken" icon="stopwatch"/>;
  
  } else if (shiftOrMsg === true) {
    return <MessageComponent message="YAY YOU GOT IT!" icon="thumbsUp"/>;

  } else {
    // there's a real shift in the state, not just a msg placeholder
    const shift = shiftOrMsg;

    return (
      <section className="homepage-section">
        <h1 className="text-centered">Please Confirm Below</h1>
        <section className="card-shift blue-bg">
          <p>DATE</p>
          <p>{shift.shift_date}</p>
          <p>START</p>
          <p>{formatTime(shift.start_time)}</p>
          <p>END</p>
          <p>{formatTime(shift.end_time)}</p>
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
