import React from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';

import { convertTimeString, formatDate, sendTexts } from './Helpers';

class ShiftsTable extends React.Component {
  constructor() {
    super()
    // props allShifts comes pre-sorted by date
    this.state = {
      stillLoading: true,
      availEmployeesByShiftId: {}
    }
  }
  
  componentDidMount() {
    // assemble list of availEmployees for all the unstaffed shifts
    let availEmployeesByShiftId = {};

    const allUnstaffedShifts = this.props.allShifts.filter (shift => !shift.employee );
    const axiosGetFcns = allUnstaffedShifts.map( unstaffedShift => {
      const URL = process.env.REACT_APP_GET_AVAIL_EMPS_FOR_SHIFT + `/${unstaffedShift.id}`;
      return axios.get(URL);
    })

    axios.all(axiosGetFcns)
    .then(axios.spread((...responses) => {
      // console.log("backend sent:", responses);

      // match up responses to allUnstaffedShifts
      for ( let i = 0; i < allUnstaffedShifts.length; i++) {
        const shiftId = allUnstaffedShifts[i].id;
        availEmployeesByShiftId[shiftId] = responses[i].data;
      }

      // setState
      this.setState({
        availEmployeesByShiftId: availEmployeesByShiftId,
        stillLoading: false
      });
      // console.log("this.state.availEmployeesByShiftId =", availEmployeesByShiftId);
    }))
    .catch( errors => console.log(errors));
  }

  ////////////////////////// display //////////////////////////
  showEmpNameOrButton = (shift) => {
    if (shift.employee) {
      return (shift.employee.name);
    } else {
      // the button really is just for show, 
      // clicking on the entire bar (inc the button) is what sends an API call to backend for the list of avail employees
      return (<button className="btn btn-primary">Find employees</button>);
    }
  }

  showWholeShiftCard = (shift) => {
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
        { shift.employee ? this.showEmpInCard(shift) : this.showAvailEmpsInCard(shift) }

      </section>
    );
  }

  // showWholeShiftCard() calls this if ... A. shift is staffed
  showEmpInCard = (shift) => {
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
  showAvailEmpsInCard = (shift) => {
    
    const availEmpList = this.state.availEmployeesByShiftId[shift.id];
    const stillLoading = this.state.stillLoading;

    // console.log("shift id", shift.id, "corresponds to ", availEmpList);
    
    if (stillLoading) {
      return (
        <section>Loading...</section>
      );
    } else if (availEmpList === [] && !stillLoading) {
      return (
        // DO SOEMTHING SUPER SPECIAL FOR THIS EMERGENCY!!!
        <section>NO EMPLOYEES AVAILABLE!</section>
      );
    } else {
      
      const empList = Array.from(availEmpList);
      console.log("need to iterate over this shit!", empList);
      return (
        empList.map( emp => {
          return(
            <section key={emp.id}>
              <section>{emp.name}</section>
              <section>{emp.phone}</section>
            </section>
          );
        }) 
      );
      

      //   return(
      //       <section key={emp.id} className="card-employee">
      //         <section>{emp.name}</section>
      //         <section>{emp.phone}</section>
      //       </section>
      //     );
      // }
    }

    
  //   const listOfEmps = this.state.availEmployeesByShiftId[shift.id];
  //   console.log("\nGONNA SHOW...", listOfEmps);
  //   // const numEmps = Object.keys(listOfEmps).length;
  //   const numEmps = "XXX";

  //   // const rowsOfEmps = listOfEmps.map(emp => {
  //   //   // return(
  //   //   //   <section key={emp.id} className="card-employee">
  //   //   //     <section>{emp.name}</section>
  //   //   //     <section>{emp.phone}</section>
  //   //   //   </section>
  //   //   // );
  //   // })


  //   return (
  //     <section className="blue-bg">
  // <button onClick={()=>{sendTexts(listOfEmps, shift)}} className="btn btn-primary">TEXT ALL {numEmps} AVAILABLE EMPLOYEES</button>
  //       {this.state.availEmployeesByShiftId === {}? "nothing yet":rowsOfEmps()}
  //     </section>
  //   );
  }

  

  ////////////////// render ////////////////////
  render() {
    if (this.props.allShifts.length === 0) {
      return (
        <section>No upcoming shifts</section>
      );

    } else {
      return(
        <section>
          {this.props.allShifts.map(shift => {
            return (
              <Accordion key={shift.id}>
                <section>
                  <Accordion.Toggle eventKey="showInfo" className="accordian-toggle_button">
                  {/* <Accordion.Toggle onClick={()=>{getAvailEmps(shift)}} eventKey="showInfo" className="accordian-toggle_button"> */}
                    <section className="section-4-col">
                      <section>#{shift.id}</section>
                      <section>{formatDate(shift.shift_date)}</section>
                      <section>{shift.client.name}</section>
                      <section>{this.showEmpNameOrButton(shift)}</section>
                    </section>
                  </Accordion.Toggle>

                  <Accordion.Collapse eventKey="showInfo">
                    <section>{this.showWholeShiftCard(shift)}</section>
                  </Accordion.Collapse>

                </section>
              </Accordion>

            )}

              
              
          )}
        </section>
      );
    }    
    }
}

export default ShiftsTable;


