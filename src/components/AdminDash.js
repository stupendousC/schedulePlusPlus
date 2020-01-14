import React from 'react';
import axios from 'axios';
import CalendarTab from './AdminDash_CalendarTab';
import ShiftsTable from './AdminDash_ShiftsTable';
import PeopleTable from './AdminDash_PeopleTable.js';
import {sortShiftsByDate, isPhoneValid, formatDate} from './Helpers';

import LoginError from './LoginError';

const ALL_EMPS = process.env.REACT_APP_ALL_EMPS;
const ALL_CLIENTS = process.env.REACT_APP_ALL_CLIENTS;
const ALL_ADMINS = process.env.REACT_APP_ALL_ADMINS;
const ALL_SHIFTS = process.env.REACT_APP_ALL_SHIFTS;
const ALL_UNAVAILS = process.env.REACT_APP_ALL_EMPS;
const SEND_TEXT = process.env.REACT_APP_TEXT_EMPS;

export default class AdminDash extends React.Component {

  constructor() {
    super()
    // const today = convertDateString(new Date())
    this.state = {
      allClients: [],
      allAdmins: [],
      allEmployees: [],
      allShifts: [],
      allUnavails: [],
      
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

      // sort allShifts by date
      const allShiftsSorted = sortShiftsByDate(allShifts);

      this.setState({
        allEmployees: allEmployees,
        allClients: allClients,
        allAdmins: allAdmins,
        allShifts: allShiftsSorted,
        allUnavails: allUnavails
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
    return <CalendarTab 
      allClients={this.state.allClients} 
      allShifts={this.state.allShifts} 
      allEmployees={this.state.allEmployees} 
      allUnavails={this.state.allUnavails} 
      updateAllShiftsCallback={this.updateAllShifts}
      textEmployeesCallback={this.textEmployees}/>
  }

  ////////////////////// DISPLAY: Shifts  //////////////////////
  showAllShifts = () => {
    return <ShiftsTable allShifts={this.state.allShifts} textEmployeesCallback={this.textEmployees}/>
  }

  ////////////////////// DISPLAY: Employees/Clients/Admin //////////////////////
  showAllEmployees = () => <PeopleTable peopleList={this.state.allEmployees} URL_endpoint={ALL_EMPS} setStateKey="allEmployees" updatePeopleListCB={this.updatePeopleList}/>
  showAllAdmins = () => <PeopleTable peopleList={this.state.allAdmins} URL_endpoint={ALL_ADMINS} setStateKey="allAdmins" updatePeopleListCB={this.updatePeopleList}/>
  showAllClients = () => <PeopleTable peopleList={this.state.allClients} URL_endpoint={ALL_CLIENTS} setStateKey="allClients" updatePeopleListCB={this.updatePeopleList}/>

  updatePeopleList = (setStateKey, updatedPeopleList) => {
    // this is a callback function for <PeopleTable> to send back updated peopleList
    // so we can .setState here to allow re-rendering of visuals
    this.setState({ [setStateKey]: updatedPeopleList });
  }
  
  ////////////////////// Callback fcns  //////////////////////
  updateAllShifts = () => {
    axios.get(ALL_SHIFTS)
    .then( response => {
      const sortedShifts = sortShiftsByDate(response.data);
      this.setState({ allShifts: sortedShifts });
    })
    .catch(error => console.log(error.message));
  }

  textEmployees = (shiftObj, availEmpsOfDay) => {
    // shiftObj may be a newly made shift, or existing one that's just not staffed yet
    // availEmpsOfDay is a list of people who are 1. NOT already booked that day, and 2. NOT on in Unavails database
      // if an employee wants that shift, they can still see it from their dashboard where they'll be told they wanted the day off
      // and they can change their minds and accept the shift anyway.  They just won't get a text here, nobody wants a text on their day off.

    // of the availEmpsOfDay, we can only text those with a valid phone number
    const textableEmployees = availEmpsOfDay.filter( emp => {
      return isPhoneValid(emp.phone);
    });    
    
    console.log("AdminDash will text emps for", shiftObj);
    console.log("\navailEmpsOfDay =", availEmpsOfDay);
    console.log("Out of those people, we can text...", textableEmployees);

    // const messageToEmp = (employee, shift) => {
    //   return(
    //     `Hello ${employee.name}.  A shift is available to you on ${formatDate(shift.shift_date)} with 
    //     ${shift.client.name} from ${shift.start_time} to ${shift.end_time}.  Please either respond 
    //     to this text with a "YES" or "NO", or log onto your employee dashboard to claim this shift.  
    //     Thank you from the office of Schedule Plus Plus!`
    //   );
    // }

    const jsonForTextAPI = (employee, shift) => {
      const personalizedMsg = (
        `Hello ${employee.name}.  A shift is available to you on ${formatDate(shift.shift_date)} with 
        ${shift.client.name} from ${shift.start_time} to ${shift.end_time}.  Please either respond 
        to this text with a "YES" or "NO", or log onto your employee dashboard to claim this shift.  
        Thank you from the office of Schedule Plus Plus!`
        );

      return(
        { "phoneNumber": employee.phone,
          "message": personalizedMsg }
      );
    }

    for (const employee of textableEmployees) {
      axios.post(SEND_TEXT, jsonForTextAPI(employee, shiftObj))
      .then( response => console.log("back end says:", response.data))
      .catch(error => console.log(error.message));
    }


    // const allAxiosPostReqs = textableEmployees.map( employee => {
    //   return (
    //     () => axios.post(SEND_TEXT, 
    //     { "phoneNumber": employee.phone, "message": messageToEmp(employee, shiftObj) })
    //   );
    // })

    // axios.all([allAxiosPostReqs])
    // .then(axios.spread((...responses) => {
    //   for ( const eachText of responses ) {
    //     console.log("back end says", eachText.data);
    //   }
    // }))
    // .catch( errors => console.log(errors));
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

          {this.props.authenticatedRole === "ADMIN" ? this.showChosenCategory() : <LoginError message="Please log in to see ADMIN dashboard"/>}  

        </section>
        
      );
    }
}