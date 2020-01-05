import React from 'react';

const CalendarDay = ({completeShiftsInfo, dateStr}) => {
  console.log("CalendarDay received date=", dateStr);

  // completeShiftsInfo = [ [shift1], [shift2], etc ]
    // triplet subarray = [[shiftInfo], [employeeInfo], [clientInfo]] 

  const showShifts = () => {
    return ( completeShiftsInfo.map (tripletArray => {
      return (
        <tr key={tripletArray.id} className="table-4-col"> 
          <td>{tripletArray[1].name}</td>
          <td>{tripletArray[2].name}</td>
          <td>{tripletArray[0].start_time}</td>
          <td>{tripletArray[0].end_time}</td>
        </tr>
        );
    }));
  }

  const showTableOrNothing = () => {
    if (completeShiftsInfo.length === 0) {
      return (
        <h3>No shifts scheduled</h3>
      );
    } else {
      return (
        <table>
          <thead className="table-4-col"> 
            <td>Client</td>
            <td>Employee</td>
            <td>Start</td>
            <td>End</td>
          </thead>

          <tbody>
            {showShifts()}
          </tbody>
        </table>
      );
    }
  }

  return(
    <section>
      <h1>All Shifts For {dateStr}</h1>
      {showTableOrNothing()}
    </section>
  );
  
}

export default CalendarDay;

