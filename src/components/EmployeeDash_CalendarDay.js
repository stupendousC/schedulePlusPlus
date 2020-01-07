import React from 'react';

const CalendarDay = ({tempInfo, completeShiftsInfo, dateStr, availStatus}) => {

  const showShifts = () => {
    return ( tempInfo.map (shift => {
      return (
        <section key={shift.id} className="table-4-col"> 
          <section>{shift.shift_date}</section>
          <section>{shift.client_id}</section>
          <section>{shift.start_time}</section>
          <section>{shift.end_time}</section>
        </section>
        );
    }));
  }


  const showTableOrNothing = () => {
    console.log("\nCalendarDay received: ", tempInfo, " availStatus = ", availStatus);

    if (tempInfo.length === 0 && availStatus === true) {
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
    } else {
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
    }
  }

  const toggleAvail = (bool) => {
    console.log("YOU want to toggle availability to...", bool);
    console.log("pretending to send api call to backend!!!")




  }


  return(

   

    <section> 
      <h1>All Shifts For {dateStr}</h1>
      {showTableOrNothing()}
    </section>
  );
  
}

export default CalendarDay;

