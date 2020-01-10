import React from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import { convertTimeString, formatDate, dateInThePast } from './Helpers';

const EmployeeDash_ShiftsTable = ({sortedOwnShifts, sortedUnstaffedShifts, sortedUnavails}) => {

  const showUnstaffedShifts = () => {
    console.log("show sortedUnstaffedShifts", sortedUnstaffedShifts);
    
    return(
      <section>
        {sortedUnstaffedShifts.map(shift => {
          return (
            <Accordion key={shift.id}>
              <section>
                <Accordion.Toggle eventKey="showInfo" className={dateInThePast(shift.shift_date)? ("accordian-toggle_button blue-bg"):("accordian-toggle_button gray-bg")}>
                  <section className="section-4-col">
                    <section>{formatDate(shift.shift_date)}</section>
                    <section>{shift.client.name}</section>
                    <section>{convertTimeString(shift.start_time)}</section>
                    <section>{convertTimeString(shift.end_time)}</section>
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
        <section className={dateInThePast(shift.shift_date)? ("card-shift blue-bg"):("card-shift gray-bg")} >
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

  const showTakeShiftSection = (shift) => {
    return (
      <section className="blue-bg">
          <p>Can I work on {shift.shift_date}?  IDK I gotta check first lol</p>
          <button onClick={() =>{takeShift(shift)}}>Take the shift</button>
        </section>
    );
  }

  const takeShift = (shift) => {
    console.log("NEED TO CHECK FIRST TO MAKE SURE IT'S NOT AN UNAVAIL DAY FOR EMPLOYEE!");
    // send axios call if everything's cool
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
        {sortedOwnShifts.map(shift => {
          return (
            <Accordion key={shift.id}>
              <section>
                <Accordion.Toggle eventKey="showInfo" className={dateInThePast(shift.shift_date)? ("accordian-toggle_button blue-bg"):("accordian-toggle_button gray-bg")}>
                  <section className="section-4-col">
                    <section>{formatDate(shift.shift_date)}</section>
                    <section>{shift.client.name}</section>
                    <section>{convertTimeString(shift.start_time)}</section>
                    <section>{convertTimeString(shift.end_time)}</section>
                  </section>
                </Accordion.Toggle>

                <Accordion.Collapse eventKey="showInfo">
                  <section>{showWholeShiftCard(shift)}</section>
                </Accordion.Collapse>

              </section>
            </Accordion>
          )}
        )}
        <h1>AVAILABLE SHIFTS</h1>
        {showUnstaffedShifts()}
      </section>
    );
  }    
}

export default EmployeeDash_ShiftsTable;
