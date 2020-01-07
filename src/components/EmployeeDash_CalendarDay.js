import React from 'react';
import { convertDateString, convertTimeString } from './Helpers';

const CalendarDay = ({tempInfo, completeShiftsInfo, dateStr, availStatus}) => {

  const showShifts = () => {
    return ( tempInfo.map (shift => {
      return (
        <section key={shift.id} className="table-4-col"> 
          <section>{shift.shift_date}</section>
          <section>{shift.client_id}</section>
          <section>{convertTimeString(shift.start_time)}</section>
          <section>{convertTimeString(shift.end_time)}</section>
        </section>
        );
    }));
  }


  const showAgendaOrOptions = () => {
    console.log("\nCalendarDay received: ", tempInfo, " availStatus = ", availStatus);

    // is the day in the past?
    const today = convertDateString(new Date());
    const inThePast = dateStr < today;

    if (tempInfo.length > 0) {
      return (
        <section>
          <section className="section-4-col"> 
            <section>Date</section>
            <section>Client ID</section>
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
    } else if (tempInfo.length === 0 && availStatus === true) {
      return (
        <section>
          <h3>No shifts scheduled</h3>
          <button onClick={() => {toggleAvail(false)}}>Take the day off</button>
        </section>
      );
    } else if (tempInfo.length === 0 && availStatus === false) {
      return (
        <section>
          <h3>You have the day off</h3>
          <button onClick={() => {toggleAvail(true)}}>I'm free to work</button>
        </section>
      );
    } 
  }

  const toggleAvail = (bool) => {
    console.log("YOU want to toggle availability to...", bool);
    console.log("pretending to send api call to backend!!!")




  }


  return(

   

    <section> 
      <h1>All Shifts For {dateStr}</h1>
      {showAgendaOrOptions()}
    </section>
  );
  
}

export default CalendarDay;

