import React from 'react';

const CalendarDay = ({basicShiftsInfo, dateStr}) => {

  console.log("CalendarDay showing", dateStr, "\nbasicShiftsInfo = ", basicShiftsInfo);

  const showShifts = () => {
    return ( basicShiftsInfo.map (shift => {
      return (
        <section key={shift.id} className="table-4-col"> 
          <section>{shift.shift_date}</section>
          <section>{shift.client.name}</section>
          <section>{shift.start_time}</section>
          <section>{shift.end_time}</section>
        </section>
        );
    }));
  }


  const showTableOrNothing = () => {
    if (!basicShiftsInfo) {
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

