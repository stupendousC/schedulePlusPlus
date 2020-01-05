import React from 'react';

const CalendarDay = ({shiftsOfDay}) => {

  const showShiftsOnThisDay = () => {
    console.log(shiftsOfDay);
    return ( shiftsOfDay.map (shift => {
      return (
      <tr key={shift.id}> 
        <td>{shift.shift_date}</td>
        <td><button className="btn btn-primary">Update</button></td>
        <td><button className="btn btn-primary">Delete</button></td>

      </tr>
      );
    })

    );
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
      <h1>Shifts For This Day</h1>
      {showShiftsOnThisDay()}
    </section>
  );
  
}

export default CalendarDay;


