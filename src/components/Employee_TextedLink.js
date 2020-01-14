import React from 'react';
import LoginError from './LoginError';

export default function LinkTextedToEmployee({match}) {
    
    return (
      <section className="homepage-section">
    NO NEED TO LOG IN, the UUID in the URL is verification enough b/c it's user's phone<br/>
    you'll either see... 1. Confirmation screen, or 2. Sorry shift is taken<br/><br/>

    We received UUID = {match.params.uuid}<br/>

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
