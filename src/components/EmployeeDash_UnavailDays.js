import React from 'react';
import { convertDateString, convertTimeString, formatDate } from './Helpers';

const UnavailDays = ({sortedUnavails, freeToWorkCallback}) => {

  //   } else if (basicShiftInfo.length === 0 && availStatus === true) {
  //     return (
  //       <section>
  //         <h3>No shifts scheduled</h3>
  //         <button onClick={() => {toggleAvailCallback(false)}} className="btn btn-danger">Take the day off</button>
  //       </section>
  //     );
  //   } else if (basicShiftInfo.length === 0 && availStatus === false) {
  //     return (
  //       <section>
  //         <h3>You have the day off</h3>
  //         <button onClick={() => {toggleAvailCallback(true)}} className="btn btn-success">I'm free to work</button>
  //       </section>
  //     );
  //   } 
  // }

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

