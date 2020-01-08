import React from 'react';
import { convertDateString, convertTimeString, formatDate } from './Helpers';

const CalendarDay = ({basicShiftInfo, dateStr, availStatus, toggleAvailCallback}) => {

  const showShifts = () => {
    return ( basicShiftInfo.map (shift => {
      return (
        <section key={shift.id} className="table-4-col"> 
          <section>{formatDate(shift.shift_date)}</section>
          <section>{shift.client.name}</section>
          <section>{convertTimeString(shift.start_time)}</section>
          <section>{convertTimeString(shift.end_time)}</section>
        </section>
        );
    }));
  }


  const showAgendaOrOptions = () => {
    // console.log("\nCalendarDay received: ", basicShiftInfo, " availStatus = ", availStatus, "on", dateStr);

    // is the day in the past?
    const today = convertDateString(new Date());
    const inThePast = dateStr < today;

    if (basicShiftInfo.length > 0) {
      return (
        <section>
          <section className="section-4-col"> 
            <section>Date</section>
            <section>Client</section>
            <section>Start</section>
            <section>End</section>
          </section>

          <section>
            {showShifts()}
          </section>
        </section>
      );
    } else if (inThePast) {
      return (
        <section>Nothing for this date</section>
      );
    } else if (basicShiftInfo.length === 0 && availStatus === true) {
      return (
        <section>
          <h3>No shifts scheduled</h3>
          <button onClick={() => {toggleAvailCallback(false)}} className="btn btn-danger">Take the day off</button>
        </section>
      );
    } else if (basicShiftInfo.length === 0 && availStatus === false) {
      return (
        <section>
          <h3>You have the day off</h3>
          <button onClick={() => {toggleAvailCallback(true)}} className="btn btn-success">I'm free to work</button>
        </section>
      );
    } 
  }

  return(

    <section> 
      <h1>AGENDA for {formatDate(dateStr)}</h1>
      {showAgendaOrOptions()}
    </section>
  );
  
}

export default CalendarDay;

