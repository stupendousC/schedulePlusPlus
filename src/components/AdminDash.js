import React from 'react';
import axios from 'axios';
import {convertEmployeeObjsToArray} from './Helpers';


// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

const BASE_URL = 'http://localhost:5000/'
// const BASE_URL = 'http://sppexperiment.us-west-2.elasticbeanstalk.com/';

const ALL_EMPS = "admin/employees";

export default class AdminDash extends React.Component {

  constructor() {
    super()
    this.state = {
      allClients: [],
      allAdmin: [],
      allEmployees: [],
      allShifts: [],
      allUnavails: []
    }
  }

  componentDidMount() {
    // Queries postgres for all employees
    axios.get(BASE_URL+ALL_EMPS)
    .then( response => {
      // const employeeArray = convertEmployeeObjsToArray(response.data);
      this.setState({allEmployees: response.data});
    })
    .catch(error => {
      console.log("NO!!!", error);
    });

    // Queries postgres for all shifts
    // TODO!!!
  
    // Queries postgres for all unavailbilities
    // TODO!!!
  }

  showAllEmployees = () => {
    return ( this.state.allEmployees.map((employee, i) => {
      return (
      <tr key={i}>
        <td>{employee.title}</td>
        <td>{employee.name}</td>
        <td>{}</td>
        <td>{}</td>
        <td><button onClick={this.updateEmployee} className="btn btn-primary">TODO: Update</button></td>
        <td><button onClick={this.fireEmployee} className="btn btn-primary">TODO: Fire</button></td>
      </tr>)

    })
    );
  }

  updateEmployee = () => {
    console.log("TODO: UPDATE EMPLOYEE");
  }

  fireEmployee = () => {
    console.log("TODO: REMOVE EMPLOYEE");
  }

  

    render() {
      const allEmployeesForNow = this.showAllEmployees();
      
      return (
        <section>
          <br/>
          LINKS: 
          <br/> admin CRUD
          <br/> employees CRUD
          <br/>clients CRUD
          <br/>master calendar, from shifts table
          <br/>staff it! from unavailbilities table, make new unmanned shift for shifts table, and send twilio texts
        </section>

        
      );
    }
  
  
  
  
}