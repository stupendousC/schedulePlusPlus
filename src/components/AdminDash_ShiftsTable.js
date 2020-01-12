import React from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';

import { convertTimeString, formatDate, sortShiftsByDate, sendTexts } from './Helpers';

const ShiftsTable = ({allShifts}) => {
  
  ////////////////////////// prelim work //////////////////////////
  const assembleAvailEmployeesByShiftId = () => {
    // assemble list of availEmployees for all the unstaffed shifts
    let availEmployeesByShiftId = {};

    const allUnstaffedShifts = allShifts.filter (shift => !shift.employee );
    const axiosGetFcns = allUnstaffedShifts.map( unstaffedShift => {
      const URL = process.env.REACT_APP_GET_AVAIL_EMPS_FOR_SHIFT + `/${unstaffedShift.id}`;
      return axios.get(URL);
    })

    axios.all(axiosGetFcns)
    .then(axios.spread((...responses) => {
      console.log("backend sent:", responses);

      // match up responses to allUnstaffedShifts
      for ( let i = 0; i < allUnstaffedShifts.length; i++) {
        const shiftId = allUnstaffedShifts[i].id;
        availEmployeesByShiftId[shiftId] = responses[i].data;
      }

      console.log("now availEmployeesByShiftId =", availEmployeesByShiftId);
    }))
    .catch( errors => console.log(errors));

    return availEmployeesByShiftId;
  }
  
  const availEmployeesByShiftId = assembleAvailEmployeesByShiftId();
  const allShiftsSorted = sortShiftsByDate(allShifts);

  ////////////////////////// display //////////////////////////
  const showEmpNameOrButton = (shift) => {
    if (shift.employee) {
      return (shift.employee.name);
    } else {
      // the button really is just for show, 
      // clicking on the entire bar (inc the button) is what sends an API call to backend for the list of avail employees
      return (<button className="btn btn-primary">Find employees</button>);
    }
  }

  const showWholeShiftCard = (shift) => {
    return (
      <section>
        <section className="card-shift blue-bg">
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

        {/* employee info section shows either: A. actual employee info if staffed. B. list of available employees for that shift */}
        { shift.employee ? showEmpInCard(shift) : showAvailEmpsInCard(shift) }

      </section>
    );
  }

  // showWholeShiftCard() calls this if ... A. shift is staffed
  const showEmpInCard = (shift) => {
    return (
      <section className="card-employee blue-bg">
          <p>EMPLOYEE</p>
          { shift.employee ? <p>{shift.employee.name}</p> : <p></p> }
          <p>PHONE</p>
          { shift.employee ? <p>{shift.employee.phone}</p> : <p></p> }
          <p>EMAIL</p>
          { shift.employee ? <p>{shift.employee.email}</p> : <p></p> }
          <p>ADDRESS</p>
          { shift.employee ? <p>{shift.employee.address}</p> : <p></p> }
        </section>
    );
  }

  // showWholeShiftCard() calls this if ... B. shift is unstaffed
  const showAvailEmpsInCard = (shift) => {
    
    const listOfEmps = availEmployeesByShiftId[shift.id];
    console.log("\nGONNA SHOW...", listOfEmps);
    // const numEmps = Object.keys(listOfEmps).length;
    const numEmps = 100;

    // const rowsOfEmps = listOfEmps.map(emp => {
    //   return(
    //     <section key={emp.id} className="card-employee">
    //       <section>{emp.name}</section>
    //       <section>{emp.phone}</section>
    //     </section>
    //   );
    // })

    return (
      <section className="blue-bg">
  <button onClick={()=>{sendTexts(listOfEmps, shift)}} className="btn btn-primary">TEXT ALL {numEmps} AVAILABLE EMPLOYEES</button>
        {/* {rowsOfEmps} */}
      </section>
    );
  }

  

  ////////////////// render ////////////////////
  if (allShifts.length === 0) {
    return (
      <section>No upcoming shifts</section>
    );

  } else {
    return(
      <section>

        {allShiftsSorted.map(shift => {
          return (
            <Accordion key={shift.id}>
              <section>
                <Accordion.Toggle eventKey="showInfo" className="accordian-toggle_button">
                {/* <Accordion.Toggle onClick={()=>{getAvailEmps(shift)}} eventKey="showInfo" className="accordian-toggle_button"> */}
                  <section className="section-4-col">
                    <section>#{shift.id}</section>
                    <section>{formatDate(shift.shift_date)}</section>
                    <section>{shift.client.name}</section>
                    <section>{showEmpNameOrButton(shift)}</section>
                  </section>
                </Accordion.Toggle>

                <Accordion.Collapse eventKey="showInfo">
                  <section>{showWholeShiftCard(shift)}</section>
                </Accordion.Collapse>

              </section>
            </Accordion>

          )}

            
            
        )}
      </section>
    );
  }    
}

export default ShiftsTable;






  
  
  //// GETTING REPLACED BY PRELIM DATA GRAB
  // const getAvailEmps = (shift) => {
  //   // const URL = process.env.REACT_APP_GET_AVAIL_EMPS_FOR_SHIFT + `/${shift.id}`;

  //   // axios.get(URL)
  //   // .then(response => {
  //   //   availEmployeesByShiftId[shift.id] = response.data;
  //   //   console.log("Now availEmployeesByShiftId =", availEmployeesByShiftId);
  //   // })
  //   // .catch(error => console.log("Error getting availEmps:", error.message));
  // }
