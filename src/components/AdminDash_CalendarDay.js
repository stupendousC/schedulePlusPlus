import React from 'react';
import PropTypes from 'prop-types';
import { formatTime } from './Helpers';

const CalendarDay = ({basicShiftsInfo, dateStr, showColorBasedOnDay}) => {

  const showShifts = () => {
    return ( basicShiftsInfo.map (shift => {
      return (
        <section key={shift.id} className="section-4-col"> 
          <section>{shift.client.name}</section>
          <section>{shift.employee ? shift.employee.name:""}</section>
          <section>{formatTime(shift.start_time)}</section>
          <section>{formatTime(shift.end_time)}</section>
        </section>
        );
    }));
  }


  const showTableOrNothing = () => {
    if (!basicShiftsInfo || basicShiftsInfo === [] || basicShiftsInfo.length === 0) {
      return (
        <h3 className="text-centered padding-all-1rem">No shifts scheduled</h3>
      );
    } else {
      return (
        <section>
          <section className="section-4-col padding-top-1rem text-centered"> 
            <h5>CLIENT</h5>
            <h5>EMPLOYEE</h5>
            <h5>START</h5>
            <h5>END</h5>
          </section>

          <section className="text-centered padding-bottom-1rem"> 
            {showShifts()}
          </section>
        </section>
      );
    }
  }

  return(
    <section className={showColorBasedOnDay()}>
      {showTableOrNothing()}
    </section>
  );
  
}

export default CalendarDay;

CalendarDay.propTypes = {
  basicShiftsInfo: PropTypes.arrayOf(PropTypes.object), 
  dateStr: PropTypes.string.isRequired, 
  showColorBasedOnDay: PropTypes.func.isRequired
};