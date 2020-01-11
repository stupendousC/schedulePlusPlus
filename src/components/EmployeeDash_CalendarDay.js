import React from 'react';
import { convertDateString, convertTimeString, formatDate, dateInThePast } from './Helpers';
import Accordion from 'react-bootstrap/Accordion';


const CalendarDay = ({shiftToday, basicShiftInfo, dateStr, availStatus, toggleAvailCallback}) => {
  const today = formatDate(new Date());

  const showShifts = () => {
    return ( basicShiftInfo.map (shift => {
      return (
        <section key={shift.id} className="section-4-col"> 
          <section>{formatDate(shift.shift_date)}</section>
          <section>{shift.client.name}</section>
          <section>{convertTimeString(shift.start_time)}</section>
          <section>{convertTimeString(shift.end_time)}</section>
        </section>
        );
    }));
  }

  const showToday = () => {
    if (shiftToday === []) {
      return( showWholeShiftCard(shiftToday) );
    } else {
      return( <h3>Nothing for today</h3>);
    }
    
  }


  const showWholeShiftCard = (shift) => {
    return (
      <section>
        <section className="card-shift blue-bg" >
          <p>DATE</p>
          <p>{shift.shift_date}</p>
          <p>START</p>
          <p>{(shift.start_time)}</p>
          <p>END</p>
          <p>{(shift.end_time)}</p>
        </section>

        <section className="card-client">
          <p>CLIENT</p>
          { shift.client ? <p>{shift.client.name}</p> : <p></p> }
          <p>PHONE</p>
          { shift.client ? <p>{shift.client.phone}</p> : <p></p> }
          <p>EMAIL</p>
          { shift.client ? <p>{shift.client.email}</p> : <p></p> }
          <p>ADDRESS</p>
          { shift.client ? <p>{shift.client.address}</p> : <p></p> }
        </section>

      </section>
    );
  }



  const showAgendaOrOptions = () => {
    // console.log("\nCalendarDay received: ", basicShiftInfo, " availStatus = ", availStatus, "on", dateStr);

    const today = convertDateString(new Date());
    const inThePast = dateStr < today;

    if (basicShiftInfo.length > 0) {
      return (
        <section>

          { inThePast ? (<h5>Shift completed!</h5>) : null }

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
      <Accordion>
        <section>
          <Accordion.Toggle eventKey="showToday" className="accordian-toggle_button blue-bg" >
            <section className="section-3-col">
              <section>▼</section>
              <section>TODAY {today}</section>
              <section>▼</section>
            </section>
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="showToday">
            <section>{showToday()}</section>
          </Accordion.Collapse>

        </section>
      </Accordion>

      <Accordion>
        <section>
          <Accordion.Toggle eventKey="showCalendarClick" className="accordian-toggle_button blue-bg" >
            <section className="section-3-col">
              <section>▼</section>
              <section>AGENDA for {formatDate(dateStr)}</section>
              <section>▼</section>
            </section>
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="showCalendarClick">
            <section>{showAgendaOrOptions()}</section>
          </Accordion.Collapse>

        </section>
      </Accordion>

    </section>
  );
  
}

export default CalendarDay;

