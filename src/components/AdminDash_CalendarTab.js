import React, { useState } from 'react';
import axios from 'axios';
import { makeHeader } from './Helpers';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Accordion from 'react-bootstrap/Accordion';
import Calendar from 'react-calendar';
import CalendarDay from './AdminDash_CalendarDay';
import NewShift from './AdminDash_NewShift';

import { convertToPST, formatDate, convertDateString, dateInThePast } from './Helpers';


const CalendarTab = ({allShifts, allClients, updateAllShiftsCallback, textEmployeesCallback}) => {
  const today = convertDateString(new Date());
  const [daySpotlight, setDaySpotlight] = useState(today);
  const [shiftsOfDay, setShiftsOfDay] = useState("LOADING");
  const [availEmpsOfDay, setAvailEmpsOfDay] = useState("LOADING");

  const updateStateForCalendarDay = (e) => {
    const dateStr = convertDateString(e);
    
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
    
    setShiftsOfDay(shiftsOfDay);
  }

  const getAndSetAvailEmpsByDate = (targetDateStr) => {
    const URL_getAllAvailEmpsByDate = process.env.REACT_APP_GET_AVAIL_EMPS_FOR_DAY + `/${targetDateStr}`;
    const headers = makeHeader();

    axios.get(URL_getAllAvailEmpsByDate, {headers} )
    .then(response => setAvailEmpsOfDay(response.data))
    .catch(error => toast.error(error.message));

  }

  //////////////////// display options ////////////////////
  const tileContent = ({ date, view }) => {
    let tileCaption = " - ";
    let tileClassName = "";
    
    const targetDate = convertDateString(date);
    // <Calendar> will iterate thru each date in the display month
      // if no one's avail to work that day -> red background!
      // these 2 below supercedes display above
      // if date is in the past -> gray background
      // if it's on today -> gold background  
    if (daySpotlight === targetDate && availEmpsOfDay.length === 0) {
      tileCaption = "😱";
      tileClassName = "tile-no-workers";
    }

    if (dateInThePast(targetDate)) {
      tileCaption = " x ";
      tileClassName = "tile-past";
    } else if (targetDate === today) {
      tileCaption = "TODAY";
      tileClassName = "tile-today";
    }

    // we only need to see the colored tiles when looking at monthly view.
    if (view === "month") {
      return (
        <section className={tileClassName}>{tileCaption}</section>
      );
    } 
  }

  const showAccordionHeaderColor = () => {
    if (daySpotlight === today) {
      return "accordion-toggle_button_gold";
    } else if (availEmpsOfDay.length === 0) {
      return "accordion-toggle_button_red";  
    } else if (dateInThePast(daySpotlight)) {
      return "accordion-toggle_button_gray";
    } else {
      return "accordion-toggle_button";
    }
  }

  const showColorBasedOnDay = () => {
    if (daySpotlight === convertDateString(new Date())) {
      return "lightgold-bg";
    } else if (dateInThePast(daySpotlight)) {
      return "lightgray-bg";
    } else if (availEmpsOfDay.length === 0) {
      return "lightred-bg";
    } else {
      return "lightblue-bg";
    }
  }

  const showAvailEmpsInCard = () => {
    if (dateInThePast(daySpotlight)) {
      return (<section className={showColorBasedOnDay()+" text-centered"}> This day is in the past...</section>);
    }

    if (availEmpsOfDay === "LOADING") {
      return (<section className={showColorBasedOnDay()+" text-centered"}>Loading...</section>);
    } else if (availEmpsOfDay.length === 0) {
      return (<section className={showColorBasedOnDay()+" text-centered"}>No one is available!</section>);
    } else {
      return (
      <section className={`padding-all-1rem ${showColorBasedOnDay()}`}>
        <section className="section-3-col text-centered">
          <h5>EMPLOYEE</h5>
          <h5>PHONE</h5>
          <h5>EMAIL</h5>
        </section>
        {showRowsOfEmps()}
      </section>
    );
    }
  }

  const showRowsOfEmps = () => availEmpsOfDay.map(emp => {
      return(
        <section key={emp.id} className="section-3-col text-centered">
          <section>{emp.name}</section>
          <section>{emp.phone}</section>
          <section>{emp.email}</section>
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
        <section className="calendar-container">
          <Calendar tileContent={tileContent} onChange={updateStateForCalendarDay} value={convertToPST(daySpotlight)}/>
          {/* <NewShift /> and <CalendarDay /> will change based on which day you click on in the <Calendar> */}
        </section>

      <Accordion>
          <Accordion.Toggle eventKey="newShift" className={showAccordionHeaderColor()}>
            <section>
              <section>▼ MAKE A NEW SHIFT</section>
            </section>
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="newShift">
          <NewShift daySpotlight={daySpotlight} allClients={allClients} availEmpsOfDay={availEmpsOfDay} updateAllShiftsCallback={updateAllShiftsCallback} textEmployeesCallback={prepForTextEmployeesCallback} showColorBasedOnDay={showColorBasedOnDay}/> 
          </Accordion.Collapse>
      </Accordion>
      
      <Accordion>
        <Accordion.Toggle eventKey="availEmpList" className={showAccordionHeaderColor()}>
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
        <Accordion.Toggle eventKey="dayAgenda" className={showAccordionHeaderColor()}>
          <section>
            <section>▼AGENDA FOR {formatDate(daySpotlight)}</section>
          </section>
        </Accordion.Toggle>

        <Accordion.Collapse eventKey="dayAgenda">
          <CalendarDay basicShiftsInfo={shiftsOfDay} dateStr={daySpotlight} showColorBasedOnDay={showColorBasedOnDay} />
        </Accordion.Collapse>
      </Accordion>

    </section>
    );
  }



export default CalendarTab;


CalendarTab.propTypes = {
  allShifts: PropTypes.arrayOf(PropTypes.object), 
  allClients: PropTypes.arrayOf(PropTypes.object), 
  updateAllShiftsCallback: PropTypes.func.isRequired, 
  textEmployeesCallback: PropTypes.func.isRequired,
};