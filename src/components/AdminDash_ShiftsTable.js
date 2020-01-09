import React from 'react';
import axios from 'axios';

import { convertTimeString, formatDate, sortShiftsByDate } from './Helpers';

const EmployeeDash_ShiftsTable = ({allShifts}) => {

  allShifts = sortShiftsByDate(allShifts);

  const showEmpNameOrButton = (shift) => {
    if (shift.employee) {
      return (shift.employee.name);
    } else {
      return (<button onClick={()=>getAvailEmps(shift)} className="btn btn-success">Find employees</button>);
    }
  }

  const getAvailEmps = (shift) => {
    console.log("ok, gonna find soemone...", shift.shift_date, "for shift obj", shift);
    
    const URL = process.env.REACT_APP_GET_AVAIL_EMPS;
    axios.get(URL+`/${shift.id}`)
    .then(response => {
      console.log("backend says: ", response.data);
    })
    .catch(error => console.log("Error getting availEmps:", error.message));
    // 
  }



  if (allShifts.length === 0) {
    return (
      <section>No upcoming shifts</section>
    );

  } else {
    return(
      <section>
        <h1>Would be nice to click on row for more info</h1>
        <li>show red if not staffed yet</li>
        <li>grey out or hide those in the past</li>

        {allShifts.map(shift => {
          return (
            <section key = {shift.id} className="section-4-col">
              <section>{formatDate(shift.shift_date)}</section>
              <section>{shift.client.name}</section>
              <section>{showEmpNameOrButton(shift)}</section>
              <section>{convertTimeString(shift.start_time)} to {convertTimeString(shift.end_time)}</section>
            </section>
          )}
        )}
      </section>
    );
  }    
}

export default EmployeeDash_ShiftsTable;
