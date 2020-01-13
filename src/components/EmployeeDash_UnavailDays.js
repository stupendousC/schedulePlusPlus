import React from 'react';
import { formatDate } from './Helpers';

const UnavailDays = ({sortedUnavails, freeToWorkCallback}) => {

  const showUnavailsTable = () => {
    return sortedUnavails.map(unavail => {
      return(
        <section key={unavail.id} className="employee-dash-unavails-table">
          <section>{formatDate(unavail.day_off)}</section>
          <button onClick={()=>{freeToWorkCallback(unavail)}} className="btn btn-success">I'm free to work</button>
        </section>
      );
    })
  }

  return(
    <section> 
      <h1 className="text-centered">UNAVAILABLE DAYS</h1>
      {showUnavailsTable()}
    </section>
  );
  
}

export default UnavailDays;

