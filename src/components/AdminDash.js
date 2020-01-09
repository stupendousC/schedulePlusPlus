import React from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import CalendarDay from './AdminDash_CalendarDay';
import NewShift from './AdminDash_NewShift';
import ShiftsTable from './AdminDash_ShiftsTable';
import {convertDateString, formatDate, convertTimeString} from './Helpers';

import Error from './Error';

const ALL_EMPS = process.env.REACT_APP_ALL_EMPS;
const ALL_CLIENTS = process.env.REACT_APP_ALL_CLIENTS;
const ALL_ADMINS = process.env.REACT_APP_ALL_ADMINS;
const ALL_SHIFTS = process.env.REACT_APP_ALL_SHIFTS;
const ALL_UNAVAILS = process.env.REACT_APP_ALL_EMPS;

export default class AdminDash extends React.Component {

  constructor() {
    super()
    const today = convertDateString(new Date())
    this.state = {
      allClients: [],
      allAdmins: [],
      allEmployees: [],
      allShifts: [],
      allUnavails: [],
      
      personSpotlight: "",
      daySpotlight: today,
      shiftsOfDay: [],
      show: "calendar"
    }
  }

  ////////////////////// loading db data //////////////////////
  getAllEmpsDB = () => axios.get(ALL_EMPS);
  getAllClientsDB = () => axios.get(ALL_CLIENTS);
  getAllAdminsDB = () => axios.get(ALL_ADMINS);
  getAllShiftsDB = () => axios.get(ALL_SHIFTS);
  getAllUnavailsDB = () => axios.get(ALL_UNAVAILS);

  componentDidMount() {
    console.log("HELLO, name=", this.props.username, "role=", this.props.authenticatedRole);

    if (this.props.authenticatedRole !== "ADMIN") {
      console.log("YOU ARE *NOT* AN ADMIN!");
      return;
    }   

    // initial loading of data fromd atabase
    axios.all([
      this.getAllEmpsDB(),
      this.getAllClientsDB(),
      this.getAllAdminsDB(),
      this.getAllShiftsDB(),
      this.getAllUnavailsDB()])
    .then(axios.spread((...responses) => {
      const allEmployees = responses[0].data;
      const allClients = responses[1].data;
      const allAdmins = responses[2].data;
      const allShifts = responses[3].data;
      const allUnavails = responses[4].data;

      // meanwhile find out if there's any shifts to autoload for today's calendar
      const today = convertDateString(new Date());
      const shiftsToday = allShifts.filter( shift => shift.shift_date === today );

      this.setState({
        allEmployees: allEmployees,
        allClients: allClients,
        allAdmins: allAdmins,
        allShifts: allShifts,
        allUnavails: allUnavails,
        shiftsOfDay: shiftsToday
      });
    }))
    .catch( errors => console.log(errors));
  }

  ////////////////////// set DISPLAY choice //////////////////////
  setShowCategory = (chosen) => this.setState({show: chosen});

  showChosenCategory = () => {
    const chosen = this.state.show;
    
    if (chosen === "calendar") {
      return this.showCalendar();
    } else if (chosen === "admin") {
      return this.showAllAdmins();
    } else if (chosen === "employees") {
      return this.showAllEmployees();
    } else if (chosen === "clients") {
      return this.showAllClients();
    } else if (chosen === 'shifts') {
      return this.showAllShifts();
    }
  }

  ////////////////////// DISPLAY: calendar  //////////////////////
  showCalendar = () => {
    return (
      <section>
        <Calendar onChange={this.updateStateForCalendarDay} value={new Date(this.state.daySpotlight)}/>
        {/* <NewShift /> and <CalendarDay /> will change based on which day you click on in the <Calendar> */}
        <NewShift daySpotlight={this.state.daySpotlight} allClients={this.state.allClients} allUnavails={this.state.allUnavails} allEmployees={this.state.allEmployees} allShifts={this.state.allShifts}/> 
        <CalendarDay basicShiftInfo={this.state.shiftsOfDay} dateStr={this.state.daySpotlight} />
      </section>
    );
  }

  updateStateForCalendarDay = (e) => {
    const dateStr = convertDateString(e);
    // const shiftsOfDay = this.state.allShifts.filter( shift => shift.shift_date === dateStr);
    const shiftsOfDay = this.state.allShifts.filter( shift => shift.shift_date === dateStr);

    this.setState({ 
      daySpotlight: dateStr, 
      shiftsOfDay: shiftsOfDay 
    })
  }

  ////////////////////// DISPLAY: Shifts  //////////////////////
  showAllShifts = () => {
    return <ShiftsTable allShifts={this.state.allShifts}/>
  }

  ////////////////////// DISPLAY: Employees/Clients/Admin //////////////////////
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
            <td><button onClick={() => this.update(i, listFromState)} className="btn btn-secondary">Update</button></td>
            <td><button onClick={() => this.deactivate(person, URL_endpoint)} className="btn btn-danger">Deactivate</button></td>
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
  
  ////////////////////// read/update/deactivate for Employees/Clients/Admins //////////////////////
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

  deactivate = (person, URL_endpoint) => {
    console.log("deactivate", person.name, "from", URL_endpoint);

    this.setState({personSpotlight: ""});
    axios.delete(URL_endpoint + "/" + person.id)
    .then(response => this.setState({message: `deactivated ${person.name} from database`}))
    .catch(error => console.log("ERROR:", error.messages));
  }
  
  ////////////////////// render //////////////////////
    render() {

      return (
        <section>

          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button className="nav-link active" onClick={()=>this.setShowCategory('calendar')}>CALENDAR</button>
            </li>
            <li className="nav-item">
              <button className="nav-link active" onClick={()=>this.setShowCategory('shifts')}>SHIFTS</button>
            </li>
            <li className="nav-item">
              <button className="nav-link active" onClick={()=>this.setShowCategory('employees')}>EMPLOYEES</button>
            </li>
            <li className="nav-item">
              <button className="nav-link active" onClick={()=>this.setShowCategory('clients')}>CLIENTS</button>
            </li>
            <li className="nav-item">
              <button className="nav-link active" onClick={()=>this.setShowCategory('admin')}>ADMIN</button>
            </li>
          </ul>

          {this.props.authenticatedRole === "ADMIN" ? this.showChosenCategory() : <Error message="You need to log in first TO SEE ADMIN dashboard"/>}  

        </section>
        
      );
    }
  
}