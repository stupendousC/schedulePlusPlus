import React from 'react';
import LoginError from './LoginError';

export default function LinkTextedToEmployee({match}) {

    const sessionRole = sessionStorage.getItem('authenticatedRole');
    console.log("sessionRole = ", sessionRole);

    if (sessionRole === "ADMIN") {
      return <LoginError message="This is meant for employee use" />
    
    } else if (sessionRole !== "EMPLOYEE") {
      return <LoginError message="Please log in first" />;

    } else if (match.params.id !== sessionStorage.getItem('databaseId')){
      return <LoginError message="Sorry, this page belongs to a different employee"/>;
 
    } else {
      // user = correct employee

      // send API call to get the shift info, then display it here
      // once they click on accept or decline button, send info back to API
      // what if they decline?  gonna have to rejigger that too... it'd be useful to know if there's a hard NO from everyone
      return (
        <section className="homepage-section text-centered">
      This should be the texted link to the employee<br/><br/>

      We received id = {match.params.id}<br/>
      ShiftId={match.params.shiftId}<br/>
    </section>
      );
    
    
  }
  

}