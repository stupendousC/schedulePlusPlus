import React from 'react';
import { convertTimeString, formatDate } from './Helpers';

const EmployeeDash_ShiftsTable = ({allShifts}) => {

  if (allShifts.length === 0) {
    return (
      <section>No upcoming shifts</section>
    );

  } else {
    return(
      <section>
        Would be nice to show 1. client info 2. chronologically. 3. click on row for more info, like address & sich

        {allShifts.map(shift => {
          return (
            <section key = {shift.id} className="section-4-col">
              <section>{formatDate(shift.shift_date)}</section>
              <section>Client #{shift.client_id}</section>
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
