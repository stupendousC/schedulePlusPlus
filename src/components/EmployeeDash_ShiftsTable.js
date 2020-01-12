import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { convertTimeString, formatDate, dateInThePast, getWeekday } from './Helpers';

const EmployeeDash_ShiftsTable = ({sortedOwnShifts, sortedUnstaffedShifts, sortedUnavails, takeShiftCallback, freeToWorkCallback}) => {

  ////////////////// prelim work ////////////////////
  // divide the sortedOwnShifts into active shifts (current & future) and past shifts
  console.log("doing this!");

  ////////////////// fcns ////////////////////
  const showOwnActiveShifts = () => {
    return sortedOwnShifts.map(shift => {
      return (
        <Accordion key={shift.id}>
          <section>
            <Accordion.Toggle eventKey="showInfo" className={dateInThePast(shift.shift_date)? ("accordian-toggle_button gray-bg"):("accordian-toggle_button blue-bg")}>
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

  const showOwnPastShifts = () => {
    return (<section>showing past shifts</section>)
  }

  const showUnstaffedShifts = () => {
    console.log("show sortedUnstaffedShifts", sortedUnstaffedShifts);
    
    return(
      <section>
        {sortedUnstaffedShifts.map(shift => {
          return (
            <Accordion key={shift.id}>
              <section>
                <Accordion.Toggle eventKey="showInfo" className={dateInThePast(shift.shift_date)? ("accordian-toggle_button gray-bg"):("accordian-toggle_button blue-bg")}>
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
        <section className={dateInThePast(shift.shift_date)? ("card-shift gray-bg"):("card-shift blue-bg")} >
          <p>DATE</p>
          <p>{shift.shift_date}</p>
          <p>START</p>
          <p>{convertTimeString(shift.start_time)}</p>
          <p>END</p>
          <p>{convertTimeString(shift.end_time)}</p>
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
        return (
          <section className="gray-bg">
            <p>You are already working elsewhere that day!</p>
            </section>
        );
      } else if (offThatDay) {
        return (
          <section className="gray-bg">
            <p>You have the day off but you can change your mind!</p>
            {/* Clicking on this button will result in re-rendering this section as 'eligible for shift', user should see blue-bg w/ blue button b/c reeval'd cannot=false */}
            <button onClick={() =>{removeUnavail(shift)}} className="btn btn-success">Take the shift</button>
            </section>
        );
      }
      
    } else {
      return (
        <section className="blue-bg">
          <p>You are eligible for this shift!</p>
          <button onClick={() =>{takeShiftCallback(shift)}} className="btn btn-primary">Take the shift</button>
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
    return (
      <section>
        <h1>MY SHIFTS</h1>
        <p>Nothing yet...</p>
        
        <h1>AVAILABLE SHIFTS</h1>
        {showUnstaffedShifts()}
      </section>
    );

  } else {
    return(
      <section>
        <h1>MY SHIFTS</h1>
        {showOwnActiveShifts()}
        <h1>AVAILABLE SHIFTS</h1>
        {showUnstaffedShifts()}
        <h1>PAST SHIFTS</h1>
        {showOwnPastShifts()}
      </section>
    );
  }    
}

export default EmployeeDash_ShiftsTable;
