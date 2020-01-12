import React from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import Calendar from 'react-calendar';
import CalendarDay from './AdminDash_CalendarDay';
import NewShift from './AdminDash_NewShift';
import ShiftsTable from './AdminDash_ShiftsTable';
import PeopleTable from './AdminDash_PeopleTable.js';
import {convertDateString, formatDate, convertTimeString, convertToPST, sendTexts, sortShiftsByDate} from './Helpers';

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
      
      daySpotlight: today,
      shiftsOfDay: [],
      availEmpsOfDay: [],
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

      // meanwhile find out if there's any shifts to autoload for today's calendar
      const today = convertDateString(new Date());
      let shiftsToday;
      for (const shift of allShiftsSorted) {
        if (shift.date === today ) { 
          shiftsToday.push(shift); 
        } else if (shift.date > today) {
          break;
        }
      }

      this.setState({
        allEmployees: allEmployees,
        allClients: allClients,
        allAdmins: allAdmins,
        allShifts: allShiftsSorted,
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
        <Calendar onChange={this.updateStateForCalendarDay} value={convertToPST(this.state.daySpotlight)}/>
        {/* <NewShift /> and <CalendarDay /> will change based on which day you click on in the <Calendar> */}

        <Accordion>
            <Accordion.Toggle eventKey="newShift" className="accordian-toggle_button">
              <section>
                <section>MAKE A NEW SHIFT</section>
              </section>
            </Accordion.Toggle>

            <Accordion.Collapse eventKey="newShift">
            <NewShift daySpotlight={this.state.daySpotlight} allClients={this.state.allClients} allUnavails={this.state.allUnavails} allEmployees={this.state.allEmployees} allShifts={this.state.allShifts}/> 
            </Accordion.Collapse>
        </Accordion>
        
        <Accordion>
          <Accordion.Toggle eventKey="availEmpList" className="accordian-toggle_button">
            <section>
              <section>AVAILABLE EMPLOYEES FOR {formatDate(this.state.daySpotlight)}</section>
            </section>
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="availEmpList">
            {/* send API call to backend to get all avail emps for the daySpotlight */}
            {this.showAvailEmpsInCard()}
          </Accordion.Collapse>
        </Accordion>

        <Accordion>
          <Accordion.Toggle eventKey="dayAgenda" className="accordian-toggle_button">
            <section>
              <section>AGENDA FOR {formatDate(this.state.daySpotlight)}</section>
            </section>
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="dayAgenda">
            <CalendarDay basicShiftsInfo={this.state.shiftsOfDay} dateStr={this.state.daySpotlight} />
          </Accordion.Collapse>
        </Accordion>

        <Accordion>
          <Accordion.Toggle eventKey="weekAgenda" className="accordian-toggle_button">
            <section>
              <section>AGENDA FOR THIS WEEK</section>
            </section>
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="weekAgenda">
            <h1>Upcoming feature, stay tuned...</h1>
          </Accordion.Collapse>
        </Accordion>



      </section>
    );
  }

  updateStateForCalendarDay = (e) => {
    const dateStr = convertDateString(e);
    const shiftsOfDay = this.state.allShifts.filter( shift => shift.shift_date === dateStr);
    const listOfAvailEmps = this.getAvailEmpsByDate(dateStr);

    this.setState({ 
      daySpotlight: dateStr, 
      shiftsOfDay: shiftsOfDay ,
      availEmpsOfDay: listOfAvailEmps
    })
  }

  getAvailEmpsByDate = (targetDate) => {
    // send API call to backend
    const URL_getAllAvailEmpsByDate = process.env.REACT_APP_GET_AVAIL_EMPS_FOR_DAY + `/${targetDate}`;
    
    console.log("SENDING API TO", URL_getAllAvailEmpsByDate);

    axios.get(URL_getAllAvailEmpsByDate)
    .then(response => {
      console.log("backend sent us... ", response.data);
      return response.data;
    })
    .catch(error => console.log(error.message));
  }

  showAvailEmpsInCard = () => {
    console.log("DISPLAY", this.state.availEmpsOfDay);
    const listOfAvailEmps = this.state.availEmpsOfDay;
    if (listOfAvailEmps === []) {
      return (<section>No one is available!</section>);
    }

    const rowsOfEmps = listOfAvailEmps.map(emp => {
      return(
        <section key={emp.id} className="section-2-col">
          <section>{emp.name}</section>
          <section>{emp.phone}</section>
        </section>
      );
    })
    return (
      <section>
        <section>AVAILABLE EMPLOYEES</section>
        {rowsOfEmps}
      </section>
    );
  }

  ////////////////////// DISPLAY: Shifts  //////////////////////
  showAllShifts = () => {
    return <ShiftsTable allShifts={this.state.allShifts}/>
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