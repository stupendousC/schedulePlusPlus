import React from 'react';
import { convertTimeString, formatDate, sortShiftsByDate } from './Helpers';

const EmployeeDash_ShiftsTable = ({allShifts}) => {

  allShifts = sortShiftsByDate(allShifts);
  
  if (allShifts.length === 0) {

    return (
      <section>No upcoming shifts</section>
    );

  } else {

    return(
      <section>
<h1>Would be nice to click on row for more info</h1>
        {allShifts.map(shift => {
          return (
            <section key = {shift.id} className="section-4-col">
              <section>{formatDate(shift.shift_date)}</section>
              <section>{shift.client.name}</section>
              <section>{convertTimeString(shift.start_time)}</section>
              <section>{convertTimeString(shift.end_time)}</section>
            </section>
          )}
        )}
      </section>
    );
  }    
}

export default EmployeeDash_ShiftsTable;
