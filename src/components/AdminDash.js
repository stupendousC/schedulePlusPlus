import React from 'react';
import axios from 'axios';

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

  ////////////////////// initial loading of db data //////////////////////
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

  ////////////////////// generate data in rows //////////////////////
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

  
  ////////////////////// manipulate data in rows //////////////////////
  read = () => {
    console.log("TODO: READ");
  }

  update = () => {
    console.log("TODO: UPDATE");
  }

  delete = () => {
    console.log("TODO: DELETE");
  }

  
  ////////////////////// render //////////////////////
    render() {
      const allEmployees = this.showAllEmployees();
      const allAdmin = this.showAllAdmin();
      const allClients = this.showAllClients();
      // const allShifts = this.showAllShifts();
      
      return (
        <section>
          <nav id="allLists" className="navbar navbar-light bg-light">
            

            <nav className="nav nav-pills flex-row">
              <a className="nav-link" href="#calendar">CALENDAR</a>
              <a className="nav-link" href="#employeeList">EMPLOYEES</a>
              <a className="nav-link" href="#clientsList">CLIENTS</a>
              <a className="nav-link" href="#adminList">ADMINS</a>
            </nav>
          </nav>

          <section data-spy="scroll" data-target="#calendar" id="calendar">
            CALENDAR HERE, from shifts table
            <br/>staff it! from unavailbilities table, make new unmanned shift for shifts table, and send twilio texts
          </section>

          <section data-spy="scroll" data-target="#allLists" data-offset="0">
            <h4 id="employeeList">EMPLOYEES collapsible plz!</h4>
            {allEmployees}
            <h5 id="clientsList">CLIENTS</h5>
            {allClients}
            <h5 id="adminList">ADMIN</h5>
            {allAdmin}
          </section>

        </section>

        
      );
    }
  
  
  
  
}