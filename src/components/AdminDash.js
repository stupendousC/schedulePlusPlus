import React from 'react';
import axios from 'axios';


// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

const BASE_URL = 'http://localhost:5000/'
// const BASE_URL = 'http://sppexperiment.us-west-2.elasticbeanstalk.com/';

const ALL_EMPS = "admin/employees";
const ALL_CLIENTS = "admin/clients";
const ALL_ADMIN = "admin/admins";

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
    .then( response => this.setState({allEmployees: response.data}) )
    .catch(error => console.log("NO!!!", error));

    // Queries postgres for all clients
    axios.get(BASE_URL+ALL_CLIENTS)
    .then( response => this.setState({allClients: response.data}))
    .catch(error => console.log("NO!!!", error));

    // Queries postgres for all admin
    axios.get(BASE_URL+ALL_ADMIN)
    .then( response => this.setState({allAdmin: response.data}))
    .catch(error => console.log("NO!!!", error));

    // Queries postgres for all shifts
    // TODO!!!
  
    // Queries postgres for all unavailbilities
    // TODO!!!
  }

  showAllEmployees = () => this.showAll(this.state.allEmployees);
  showAllAdmin = () => this.showAll(this.state.allAdmin);
  showAllClients = () => this.showAll(this.state.allClients);

  showAll = (listFromState) => {
    return ( listFromState.map((person, i) => {
      return (
      <tr key={i}>
        <td>{person.title}</td>
        <td>{person.name}</td>
        <td><button onClick={this.read} className="btn btn-primary">TODO: Read</button></td>
        <td><button onClick={this.update} className="btn btn-primary">TODO: Update</button></td>
        <td><button onClick={this.delete} className="btn btn-danger">TODO: Delete</button></td>
      </tr>)

    })
    );
  }

  
  
  read = () => {
    console.log("TODO: READ EMPLOYEE");
  }

  update = () => {
    console.log("TODO: UPDATE");
  }

  delete = () => {
    console.log("TODO: DELETE");
  }

  

    render() {
      const allEmployees = this.showAllEmployees();
      const allAdmin = this.showAllAdmin();
      const allClients = this.showAllClients();
      
      return (
        <section>
          <nav id="navbar-example3" class="navbar navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <nav class="nav nav-pills flex-column">
    <a class="nav-link" href="#employeeList">EMPLOYEES</a>
    <nav class="nav nav-pills flex-column">
      <a class="nav-link ml-3 my-1" href="#clientsList">CLIENTS</a>
      <a class="nav-link ml-3 my-1" href="#adminList">ADMINS</a>
    </nav>
  </nav>
</nav>

<div data-spy="scroll" data-target="#navbar-example3" data-offset="0">
  <h4 id="employeeList">EMPLOYEES</h4>
  {allEmployees}
  <h5 id="clientsList">CLIENTS</h5>
  {allClients}
  <h5 id="adminList">ADMIN</h5>
  {allAdmin}
</div>
          <br/>
          <br/>master calendar, from shifts table
          <br/>staff it! from unavailbilities table, make new unmanned shift for shifts table, and send twilio texts
        </section>

        
      );
    }
  
  
  
  
}