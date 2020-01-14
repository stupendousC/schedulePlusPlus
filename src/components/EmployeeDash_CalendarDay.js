import React from 'react';
import { convertDateString, formatDate } from './Helpers';
import Accordion from 'react-bootstrap/Accordion';


const CalendarDay = ({today, shiftsToday, shiftsOfDaySpotlight, dateStr, availStatus, toggleAvailCallback}) => {

  const showShifts = (shiftsInArray) => {
    // shiftsInArray can either be shiftsToday[] or shiftsOfDaySpotlight[]  
    return ( shiftsInArray.map (shift => {
      return (showWholeShiftCard(shift));
    }));
  }

  const showWholeShiftCard = (shift) => {
    return (
      <section key={shift.id}>
        <section className="card-shift blue-bg" >
          <p>DATE</p>
          <p>{(shift.shift_date)}</p>
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

    const today = convertDateString(new Date());
    const inThePast = dateStr < today;

    if (shiftsOfDaySpotlight.length > 0) {
      return (
        <section>
          { inThePast ? (<h5>Shift completed!</h5>) : null }
          {showShifts(shiftsOfDaySpotlight)}
        </section>
      );
    } else if (inThePast) {
      return (<section>Nothing that day</section>);
    } else if (shiftsOfDaySpotlight.length === 0 && availStatus === true) {
      return (
        <section>
          <h3>No shifts scheduled</h3>
          <button onClick={() => {toggleAvailCallback(false)}} className="btn btn-danger">Take the day off</button>
        </section>
      );

    } else if (shiftsOfDaySpotlight.length === 0 && availStatus === false) {
      return (
        <section>
          <h3>You have the day off</h3>
          <button onClick={() => {toggleAvailCallback(true)}} className="btn btn-success">I'm free to work</button>
        </section>
      );
    } 
  }

  ////////////////////////////// render //////////////////////////////
  return(

    <section> 
      <Accordion>
        <section>
          <Accordion.Toggle eventKey="showToday" className="accordion-toggle_button blue-bg" >
            <section className="section-3-col">
              <section>▼</section>
              <section>TODAY: {formatDate(today)}</section>
              <section>▼</section>
            </section>
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="showToday">
            <section>{showShifts(shiftsToday)}</section>
          </Accordion.Collapse>

        </section>
      </Accordion>

      <Accordion>
        <section>
          <Accordion.Toggle eventKey="showCalendarClick" className="accordion-toggle_button blue-bg" >
            <section className="section-3-col">
              <section>▼</section>
              <section>DAY SPOTLIGHT: {formatDate(dateStr)}</section>
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

