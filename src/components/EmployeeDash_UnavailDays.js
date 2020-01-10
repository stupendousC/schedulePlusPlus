import React from 'react';
import { formatDate } from './Helpers';

const UnavailDays = ({sortedUnavails, freeToWorkCallback}) => {

  const showUnavailsTable = () => {
    return sortedUnavails.map(unavail => {
      return(
        <section key={unavail.id} className="section-2-col">
          <section>{formatDate(unavail.day_off)}</section>
          <button onClick={()=>{freeToWorkCallback(unavail)}} className="btn btn-success">I'm free to work</button>
        </section>
      );
    })
  }

  return(
    <section> 
      <h1>UNAVAILABLE DAYS</h1>
      {showUnavailsTable()}
    </section>
  );
  
}

export default UnavailDays;

