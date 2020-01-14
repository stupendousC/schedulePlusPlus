import React from 'react';
import LoginError from './LoginError';

export default function LinkTextedToEmployee({match}) {

    const sessionRole = sessionStorage.getItem('authenticatedRole');
    console.log("sessionRole = ", sessionRole);

    if (sessionRole !== "EMPLOYEE") {
      return (
        <LoginError message="Please log in first" />
      );

    } else {
      return (
        <section className="homepage-section text-centered">
      This should be the texted link to the employee<br/><br/>
      We received id = {match.params.id}<br/>
      ShiftId={match.params.shiftId}<br/>
      Before letting u click on Yes or No, Or even letting u see the info, we need to MAKE SURE YOU LOGGED IN FIRST!
    </section>
      );
    
    
  }
  

}