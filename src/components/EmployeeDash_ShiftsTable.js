import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import PropTypes from 'prop-types';
import { formatTime, formatDate, dateInThePast, getWeekday } from './Helpers';
import ShiftsTable from './AdminDash_ShiftsTable';

const EmployeeDash_ShiftsTable = ({sortedOwnShifts, sortedUnstaffedShifts, sortedUnavails, takeShiftCallback, freeToWorkCallback}) => {

  ////////////////// prelim work ////////////////////
  // divide the sortedOwnShifts into active shifts (current & future) and past shifts
  let ownActiveShifts = [];
  let ownPastShifts = [];
  let cloneAllOwnShifts = [...sortedOwnShifts];
  
  while (cloneAllOwnShifts[0]) {
    if (dateInThePast(cloneAllOwnShifts[0].shift_date)) {
      ownPastShifts.push(cloneAllOwnShifts.shift());
    } else {
      ownActiveShifts = [...cloneAllOwnShifts];
      break;
    }
  }
  
  ////////////////// fcns ////////////////////
  const showOwnShifts = (listOfShifts, customClassName) => {
    return listOfShifts.map(shift => {
      return (
        <Accordion key={shift.id}>
          <section>
            <Accordion.Toggle eventKey="showInfo" className={`accordion-toggle_button ${customClassName}`}>
              <section className="section-4-col">
                <section>▼</section>
                <section>{formatDate(shift.shift_date)}</section>
                <section>{getWeekday(shift.shift_date)}</section>
                <section>{shift.client.name}</section>
              </section>
            </Accordion.Toggle>

            <Accordion.Collapse eventKey="showInfo">
              <section>{showWholeShiftCard(shift)}</section>
            </Accordion.Collapse>

          </section>
        </Accordion>
      )}
    )
  }

  const showOwnActiveShifts = () => {
    return showOwnShifts(ownActiveShifts, "lightblue-bg");
  }

  const showOwnPastShifts = () => {
    return showOwnShifts(ownPastShifts, "gray-bg");
  }

  const showUnstaffedShifts = () => {
    return(
      <section>
        {sortedUnstaffedShifts.map(shift => {
          return (
            <Accordion key={shift.id}>
              <section>
                <Accordion.Toggle eventKey="showInfo" className={dateInThePast(shift.shift_date)? ("accordion-toggle_button gray-bg"):("accordion-toggle_button lightblue-bg")}>
                  <section className="section-4-col">
                    <section>▼</section>
                    <section>{formatDate(shift.shift_date)}</section>
                    <section>{getWeekday(shift.shift_date)}</section>
                    <section>{shift.client.name}</section>
                  </section>
                </Accordion.Toggle>

                <Accordion.Collapse eventKey="showInfo">
                  <section>{showWholeShiftCard(shift, true)}</section>
                </Accordion.Collapse>

              </section>
            </Accordion>
          )}
        )}
      </section>
    );
  }

  const showWholeShiftCard = (shift, takeButton=false) => {
    return (
      <section>
        <section className={dateInThePast(shift.shift_date)? ("card-shift gray-bg"):("card-shift lightblue-bg")} >
          <p>DATE</p>
          <p>{shift.shift_date}</p>
          <p>START</p>
          <p>{formatTime(shift.start_time)}</p>
          <p>END</p>
          <p>{formatTime(shift.end_time)}</p>
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

        { takeButton ? showTakeShiftSection(shift) : null}

      </section>
    );
  }

  const isEmpBookedElsewhere = (possibleDate) => {
    for (const shift of sortedOwnShifts) {
      if (shift.shift_date > possibleDate) {
        return false;
      } else if (shift.shift_date === possibleDate) {
        return true;
      }
    }  
  } 

  const isEmpOffThatDay = (possibleDate) => {
    for (const unavail of sortedUnavails) {
      if (unavail.day_off > possibleDate) {
        return false;
      } else if (unavail.day_off === possibleDate) {
        return true;
      }
    }  
  } 

  const showTakeShiftSection = (shift) => {
    const bookedElsewhere = isEmpBookedElsewhere(shift.shift_date);
    const offThatDay = isEmpOffThatDay(shift.shift_date);
    const cannotWork = bookedElsewhere || offThatDay;

    if (cannotWork) {
      if (bookedElsewhere) {
        // TODO: This never gets triggered, already sifted out in EmployeeDash.showAllShifts(). Clean up!
        return (
          <section className="gray-bg text-centered margin-all-1rem">
            <p className="padding-all-1rem">You are already working elsewhere that day!</p>
            </section>
        );
      } else if (offThatDay) {
        return (
          <section className="gray-bg text-centered margin-all-1rem">
            <p className="padding-top-1rem">You have the day off but you can change your mind!</p>
            {/* Clicking on this button will result in re-rendering this section as 'eligible for shift', user should see lightblue-bg w/ blue button b/c reeval'd cannot=false */}
            <button onClick={() =>{removeUnavail(shift)}} className="btn btn-success margin-all-1rem">I can work</button>
            </section>
        );
      }
      
    } else {
      return (
        <section className="lightblue-bg text-centered margin-all-1rem">
          <p className="padding-top-1rem">You are eligible for this shift!</p>
          <button onClick={() =>{takeShiftCallback(shift)}} className="btn btn-primary margin-all-1rem">Take the shift</button>
          </section>
      );
    }
  }

  const removeUnavail = (shift) => {
    const unavailObj = sortedUnavails.find(unavail => unavail.day_off === shift.shift_date );
    freeToWorkCallback(unavailObj);
  }

  ////////////////// render ////////////////////
  if (!sortedOwnShifts) {
    // TODO: this never happens, sortedOwnShifts gen'd synchronously.  Did I leave this in for some reason?
    return (
      <section>
        <h1 className="text-centered">MY SHIFTS</h1>
        <p>Nothing yet...</p>
        
        <h1 className="text-centered">AVAILABLE SHIFTS</h1>
        {showUnstaffedShifts()}
      </section>
    );

  } else {
    return(
      <section>
        <h1 className="text-centered">MY SHIFTS</h1>
        {showOwnActiveShifts()}
        <h1 className="text-centered">AVAILABLE SHIFTS</h1>
        {showUnstaffedShifts()}
        <h1 className="text-centered">PAST SHIFTS</h1>
        {showOwnPastShifts()}
      </section>
    );
  }    
}

export default EmployeeDash_ShiftsTable;


ShiftsTable.propTypes = {
  sortedOwnShifts: PropTypes.arrayOf(PropTypes.object), 
  sortedUnstaffedShifts: PropTypes.arrayOf(PropTypes.object), 
  sortedUnavails: PropTypes.arrayOf(PropTypes.object), 
  takeShiftCallback: PropTypes.func.isRequired, 
  freeToWorkCallback: PropTypes.func.isRequired,
};