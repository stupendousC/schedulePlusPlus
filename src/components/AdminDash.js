import React from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import CalendarDay from './CalendarDay';
import NewShift from './NewShift';
import {convertDateString} from './Helpers';

const BASE_URL = 'http://localhost:5000/'
// const BASE_URL = 'http://sppexperiment.us-west-2.elasticbeanstalk.com/';

const ALL_EMPS = "admin/employees";
const ALL_CLIENTS = "admin/clients";
const ALL_ADMIN = "admin/admins";
const ALL_SHIFTS = "admin/shifts";
const ALL_UNAVAILS = "admin/unavails";

export default class AdminDash extends React.Component {

  constructor() {
    super()
    this.state = {
      allClients: [],
      allAdmin: [],
      allEmployees: [],
      allShifts: [],
      allUnavails: [],
      personSpotlight: "",
      daySpotlight: [],
      message: "",
      error: ""
    }
  }

  ////////////////////// loading db data //////////////////////
  getAllEmpsDB = () => {
    axios.get(BASE_URL+ALL_EMPS)
    .then( response => this.setState({allEmployees: response.data}) )
    .catch(error => console.log("NO!!!", error));
  }

  getAllClientsDB = () => {
    axios.get(BASE_URL+ALL_CLIENTS)
    .then( response => this.setState({allClients: response.data}))
    .catch(error => console.log("NO!!!", error));
  }

  getAllAdminDB = () => {
    axios.get(BASE_URL+ALL_ADMIN)
    .then( response => this.setState({allAdmin: response.data}))
    .catch(error => console.log("NO!!!", error));
  }

  getAllShiftsDB = () => {
    axios.get(BASE_URL+ALL_SHIFTS)
    .then( response => this.setState({allShifts: response.data}))
    .catch(error => console.log("NO!!!, error"));
  }

  getAllUnavailsDB = () => {
    axios.get(BASE_URL+ALL_UNAVAILS)
    .then( response => this.setState({allUnavails: response.data}))
    .catch(error => console.log("NO!!!, error"));
  }

  componentDidMount() {
    this.getAllEmpsDB();
    this.getAllClientsDB();
    this.getAllAdminDB();
    this.getAllShiftsDB();
    this.getAllUnavailsDB();
  }


  ////////////////////// generate data in rows //////////////////////
  showAllEmployees = () => this.showAll(this.state.allEmployees, ALL_EMPS);
  showAllAdmin = () => this.showAll(this.state.allAdmin, ALL_ADMIN);
  showAllClients = () => this.showAll(this.state.allClients, ALL_CLIENTS);

  showAll = (listFromState, URL_endpoint) => {
    return ( listFromState.map((person, i) => {
      return (
        <section>
          <tr key={i} className="table-4-col">
            <td>{person.name}</td>
            <td><button onClick={() => this.read(i, listFromState)} className="btn btn-primary">Info</button></td>
            <td><button onClick={() => this.update(i, listFromState)} className="btn btn-primary">TODO: Update</button></td>
            <td><button onClick={() => this.delete(person, URL_endpoint)} className="btn btn-danger">TODO: Delete</button></td>
          </tr>
          <tr>
            {this.state.personSpotlight === person ? this.showPersonSpotlight(person):null}
          </tr>
        </section>
      )})
    );
  }

  showPersonSpotlight = (person) => {
    return (
      <ul>
        <li>ID: {person.id}</li>
        <li>OAuthId:{person.oauthid}</li>
        <li>Name: {person.name}</li>
        <li>Address: {person.address}</li>
        <li>Phone: {person.phone}</li>
        <li>Email: {person.email}</li>
      </ul>
    );
  }

  ////////////////////// calendar fcns //////////////////////
  getDayDetails = (e) => {
    // convert chosen event value to yyyy-mm-dd format
    const chosenStr = convertDateString(e);

    // select db's allShifts and save the matching shifts into state.daySpotlight
    const shiftsOfDay = this.state.allShifts.filter(shift => shift.shift_date === chosenStr)
    this.setState({ daySpotlight:shiftsOfDay });

    // setState will re-render component to show <CalendarDay > below <Calendar>, with state.daySpotlight as props
    
    // dropdown can also show who are avail to work, with a 'staff it!' button
  }


  //TOTALLY TEMPORARY:  GONNA PLACE THIS IN A CALENDAR SOON!
  showAllShifts = () => {
    const URL_endpoint = BASE_URL + ALL_SHIFTS
    const listFromState = this.state.allShifts
    return ( listFromState.map((shift, i) => {
      return (
        <section>
          <tr key={i}>
            <td>{shift.shift_date}</td>
            <td><button onClick={() => this.read(i, listFromState)} className="btn btn-primary">Info</button></td>
            <td><button onClick={() => this.update(i, listFromState)} className="btn btn-primary">TODO: Update</button></td>
            <td><button onClick={() => this.delete(shift, URL_endpoint)} className="btn btn-danger">Delete</button></td>
          </tr>
          <tr>
            {this.state.personSpotlight === shift ? this.showPersonSpotlight(shift):null}
          </tr>
        </section>
      )})
    );
  }
  
  ////////////////////// manipulate data in rows //////////////////////
  read = (i, listFromState) => {
    const selectedPerson = listFromState[i];
    this.setState({ personSpotlight: selectedPerson });
    return selectedPerson;    
  }

  update = (i, listFromState) => {
    console.log("TODO: UPDATE");
    const selectedPerson = listFromState[i];
    this.setState({personSpotlight: selectedPerson});

    // TODO: add fields for input
  }

  delete = (person, URL_endpoint) => {
    console.log("DELETE", person.name, "from", URL_endpoint);

    this.setState({personSpotlight: ""});
    axios.delete(BASE_URL + URL_endpoint + "/" + person.id)
    .then(response => this.setState({message: `Deleted ${person.name} from database`}))
    .catch(error => console.log("ERROR:", error.messages));
  }


  
  ////////////////////// render //////////////////////
    render() {
      const allEmployees = this.showAllEmployees();
      const allAdmin = this.showAllAdmin();
      const allClients = this.showAllClients();
      const allShifts = this.showAllShifts();
      
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
            <h4 id="calendar">CALENDAR, from shifts table</h4>
            <NewShift /> 
            <Calendar onChange={this.getDayDetails} value={new Date()}/>
            <CalendarDay shiftsOfDay={this.state.daySpotlight} />

                      <table>
                          <thead></thead>
                          <tbody>{allShifts}</tbody>
                        </table>

          </section>

          <section data-spy="scroll" data-target="#allLists" data-offset="0">
            <h4 id="employeeList">EMPLOYEES collapsible plz!</h4>
              <table>
                <thead></thead>
                <tbody>{allEmployees}</tbody>
              </table>
            
            <h5 id="clientsList">CLIENTS</h5>
            <table>
                <thead></thead>
                <tbody>{allClients}</tbody>
              </table>
            <h5 id="adminList">ADMIN</h5>
            <table>
                <thead></thead>
                <tbody>{allAdmin}</tbody>
              </table>
          </section>

        </section>

        
      );
    }
  
  
  
  
}