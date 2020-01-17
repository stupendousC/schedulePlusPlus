import React from 'react';

const CalendarDay = ({basicShiftsInfo, dateStr, showColorBasedOnDay}) => {
  // const [findEmployeesClicked, setFindEmployeesClicked] = useState(false);
  // console.log("CalendarDay showing", dateStr, "\nbasicShiftsInfo = ", basicShiftsInfo);

  const showShifts = () => {
    return ( basicShiftsInfo.map (shift => {
      return (
        <section key={shift.id} className="section-3-col"> 
          <section>{shift.shift_date}</section>
          <section>{shift.client.name}</section>
          <section>{shift.employee ? shift.employee.name:""}</section>
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
          <section className="section-3-col"> 
            <section>Date</section>
            <section>Client</section>
            <section>Employee</section>
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

