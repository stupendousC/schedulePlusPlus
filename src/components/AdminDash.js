import React from 'react';
import axios from 'axios';
import CalendarTab from './AdminDash_CalendarTab';
import ShiftsTable from './AdminDash_ShiftsTable';
import PeopleTable from './AdminDash_PeopleTable.js';
import {sortShiftsByDate, isPhoneValid} from './Helpers';

import LoginError from './LoginError';

const ALL_EMPS = process.env.REACT_APP_ALL_EMPS;
const ALL_CLIENTS = process.env.REACT_APP_ALL_CLIENTS;
const ALL_ADMINS = process.env.REACT_APP_ALL_ADMINS;
const ALL_SHIFTS = process.env.REACT_APP_ALL_SHIFTS;
const ALL_UNAVAILS = process.env.REACT_APP_ALL_EMPS;

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

  /// REPLACED WITH TEXTEMPLOYEES() INSTEAD!
  // sendTexts = (listOfEmployees, shift) => {
  //   console.log("\nFOR SHIFT DATE = ", shift.shift_date, "SENDING TEXT TO group", listOfEmployees);
  //   console.log("show an alert so they know it's done!")
  // }





  
  textEmployees = (shiftObj, availEmpsOfDay) => {
    console.log("AdminDash will text emps for", shiftObj);
    console.log("\navailEmpsOfDay =", availEmpsOfDay);

    // of the availEmpsOfDay, we can only text those with a valid phone number
    const textableEmployees = availEmpsOfDay.filter( emp => emp.phone );
    // VALIDATION HERE FROM HELPER! 
    console.log("Out of those people, we can text...", textableEmployees);

    


    axios.all([
      this.getAllEmpsDB(),
      this.getAllClientsDB()])
    .then(axios.spread((...responses) => {
      const allEmployees = responses[0].data;
      const allClients = responses[1].data;

    }))
    .catch( errors => console.log(errors));

     // const jsonForText = { "phoneNumber": "", "message": message };
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