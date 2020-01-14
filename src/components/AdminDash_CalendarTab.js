import React, { useState } from 'react';
import axios from 'axios';

import Accordion from 'react-bootstrap/Accordion';
import Calendar from 'react-calendar';
import CalendarDay from './AdminDash_CalendarDay';
import NewShift from './AdminDash_NewShift';

import { convertToPST, formatDate, convertDateString } from './Helpers';


const CalendarTab = ({allShifts, allClients, allEmployees, allUnavails, updateAllShiftsCallback, textEmployeesCallback}) => {
  const today = convertDateString(new Date());
  const [daySpotlight, setDaySpotlight] = useState(today);
  const [shiftsOfDay, setShiftsOfDay] = useState("LOADING");
  const [availEmpsOfDay, setAvailEmpsOfDay] = useState("LOADING");

  // console.log("\n\n\nCalendarTab props: allShifts = ", allShifts, "\nallEmployees = ", allEmployees, "\nallUnavails = ", allUnavails, "\nallClients = ", allClients);
  
  const updateStateForCalendarDay = (e) => {
    const dateStr = convertDateString(e);
    console.log("\n\nsetting: daySpotlight = ", dateStr);
    
    getAndSetShiftsOfDay(dateStr);
    getAndSetAvailEmpsByDate(dateStr);
    setDaySpotlight(dateStr);
  }

  const getAndSetShiftsOfDay = (targetDateStr) => {
    let shiftsOfDay = [];
    for (const shift of allShifts) {
      if (shift.shift_date === targetDateStr ) { 
        shiftsOfDay.push(shift); 
      } else if (shift.shift_date > targetDateStr) {
        break;
      }
    }
    console.log(targetDateStr, "setting shiftsOfDay =", shiftsOfDay);
    setShiftsOfDay(shiftsOfDay);
  }

  const getAndSetAvailEmpsByDate = (targetDateStr) => {
    const URL_getAllAvailEmpsByDate = process.env.REACT_APP_GET_AVAIL_EMPS_FOR_DAY + `/${targetDateStr}`;
    
    // console.log("SENDING API TO", URL_getAllAvailEmpsByDate);

    axios.get(URL_getAllAvailEmpsByDate)
    .then(response => {
      // console.log("backend sent us... ", response.data);
      setAvailEmpsOfDay(response.data);
    })
    .catch(error => console.log(error.message));
  }

  const showAvailEmpsInCard = () => {
    // console.log("availEmpsOfDay = ", availEmpsOfDay);

    if (availEmpsOfDay === "LOADING") {
      return (<section>Loading...</section>)
    } else if (availEmpsOfDay === []) {
      return (<section>No one is available!</section>);
    } else {
      return (
      <section>
        {showRowsOfEmps()}
      </section>
    );
    }
  }

  const showRowsOfEmps = () => availEmpsOfDay.map(emp => {
      return(
        <section key={emp.id} className="section-2-col">
          <section>{emp.name}</section>
          <section>{emp.phone}</section>
        </section>
      );
    })

  //////////////////// callback fcns ////////////////////
  const prepForTextEmployeesCallback = (newShift) => {
    // <NewShift> is sending this back, which we'll need to add the availEmpsOfDay into the args before sending back up to AdminDash
    textEmployeesCallback(newShift, availEmpsOfDay);
  }

  

  //////////////////// prep initial state ////////////////////
  if (shiftsOfDay === "LOADING") { getAndSetShiftsOfDay(daySpotlight) }

  if (availEmpsOfDay === "LOADING") { getAndSetAvailEmpsByDate(daySpotlight) }

  if (shiftsOfDay === "LOADING" && availEmpsOfDay === "LOADING") {
    return (<section>LOADING</section>);
  }
  
  //////////////////// render ////////////////////
    return(
      
      <section>
      <Calendar onChange={updateStateForCalendarDay} value={convertToPST(daySpotlight)}/>
      {/* <NewShift /> and <CalendarDay /> will change based on which day you click on in the <Calendar> */}

      <Accordion>
          <Accordion.Toggle eventKey="newShift" className="accordion-toggle_button">
            <section>
              <section>▼ MAKE A NEW SHIFT</section>
            </section>
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="newShift">
          <NewShift daySpotlight={daySpotlight} allClients={allClients} updateAllShiftsCallback={updateAllShiftsCallback} textEmployeesCallback={prepForTextEmployeesCallback} /> 
          </Accordion.Collapse>
      </Accordion>
      
      <Accordion>
        <Accordion.Toggle eventKey="availEmpList" className="accordion-toggle_button">
          <section>
            <section>▼ {availEmpsOfDay === "LOADING" ? "Loading":availEmpsOfDay.length} AVAILABLE EMPLOYEES FOR {formatDate(daySpotlight)}</section>
          </section>
        </Accordion.Toggle>

        <Accordion.Collapse eventKey="availEmpList">
          {/* send API call to backend to get all avail emps for the daySpotlight */}
          {showAvailEmpsInCard()}
        </Accordion.Collapse>
      </Accordion>

      <Accordion>
        <Accordion.Toggle eventKey="dayAgenda" className="accordion-toggle_button">
          <section>
            <section>▼AGENDA FOR {formatDate(daySpotlight)}</section>
          </section>
        </Accordion.Toggle>

        <Accordion.Collapse eventKey="dayAgenda">
          <CalendarDay basicShiftsInfo={shiftsOfDay} dateStr={daySpotlight} />
        </Accordion.Collapse>
      </Accordion>

      {/* <Accordion>
        <Accordion.Toggle eventKey="weekAgenda" className="accordion-toggle_button">
          <section>
            <section>▼AGENDA FOR THIS WEEK</section>
          </section>
        </Accordion.Toggle>

        <Accordion.Collapse eventKey="weekAgenda">
          <h1>Upcoming feature, stay tuned...</h1>
        </Accordion.Collapse>
      </Accordion> */}
    </section>
    );
  }



export default CalendarTab;
