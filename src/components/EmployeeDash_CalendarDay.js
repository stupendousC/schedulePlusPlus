import React from 'react';
import PropTypes from 'prop-types';
import { convertDateString, formatDate, formatTime } from './Helpers';
import Accordion from 'react-bootstrap/Accordion';


const CalendarDay = ({shiftsToday, shiftsOfDaySpotlight, dateStr, availStatus, toggleAvailCallback}) => {

  const showShifts = (shiftsInArray) => {
    // shiftsInArray can either be shiftsToday[] or shiftsOfDaySpotlight[] 
    if (shiftsInArray.length > 0) {
      return ( shiftsInArray.map (shift => {
        return (showWholeShiftCard(shift));
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
      <section key={shift.id} className="shift-card-container">
        <table className="employee-dash-shift-table" >
          <tr className="thead-dark">
            <th>SHIFT INFO</th>
            <th></th>
          </tr>
          <tr>
            <td>DATE</td>
            <td>{formatDate(shift.shift_date)}</td>
          </tr>
          <tr>
            <td>START</td>
            <td>{formatTime(shift.start_time)}</td>
          </tr>
          <tr>
            <td>END</td>
            <td>{formatTime(shift.end_time)}</td>
          </tr>

          <tr className="thead-dark">
            <th>CLIENT INFO</th>
            <th></th>
          </tr>
          <tr>
            <td>CLIENT</td>
            {shift.client ? <td>{shift.client.name}</td> : <td></td> }
          </tr>
          <tr>
            <td>PHONE</td>
            { shift.client ? <td>{shift.client.phone}</td> : <td></td> }
          </tr>
          <tr>
            <td>EMAIL</td>
            { shift.client ? <td>{shift.client.email}</td> : <td></td> }
          </tr>
          <tr>
            <td>ADDRESS</td>
            { shift.client ? <td>{shift.client.address}</td> : <td></td> }
          </tr>
        </table>

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
  availStatus: PropTypes.bool.isRequired, 
  toggleAvailCallback: PropTypes.func.isRequired,
};