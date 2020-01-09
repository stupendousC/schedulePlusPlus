import React from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';

import { convertTimeString, formatDate, sortShiftsByDate } from './Helpers';

const EmployeeDash_ShiftsTable = ({allShifts}) => {

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
    console.log("ok, gonna find soemone for shift obj", shift);

    axios.get(URL)
    .then(response => {
      console.log("backend returns list of avail emps: ", response.data);
      // 
    })
    .catch(error => console.log("Error getting availEmps:", error.message));
    //
  }


  ////////////////// render ////////////////////
  if (allShifts.length === 0) {
    return (
      <section>No upcoming shifts</section>
    );

  } else {
    return(
      <section>
        <h1>PLANS</h1>
        <li>staff it! button also shows card under row with who's around</li>
        <li>collapsible menu for more info</li>
        <li>collapsible menu for those in the past</li>

        <Accordion defaultActiveKey="0">
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="0">
        Click me!
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>Hello! I'm the body</Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="1">
        Click me!
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="1">
      <Card.Body>Hello! I'm another body</Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>



        {allShifts.map(shift => {
          return (
            <section key = {shift.id} className="section-4-col">
              <section>{formatDate(shift.shift_date)}</section>
              <section>{shift.client.name}</section>
              <section>{showEmpNameOrButton(shift)}</section>
              <section>{convertTimeString(shift.start_time)} to {convertTimeString(shift.end_time)}</section>
            </section>
          )}
        )}
      </section>
    );
  }    










// return(
//   <section>
//     NOTHING YET
//     <div id="accordion">
//   <div className="card">
//     <div className="card-header" id="headingOne">
//       <h5 className="mb-0">
//         <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
//           Collapsible Group Item #1
//         </button>
//       </h5>
//     </div>

//     <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
//       <div className="card-body">
//         Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
//       </div>
//     </div>
//   </div>
//   <div className="card">
//     <div className="card-header" id="headingTwo">
//       <h5 className="mb-0">
//         <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
//           Collapsible Group Item #2
//         </button>
//       </h5>
//     </div>
//     <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
//       <div className="card-body">
//         Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
//       </div>
//     </div>
//   </div>
//   <div className="card">
//     <div className="card-header" id="headingThree">
//       <h5 className="mb-0">
//         <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
//           Collapsible Group Item #3
//         </button>
//       </h5>
//     </div>
//     <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
//       <div className="card-body">
//         Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
//       </div>
//     </div>
//   </div>
// </div>
//   </section>
// );

}

export default EmployeeDash_ShiftsTable;
