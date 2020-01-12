import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Calendar from 'react-calendar';
import CalendarDay from './AdminDash_CalendarDay';
import NewShift from './AdminDash_NewShift';

import { convertToPST, formatDate } from './Helpers';


const CalendarTab = ({allShifts, allClients, daySpotlight, shiftsOfDay, availEmpsOfDay, updateDaySpotlightCallback}) => {

  console.log("\n\n\nCalendarTab props: daySpotlight = ", daySpotlight, "\nshiftsOfDay = ", shiftsOfDay, "\navailEmpsOfDay = ", availEmpsOfDay);
  if (shiftsOfDay === "LOADING" || availEmpsOfDay === "LOADING") {
    updateDaySpotlightCallback(new Date());
    return (<section>LOADING</section>)
  }

  const showAvailEmpsInCard = () => {
    console.log("DISPLAY", availEmpsOfDay);
    const listOfAvailEmps = availEmpsOfDay;
    if (listOfAvailEmps === []) {
      return (<section>No one is available!</section>);
    }

    const rowsOfEmps = listOfAvailEmps.map(emp => {
      return(
        <section key={emp.id} className="section-2-col">
          <section>{emp.name}</section>
          <section>{emp.phone}</section>
        </section>
      );
    })
    return (
      <section>
        <section>AVAILABLE EMPLOYEES</section>
        {rowsOfEmps}
      </section>
    );
}
  
  
  //////////////////// render ////////////////////
    return(
      <section>
      <Calendar onChange={updateDaySpotlightCallback} value={convertToPST(daySpotlight)}/>
      {/* <NewShift /> and <CalendarDay /> will change based on which day you click on in the <Calendar> */}

      {/* <Accordion>
          <Accordion.Toggle eventKey="newShift" className="accordian-toggle_button">
            <section>
              <section>MAKE A NEW SHIFT</section>
            </section>
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="newShift">
          <NewShift daySpotlight={daySpotlight} allClients={allClients} allShifts={allShifts}/> 
          </Accordion.Collapse>
      </Accordion> */}
      
      <Accordion>
        <Accordion.Toggle eventKey="availEmpList" className="accordian-toggle_button">
          <section>
            <section>AVAILABLE EMPLOYEES FOR {formatDate(daySpotlight)}</section>
          </section>
        </Accordion.Toggle>

        <Accordion.Collapse eventKey="availEmpList">
          {/* send API call to backend to get all avail emps for the daySpotlight */}
          {showAvailEmpsInCard()}
        </Accordion.Collapse>
      </Accordion>

      <Accordion>
        <Accordion.Toggle eventKey="dayAgenda" className="accordian-toggle_button">
          <section>
            <section>AGENDA FOR {formatDate(daySpotlight)}</section>
          </section>
        </Accordion.Toggle>

        <Accordion.Collapse eventKey="dayAgenda">
          <CalendarDay basicShiftsInfo={shiftsOfDay} dateStr={daySpotlight} />
        </Accordion.Collapse>
      </Accordion>

      {/* <Accordion>
        <Accordion.Toggle eventKey="weekAgenda" className="accordian-toggle_button">
          <section>
            <section>AGENDA FOR THIS WEEK</section>
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
