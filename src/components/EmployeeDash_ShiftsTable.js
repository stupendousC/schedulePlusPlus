import React from 'react';
import axios from 'axios';
import { convertTimeString, formatDate } from './Helpers';

const EmployeeDash_ShiftsTable = ({sortedOwnShifts, sortedUnstaffedShifts}) => {

  const showUnstaffedShifts = () => {
    console.log("show sortedUnstaffedShifts", sortedUnstaffedShifts);
    return(
      <section>
        show table of unstaffed shifts here!
      </section>
    );
  }


  if (!sortedOwnShifts) {

    return (
      <section>No upcoming shifts</section>
    );

  } else {

    return(
      <section>
<h1>Would be nice to click on row for more info</h1>
        {sortedOwnShifts.map(shift => {
          return (
            <section key = {shift.id} className="section-4-col">
              <section>{formatDate(shift.shift_date)}</section>
              <section>{shift.client.name}</section>
              <section>{convertTimeString(shift.start_time)}</section>
              <section>{convertTimeString(shift.end_time)}</section>
            </section>
          )}
        )}

        <hr/>
        {showUnstaffedShifts()}
      </section>
    );
  }    
}

export default EmployeeDash_ShiftsTable;
