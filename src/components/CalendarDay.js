import React from 'react';

const CalendarDay = ({completeShiftsInfo, dateStr}) => {
  console.log("CalendarDay received date=", dateStr);

  // completeShiftsInfo = [ [shift1], [shift2], [shift3], etc ]
    // subarray = [[shiftInfo], [employeeInfo], [clientInfo]] 

  console.log(completeShiftsInfo);
  for (const eachShift of completeShiftsInfo) {
    console.log(eachShift[0].id);
    console.log(eachShift[1].name);
    console.log(eachShift[2]);
  }

  const showShifts = () => {
    if (completeShiftsInfo.length === 0) {
      return(
        <h3>No shifts scheduled
        <br />BUG!!! today doesn't show automatically, assumed none!</h3>
      );
    } else {

      return ( completeShiftsInfo.map (shift => {
        return (
        <tr key={shift.id}> 
          <td>{shift[1].name}</td>
          <td>{shift[2].name}</td>
          <td><button className="btn btn-primary">Update</button></td>
          <td><button className="btn btn-primary">Delete</button></td>
        </tr>
        );
    }));
    }    
  }
  
  // <td>shift.id = {shift.id}</td>
  //       <td>shift.client_id = {shift.client_id}</td>
  //       <td>shift.employee_id = {shift.employee_id}</td>
  //       <td>shift.shift_date = {shift.shift_date}</td>
  //       <td>shift.start_time = {shift.start_time}</td>
  //       <td>shift.end_time = {shift.end_time}</td>
  
  
  // showAllShifts = () => {
  //   const URL_endpoint = BASE_URL + ALL_SHIFTS
  //   const listFromState = this.state.allShifts
  //   return ( listFromState.map((shift, i) => {
  //     return (
  //       <section>
  //         <tr key={i}>
  //           <td>{shift.shift_date}</td>
  //           <td><button onClick={() => this.read(i, listFromState)} className="btn btn-primary">Info</button></td>
  //           <td><button onClick={() => this.update(i, listFromState)} className="btn btn-primary">TODO: Update</button></td>
  //           <td><button onClick={() => this.delete(shift, URL_endpoint)} className="btn btn-danger">Delete</button></td>
  //         </tr>
  //         <tr>
  //           {this.state.personSpotlight === shift ? this.showPersonSpotlight(shift):null}
  //         </tr>
  //       </section>
  //     )})
  //   );
  // }




  return(
    <section>
      <h1>All Shifts For {dateStr}</h1>
      {showShifts()}
    </section>
  );
  
}

export default CalendarDay;


