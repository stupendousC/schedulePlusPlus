import React from 'react';
import axios from 'axios';
import CalendarTab from './AdminDash_CalendarTab';
import ShiftsTable from './AdminDash_ShiftsTable';
import PeopleTable from './AdminDash_PeopleTable.js';
import {toast} from 'react-toastify';
import {sortShiftsByDate, isPhoneValid, formatDate, formatTime, truncateString } from './Helpers';
import ErrorGeneral from './ErrorGeneral';
const uuidv4 = require('uuid/v4');



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
    .catch(error => toast.error(error.message));
  }

  textEmployees = (shiftObj, availEmpsOfDay) => {
    // shiftObj may be a newly made shift, or existing one that's just not staffed yet
    // availEmpsOfDay is a list of people who are 1. NOT already booked that day, and 2. NOT on in Unavails database
      // if an employee wants that shift, they can still see it from their dashboard where they'll be told they wanted the day off
      // and they can change their minds and accept the shift anyway.  They just won't get a text here, nobody wants a text on their day off.

    // of the availEmpsOfDay, we can only text those with a valid (Helper fcn) AND verified (added to Twilio console) phone number
    // verify phone number via Twilio console https://www.twilio.com/console/phone-numbers/verified, employee will need to give me the code they received!
    const textableEmployees = availEmpsOfDay.filter( emp => {
      return isPhoneValid(emp.phone);
    });    

    const jsonForTextAPI = (employee, shift) => {
      // each text gets assigned an uuid for the db
      const uuid = uuidv4();

      // yes the indentation looks terrible here, but it's necessary otherwise the text msgs will ALSO have indents
      const personalizedMsg = (`
====================
Hello ${employee.name}!  
          
We have a shift available:
  Date: ${formatDate(shift.shift_date)}
  Client: ${shift.client.name}
  Time: ${formatTime(shift.start_time)} to ${formatTime(shift.end_time)}.  

Please click on [http://localhost:3000/text/${uuid}] to confirm, or log onto your employee dashboard to claim this shift.  

Thank you from the office of Schedule Plus Plus!
====================`
        );

      console.log("sending uuid =", uuid);
      return(
        { "phoneNumber": employee.phone,
          "message": personalizedMsg,
          "uuid": uuid,
          "client": shift.client,
          "employee": employee,
          "shift": shift
        }
      );
    }

    const allAxiosPostReqs = textableEmployees.map( employee => {
      // each employee gets a text
      return (axios.post(SEND_TEXT, jsonForTextAPI(employee, shiftObj)));
    })

    toast.info("Sending texts...");

    // bundled all the individual post requests together,
    // failed texts will not get in the way of successful texts
    axios.all(allAxiosPostReqs)
    .then(axios.spread((...responses) => {
      for ( const eachText of responses ) {
        console.log("back end says", eachText.data);
      }}))
    .catch( errors => {
      const fullErrorMsg = errors.response.data.message;    
      const fullTextBody = JSON.parse(errors.config.data);
      const badPhone = fullTextBody.phoneNumber;
      const unreachableEmp = textableEmployees.find( emp => emp.phone === badPhone );
      let reason = "";
      if (fullErrorMsg.includes("number  is unverified")) {
        reason = "Employee needs to verify number with Twilio";
      } else {
        reason = truncateString(fullErrorMsg, 20);
      }
      toast.error(`Unable to text ${unreachableEmp.name}: ${reason}`);
    });
  }

  ////////////////////// render //////////////////////
    render() {
      if (this.props.authenticatedRole !== "ADMIN") {
        return <ErrorGeneral message="Please log in to see ADMIN dashboard" icon="lock"/>
      }
      
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

          {this.showChosenCategory()}

        </section>
        
      );
    }
}