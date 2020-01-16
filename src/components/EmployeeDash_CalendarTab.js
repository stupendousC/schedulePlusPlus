import React, { useState } from 'react';
import axios from 'axios';

import Accordion from 'react-bootstrap/Accordion';
import Calendar from 'react-calendar';
import CalendarDay from './EmployeeDash_CalendarDay';

import { convertToPST, formatDate, convertDateString } from './Helpers';

const CalendarTab = ({URL, empUnavails, empShifts, daySpotlight, shiftsToday, shiftsOfDay, availStatusOfDay, unstaffedShifts, updateStateForCalendarDayCB, toggleAvailCallback}) => {
  const today = new Date();
  console.log('today=', today);
  





  /////////// render ////////////
  return(
    <section>
      
      <Calendar onChange={updateStateForCalendarDayCB} value={convertToPST(daySpotlight)}/>
      <CalendarDay toggleAvailCallback={toggleAvailCallback} shiftsToday={shiftsToday} shiftsOfDaySpotlight={shiftsOfDay} dateStr={daySpotlight} availStatus={availStatusOfDay}/>
    </section>
  );

}

// showCalendar = () => {
//   const tileContent = ({ date, view }) => {
//     return (
//       <section>
//         {date.getDay() === 0 ? <p className="blue-bg">Sun</p> : <p> </p>}
//         {date.getDay() === 1 ? <p className="gray-bg">Mon</p> : <p> </p>}
//       </section>);
//   }

//   return (
//     <section>
//       <Calendar tileContent={tileContent} onChange={this.updateStateForCalendarDay} value={convertToPST(this.state.daySpotlight)}/>
//       <CalendarDay toggleAvailCallback={this.toggleAvail} today={this.state.today} shiftsToday={this.state.shiftsToday} shiftsOfDaySpotlight={this.state.shiftsOfDay} dateStr={this.state.daySpotlight} availStatus={this.state.availStatusOfDay}/>
//     </section>
//   );
// }


export default CalendarTab;