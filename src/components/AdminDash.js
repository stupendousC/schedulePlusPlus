import React from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import CalendarDay from './CalendarDay';
import NewShift from './NewShift';
import {convertDateString} from './Helpers';

const ALL_EMPS = process.env.REACT_APP_ALL_EMPS;
const ALL_CLIENTS = process.env.REACT_APP_ALL_CLIENTS;
const ALL_ADMINS = process.env.REACT_APP_ALL_ADMINS;
const ALL_SHIFTS = process.env.REACT_APP_ALL_SHIFTS;
const ALL_UNAVAILS = process.env.REACT_APP_ALL_EMPS;

export default class AdminDash extends React.Component {

  constructor() {
    super()
    this.state = {
      allClients: [],
      allAdmins: [],
      allEmployees: [],
      allShifts: [],
      allUnavails: [],
      personSpotlight: "",
      daySpotlight: "",
      shiftsSpotlight: [],
      message: "",
      error: ""
    }
  }

  ////////////////////// loading db data //////////////////////
  
  getAllEmpsDB = () => {
    axios.get(ALL_EMPS)
    .then( response => this.setState({allEmployees: response.data}) )
    .catch(error => console.log("NO!!!", error));
  }

  getAllClientsDB = () => {
    axios.get(ALL_CLIENTS)
    .then( response => this.setState({allClients: response.data}))
    .catch(error => console.log("NO!!!", error));
  }
  
  getAllAdminsDB = () => {
    axios.get(ALL_ADMINS)
    .then( response => this.setState({allAdmins: response.data}))
    .catch(error => console.log("NO!!!", error));
  }

  getAllShiftsDB = () => {
    axios.get(ALL_SHIFTS)
    .then( response => this.setState({allShifts: response.data}))
    .catch(error => console.log("NO!!!, error"));
  }

  getAllUnavailsDB = () => {
    axios.get(ALL_UNAVAILS)
    .then( response => this.setState({allUnavails: response.data}))
    .catch(error => console.log("NO!!!, error"));
  }

  componentDidMount() {
    this.getAllEmpsDB();
    this.getAllClientsDB();
    this.getAllAdminsDB();
    this.getAllShiftsDB();
    this.getAllUnavailsDB();

    // NO THIS WON'T WORK BC the db retrieval is too slow, this one will run first :-(
    this.getDayDetails(new Date());
  }


  ////////////////////// generate data in rows //////////////////////
  showAllEmployees = () => this.showAll(this.state.allEmployees, ALL_EMPS);
  showAllAdmins = () => this.showAll(this.state.allAdmins, ALL_ADMINS);
  showAllClients = () => this.showAll(this.state.allClients, ALL_CLIENTS);

  showAll = (listFromState, URL_endpoint) => {
    return ( listFromState.map((person, i) => {
      return (
        <section>
          <tr key={i} className="table-4-col">
            <td>{person.name}</td>
            <td><button onClick={() => this.read(i, listFromState)} className="btn btn-primary">Info</button></td>
            <td><button onClick={() => this.update(i, listFromState)} className="btn btn-secondary">TODO: Update</button></td>
            <td><button onClick={() => this.delete(person, URL_endpoint)} className="btn btn-danger">Delete</button></td>
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

  ////////////////////// calendar //////////////////////

  getDayDetails = (e) => {
    console.log("\ngetDayDetails on ", e);

    // convert chosen event value to yyyy-mm-dd format
    const chosenStr = convertDateString(e);

    // select db's allShifts and save the matching shifts into state.shiftsSpotlight
    const shiftsOfDay = this.state.allShifts.filter(shift => shift.shift_date === chosenStr)

    // this will trigger <CalendarDay> into rendering this info
    this.setState({ daySpotlight:chosenStr, shiftsSpotlight: shiftsOfDay });
  }

  getCompleteShiftsInfo = () => {
    const allShifts = this.state.shiftsSpotlight;

    console.log("STARTING WITH #allShifts =", allShifts.length);


    if (allShifts) {
      let completeShiftsInfo = [];
      for (let shift of allShifts) {
        let thisShift = [];
        // part 1: the shift itself goes into thisShift[]
        thisShift.push(shift);
        // part 2 & 3: relevant employee & client also go into thisShift[]
        const employee = this.state.allEmployees.find( emp => (emp.id === shift.employee_id ));
        thisShift.push(employee);
        const client = this.state.allClients.find( client => client.id === shift.client_id );
        thisShift.push(client);
        // put the triple combo of thisShift into completeShiftsInfo
        completeShiftsInfo.push(thisShift);
      }
      return completeShiftsInfo;
    }
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
    axios.delete(URL_endpoint + "/" + person.id)
    .then(response => this.setState({message: `Deleted ${person.name} from database`}))
    .catch(error => console.log("ERROR:", error.messages));
  }
  
  ////////////////////// render //////////////////////
    render() {
      const allEmployees = this.showAllEmployees();
      const allAdmins = this.showAllAdmins();
      const allClients = this.showAllClients();
      
      return (
        <section>
          <nav id="allLists" className="navbar navbar-light bg-light">
            
            <nav className="nav nav-pills flex-row">
              <a className="nav-link" href="#calendar">CALENDAR</a>
              <a className="nav-link" href="#employeeList">EMPLOYEES</a>
              <a className="nav-link" href="#clientsList">CLIENTS</a>
              <a className="nav-link" href="#adminsList">ADMINS</a>
            </nav>
          </nav>



          {/* CALENDAR SECTION */}
          <section data-spy="scroll" data-target="#calendar" id="calendar">
            <h4 id="calendar">MASTER CALENDAR</h4>
            <NewShift /> 
            <Calendar onChange={this.getDayDetails} value={new Date()}/>
            {/* <CalendarDay /> will change based on which day you click on in the <Calendar> */}
            <CalendarDay dateStr={this.state.daySpotlight} completeShiftsInfo={ this.getCompleteShiftsInfo()} />
          </section>



          {/* PEOPLE SECTION ... think about moving this to separate routes...*/}
          <section data-spy="scroll" data-target="#allLists">
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
            <h5 id="adminsList">ADMINS</h5>
            <table>
                <thead></thead>
                <tbody>{allAdmins}</tbody>
              </table>
          </section>

        </section>

        
      );
    }
  
  
  
  
}