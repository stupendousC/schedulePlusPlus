import React, { useState } from 'react';
import axios from 'axios';
import ErrorGeneral from './ErrorGeneral';

export default function LinkTextedToEmployee({match}) {

  const [shiftOrNull, setShiftOrNull] = useState("LOADING");

  axios.get(`http://localhost:5000/text/${match.params.uuid}`)
  .then(response => setShiftOrNull(response.data))
  .catch(error => console.log(error.message));


  
  if (shiftOrNull === "LOADING") {
    return (
      <section>LOADING...</section>
    )
  } else if (shiftOrNull === null) {
    return (
      <ErrorGeneral message="Sorry, shift is taken" />
    )
  } else {
    return (
      <section className="homepage-section">

    <h1>LOGIC FLOW</h1>
    1. client clicking on this link, will send api call to backend and check to see if 
    shift obj still exists in Texts db. <br/><br/>
    2A. If yes, then see confirmation screen <br/>
      ...2A1. Once emp clicks on confirm button, send API call to backend,<br/>
      ...2A2. add that emp obj to the shift obj,<br/>
      ...2A3. delete all rows in Texts that belong to that shift obj<br/><br/>
    2B. If no, then see shift taken screen <br />
  </section>
    );
  }
    
  
}
