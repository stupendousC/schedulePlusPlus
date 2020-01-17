import React from 'react';
import {formatTime} from './Helpers';

const CalendarDay = ({basicShiftsInfo, dateStr, showColorBasedOnDay}) => {
  // const [findEmployeesClicked, setFindEmployeesClicked] = useState(false);
  // console.log("CalendarDay showing", dateStr, "\nbasicShiftsInfo = ", basicShiftsInfo);

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
        <h3 className="text-centered">No shifts scheduled</h3>
      );
    } else {
      return (
        <section>
          <section className="section-4-col"> 
            <section>CLIENT</section>
            <section>EMPLOYEE</section>
            <section>START</section>
            <section>END</section>
          </section>

          <section>
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

