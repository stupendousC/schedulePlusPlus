import React from 'react';
import axios from 'axios';
import CalendarTab from './AdminDash_CalendarTab';
import ShiftsTable from './AdminDash_ShiftsTable';
import PeopleTable from './AdminDash_PeopleTable.js';
import { Nav, Navbar } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { makeHeader, sortShiftsByDate, isPhoneValid, formatDate, formatTime, truncateString } from './Helpers';
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
  
  getAllEmpsDB = (headers) => axios.get(ALL_EMPS, {headers});
  getAllClientsDB = (headers) => axios.get(ALL_CLIENTS, {headers});
  getAllAdminsDB = (headers) => axios.get(ALL_ADMINS, {headers});
  getAllShiftsDB = (headers) => axios.get(ALL_SHIFTS, {headers});
  getAllUnavailsDB = (headers) => axios.get(ALL_UNAVAILS, {headers});

  componentDidMount() {
    const headers = makeHeader();
    // initial loading of data from database
    axios.all([
      this.getAllEmpsDB(headers),
      this.getAllClientsDB(headers),
      this.getAllAdminsDB(headers),
      this.getAllShiftsDB(headers),
      this.getAllUnavailsDB(headers)])
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
    .catch( errors => `Error downloading from database: ${toast.error(errors.message)}`);
  }

  ////////////////////// set DISPLAY choice //////////////////////
  setShowCategory = (chosen) => this.setState({show: chosen});

  showChosenCategory = () => {
    const chosen = this.state.show;
    
    if (chosen === "calendar") {
      return this.showCalendar();
    } else if (chosen === "admins") {
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
      updateAllShiftsCallback={this.updateAllShifts}
      textEmployeesCallback={this.textEmployees}/>
  }

  ////////////////////// DISPLAY: Shifts  //////////////////////
  showAllShifts = () => {
    return <ShiftsTable allShifts={this.state.allShifts} textEmployeesCallback={this.textEmployees}/>
  }

  ////////////////////// DISPLAY: Employees/Clients/Admin //////////////////////
  showAllEmployees = () => <PeopleTable personType="employee" peopleList={this.state.allEmployees} URL_endpoint={ALL_EMPS} setStateKey="allEmployees" updatePeopleListCB={this.updatePeopleList}/>
  showAllAdmins = () => <PeopleTable personType="admin" peopleList={this.state.allAdmins} URL_endpoint={ALL_ADMINS} setStateKey="allAdmins" updatePeopleListCB={this.updatePeopleList}/>
  showAllClients = () => <PeopleTable personType="client" peopleList={this.state.allClients} URL_endpoint={ALL_CLIENTS} setStateKey="allClients" updatePeopleListCB={this.updatePeopleList}/>

  updatePeopleList = (setStateKey, URL_endpoint) => {
    // this is a callback function for <PeopleTable> to send back updated peopleList
    // so we can .setState here to allow re-rendering of visuals
    // this.setState({ [setStateKey]: updatedPeopleList });
    const headers = makeHeader();
    axios.get(URL_endpoint, {headers})
    .then( response => this.setState({ [setStateKey]: response.data }))
    .catch(error => toast.error(`ERROR downloading list: ${error.message}`));
  }
  
  ////////////////////// Callback fcns  //////////////////////
  updateAllShifts = () => {
    const headers = makeHeader();

    axios.get(ALL_SHIFTS, {headers})
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

    if (availEmpsOfDay.length === 0) {  // u can see this if u make a shift on 1/25/2020
      toast.error("No employees available to work that day!");
      return;
    } else if (textableEmployees.length === 0) {    // u can see this if u make a shift on 2/3/2020
      toast.info("No available employees with valid phone numbers to text.  However, they'll be able to see the shift on their dashboard");
      return;
    } else {
      toast.info("Sending texts...");
    }

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

Please click on [http://schedplusplusbackend.us-west-2.elasticbeanstalk.com//text/${uuid}] to confirm, or log onto your employee dashboard to claim this shift.  

Thank you from the office of Schedule Plus Plus!
====================`
        );

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

    const headers = makeHeader();
    const allAxiosPostReqs = textableEmployees.map( employee => {
      // each employee gets a text
      return (axios.post(SEND_TEXT, jsonForTextAPI(employee, shiftObj), {headers}));
    })
    
    // bundled all the individual post requests together,
    // failed texts will not get in the way of successful texts
    axios.all(allAxiosPostReqs)
    .then(
      // keeping this chunk around just in case
      // axios.spread((...responses) => {
      // for ( const eachText of responses ) {
      //   console.log("\nTEXT sent:", eachText.data);
      // }})
      )
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

          <Navbar bg="primary" variant="dark" sticky="top">
            <Navbar.Brand onClick={()=>this.setShowCategory('calendar')}>CALENDAR</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link onClick={()=>this.setShowCategory('shifts')}>SHIFTS</Nav.Link>
              <Nav.Link onClick={()=>this.setShowCategory('employees')}>EMPLOYEES</Nav.Link>
              <Nav.Link onClick={()=>this.setShowCategory('clients')}>CLIENTS</Nav.Link>
              <Nav.Link onClick={()=>this.setShowCategory('admins')}>ADMINS</Nav.Link>
            </Nav>
          </Navbar>
          
          {this.showChosenCategory()}

        </section>
        
      );
    }
}