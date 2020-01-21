import React from 'react';
import PropTypes from 'prop-types';
import { convertDateString, formatDate, formatTime } from './Helpers';
import Accordion from 'react-bootstrap/Accordion';


const CalendarDay = ({shiftsToday, shiftsOfDaySpotlight, dateStr, availStatus, toggleAvailCallback}) => {

  const showShifts = (shiftsInArray) => {
    // shiftsInArray can either be shiftsToday[] or shiftsOfDaySpotlight[] 
    if (shiftsInArray.length > 0) {
      return ( shiftsInArray.map ((shift, i) => {
        return (
        <section key={i}>
          {showWholeShiftCard(shift)}
        </section>
        );
      }));
    } else {
      return (
        <section className="text-centered">
          <h3>No shifts scheduled</h3>
        </section>
      );
    }
    
  }

  const showWholeShiftCard = (shift) => {

    return (
      <section>
        <h5 className="thead-dark text-centered">SHIFT INFO</h5>
        <section className={`card-shift centered-children-per-row_container`}>
          <p>DATE</p>
          <p>{shift.shift_date}</p>
          <p>START</p>
          <p>{formatTime(shift.start_time)}</p>
          <p>END</p>
          <p>{formatTime(shift.end_time)}</p>
        </section>
        
        <h5 className="thead-dark text-centered">CLIENT INFO</h5>
        <section className="card-client centered-children-per-row_container">
          <p>CLIENT</p>
          <p>{shift.client.name}</p>
          <p>PHONE</p>
          <p>{shift.client.phone}</p>
          <p>EMAIL</p>
          <p>{shift.client.email}</p>
          <p>ADDRESS</p>
          <p>{shift.client.address}</p>
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
          {inThePast ? (<h3 className="text-centered">Shift completed!</h3>) : null }
          {showShifts(shiftsOfDaySpotlight)}
        </section>
      );
      
    } else if (inThePast) {
      return (<h3 className="text-centered">Nothing that day</h3>);

    } else if (shiftsOfDaySpotlight.length === 0 && availStatus === true) {
      return (
        <section className="text-centered">
          <h3>No shifts scheduled</h3>
          <button onClick={() => {toggleAvailCallback(false)}} className="btn btn-danger">Take the day off</button>
        </section>
      );

    } else if (shiftsOfDaySpotlight.length === 0 && availStatus === false) {
      return (
        <section className="text-centered">
          <h3>You have the day off</h3>
          <button onClick={() => {toggleAvailCallback(true)}} className="btn btn-success">I'm free to work</button>
        </section>
      );
    } 
  }

  ////////////////////////////// render //////////////////////////////
  return(

    <section className="accordion-container"> 
      <Accordion>
        <section>
          <Accordion.Toggle eventKey="showToday" className="accordion-toggle_button gold-bg" >
            <section className="section-3-col">
              <section>▼</section>
              <section>TODAY</section>
              <section>▼</section>
            </section>
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="showToday">
            <section className="lightgold-bg margin-all-1rem padding-all-1rem ">{showShifts(shiftsToday)}</section>
          </Accordion.Collapse>

        </section>
      </Accordion>

      <Accordion>
        <section>
          <Accordion.Toggle eventKey="showCalendarClick" className="accordion-toggle_button blue-bg" >
            <section className="section-3-col">
              <section>▼</section>
              <section>{formatDate(dateStr).toUpperCase()}</section>
              <section>▼</section>
            </section>
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="showCalendarClick">
            <section className="lightblue-bg margin-all-1rem padding-all-1rem ">{showAgendaOrOptions()}</section>
          </Accordion.Collapse>

        </section>
      </Accordion>

    </section>
  );
  
}

export default CalendarDay;

CalendarDay.propTypes = {
  shiftsToday: PropTypes.arrayOf(PropTypes.object), 
  shiftsOfDaySpotlight: PropTypes.arrayOf(PropTypes.object), 
  dateStr: PropTypes.string.isRequired,  
  availStatus: PropTypes.oneOfType([ PropTypes.bool, null ]),
  toggleAvailCallback: PropTypes.func.isRequired,
};