import React, { useState } from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';

import { convertTimeString, formatDate, sortShiftsByDate } from './Helpers';

const EmployeeDash_ShiftsTable = ({allShifts}) => {

  const [availEmployees, setAvailEmployees] = useState([]);

  allShifts = sortShiftsByDate(allShifts);

  const showEmpNameOrButton = (shift) => {
    if (shift.employee) {
      return (shift.employee.name);
    } else {
      return (<button onClick={()=>getAvailEmps(shift)} className="btn btn-success">Find employees</button>);
    }
  }

  const getAvailEmps = (shift) => {

    const URL = process.env.REACT_APP_GET_AVAIL_EMPS + `/${shift.id}`;

    axios.get(URL)
    .then(response => {
      console.log("backend returns list of avail emps: ", response.data);
      setAvailEmployees(response.data);
      // 
    })
    .catch(error => console.log("Error getting availEmps:", error.message));
    //
  }

  const showShiftInfoCard = (shift) => {
    return (
      <card>
        <section className="card-shift">
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

        {/* employee info section shows any of the 3 options:
          1. actual employee info, if staffed
          2. blank fields, if unstaffed & user clicked on accordion but NOT the 'find employees' button
          3. list of available employees for that shift, if 'find employees' button was clicked */}
        
        { shift.employee ? showEmpInCard(shift) : showAvailEmpsInCard() }
        
      </card>
    );

  }

  const showEmpInCard = (shift) => {
    return (
      <section className="card-employee">
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

  const showAvailEmpsInCard = () => {
    console.log("DISPLAY", availEmployees);

    const rowsOfEmps = availEmployees.map(emp => {
      return(
        <section key={emp.id} className="section-2-col">
          <section>{emp.name}</section>
          <section>{emp.phone}</section>
        </section>
      );
    })
    return (
      <section>
        <button>TEXT ALL</button>
        
        {rowsOfEmps}
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

        {allShifts.map(shift => {
          return (
            <Accordion key={shift.id}>
              <section>
                <Accordion.Toggle eventKey="showInfo" className="accordian-toggle_button">
                  <section className="section-4-col">
                    <section>Info</section>
                    <section>{formatDate(shift.shift_date)}</section>
                    <section>{shift.client.name}</section>
                    <section>{showEmpNameOrButton(shift)}</section>
                  </section>
                </Accordion.Toggle>

                <Accordion.Collapse eventKey="showInfo">
                  <section>{showShiftInfoCard(shift)}</section>
                </Accordion.Collapse>

              </section>
            </Accordion>

          )}

            
            
        )}
      </section>
    );
  }    
}

export default EmployeeDash_ShiftsTable;

