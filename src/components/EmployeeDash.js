import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { toast } from 'react-toastify';
import CalendarTab from './EmployeeDash_CalendarTab';
import UnavailDays from './EmployeeDash_UnavailDays';
import Info from './EmployeeDash_Info';
import ErrorGeneral from './ErrorGeneral';
import axios from 'axios';
import ShiftsTable from './EmployeeDash_ShiftsTable';
import { makeHeader, convertDateString, sortUnavailsByDate, sortShiftsByDate, deepCompareTwoSchedArrayss } from './Helpers';

//https://www.hobo-web.co.uk/best-screen-size/  
// 360x640
// 1366 x 768
// 1920x1080   

export default class EmployeeDash extends React.Component {

  constructor() {
    super()
    const today = convertDateString(new Date())
    this.state = {
      EMP_DASH: process.env.REACT_APP_EMP_DASH+"/"+sessionStorage.getItem('databaseId'),
      empInfo: [],
      empUnavails: [],
      empShifts: [],
      daySpotlight: today,
      shiftsToday: [],
      shiftsOfDay: [],
      availStatusOfDay: null,
      show: 'calendar',
      unstaffedShifts: []
    }
  }

  getEmpInfo = (headers) => axios.get(this.state.EMP_DASH, {headers});
  getEmpShifts = (headers) => axios.get(this.state.EMP_DASH+"/shifts", {headers});
  getEmpUnavails = (headers) => axios.get(this.state.EMP_DASH+"/unavails", {headers});
  getUnstaffedShifts = (headers) => axios.get(this.state.EMP_DASH+"/unstaffedShifts", {headers});
  
  componentDidMount() {
    // initial loading of data from database
    const headers = makeHeader();

    axios.all([
      this.getEmpInfo(headers), 
      this.getEmpShifts(headers), 
      this.getEmpUnavails(headers),
      this.getUnstaffedShifts(headers)
    ])
      .then(axios.spread((...responses) => {
        const empInfo = responses[0].data;
        const empShifts = responses[1].data;
        const empUnavails = responses[2].data;
        const unstaffedShifts = responses[3].data;
        
        // meanwhile find out if there's any shifts to autoload for today's calendar
        const today = convertDateString(new Date());
        const shiftsToday = empShifts.filter( shift => shift.shift_date === today );
        // also find out if need to autoload if today is a day off
        const canWorkBool = this.canTheyWorkThisDay(today, shiftsToday, empUnavails);

        this.setState({
          empInfo: empInfo,
          empShifts: empShifts,
          empUnavails: empUnavails,
          shiftsToday: shiftsToday,
          shiftsOfDay: shiftsToday,
          availStatusOfDay: canWorkBool,
          unstaffedShifts: unstaffedShifts
        });
        }))
        .catch(errors => toast.error(`ERROR: ${errors.message}`));
  }
  
  ////////////////////// set DISPLAY choice //////////////////////
  setShowCategory = (chosen) => this.setState({show: chosen});

  showChosenCategory = () => {
    const chosen = this.state.show;
    
    if (chosen === "calendar") {
      return this.showCalendar();
    } else if (chosen === "shifts") {
      return this.showAllShifts();
    } else if (chosen === "unavails") {
      return this.showAllUnavails();
    } else if (chosen === "info") {
      return this.showAllInfo();
    }
  }

  showAllInfo = () => {
    return <Info info={this.state.empInfo} URL_endpoint={this.state.EMP_DASH} updateInfoCallback={this.updateInfo}/>;
  }

  ////////////////////// DISPLAY: shifts tab //////////////////////
  showAllShifts = () => {
    const sortedOwnShifts = sortShiftsByDate(this.state.empShifts);
    const sortedUnavails = sortUnavailsByDate(this.state.empUnavails);
    const allSortedUnstaffedShifts = sortShiftsByDate(this.state.unstaffedShifts);
    
    let sortedUnstaffedShifts = allSortedUnstaffedShifts.filter( unstaffed => {
      // Emp does NOT need to see...  1. unstaffed shifts that are in the past
      const today = convertDateString(new Date());
      if (unstaffed.shift_date < today) return false;

      // 2. unstaffed shifts that coincide with their own booked days
      for (const ownShift of sortedOwnShifts) {
        if (unstaffed.shift_date === ownShift.shift_date) return false;
        if (unstaffed.shift_date < ownShift.shift_date) break;
      }

      // if this unstaffed shift hasn't been disqualified by now, then employee can see it
      return true;
    })

    return (<ShiftsTable sortedOwnShifts={sortedOwnShifts} sortedUnstaffedShifts={sortedUnstaffedShifts} sortedUnavails={sortedUnavails} freeToWorkCallback={this.freeToWork} takeShiftCallback={this.takeShift}/>);
  }

  ////////////////////// DISPLAY: own unavails tab //////////////////////
  showAllUnavails = () => {
    const empUnavails = this.state.empUnavails;
    const sortedUnavails = sortUnavailsByDate(empUnavails);

    if (empUnavails.length === 0) {
      return (
        <h3 className="text-centered margin-all-1rem">No upcoming unavailable days</h3>
      );
    } else {
      return(
      <section>
        <UnavailDays sortedUnavails={sortedUnavails} freeToWorkCallback={this.freeToWork}/>
      </section>
    );
    }
  }
  
  ////////////////////// DISPLAY: calendar tab //////////////////////

  showCalendar = () => {
    return <CalendarTab 
      empUnavails={this.state.empUnavails}
      empShifts={this.state.empShifts}
      daySpotlight={this.state.daySpotlight}
      shiftsToday={this.state.shiftsToday}
      shiftsOfDay={this.state.shiftsOfDay}
      availStatusOfDay={this.state.availStatusOfDay}
      unstaffedShifts={this.state.unstaffedShifts}
      updateStateForCalendarDayCB={this.updateStateForCalendarDay}
      toggleAvailCallback={this.toggleAvail}
    />;
  }

  updateStateForCalendarDay = (e) => {
    const dateStr = convertDateString(e);

    const shiftsOfDay = this.state.empShifts.filter( shift => shift.shift_date === dateStr);
    const canWorkBool = this.canTheyWorkThisDay(dateStr, shiftsOfDay, this.state.empUnavails);
    this.setState({ 
      daySpotlight: dateStr, 
      shiftsOfDay: shiftsOfDay, 
      availStatusOfDay: canWorkBool })
  }

  canTheyWorkThisDay = (dateStr, shiftsOfThatDay, unavails_list) => {
    // are you already working today?
    if (shiftsOfThatDay.length > 0) {
      return false;
    }
    // do u have today off?
    for (const unavail of unavails_list) {
      if (unavail.day_off === dateStr) {
        return false;
      }
    }
    return true;
  }

  ////////////////////// Callback fcns & related helpers //////////////////////
  freeToWork = (unavailObj) => {
    const headers = makeHeader();
    axios.delete(this.state.EMP_DASH + `/unavails/${unavailObj.id}`, {headers})
      .then( response => {
        // quick update on front end to match db
        // response.data is the latest data from Unavails table in db for this employee
        this.setState({ empUnavails: response.data, availStatusOfDay: true });
      })  
      .catch(error => toast.error(`ERROR deleting from db: ${error.message}`));
  }

  toggleAvail = (availBoolean) => {
    let latestEmpUnavails = [...this.state.empUnavails];

    if (availBoolean) {
      // emp wants to work -> delete row from unavails table in db
      // find id from this.state.empUnavails
      const unavailObj = this.state.empUnavails.find( unavail => unavail.day_off === this.state.daySpotlight );
      this.freeToWork(unavailObj);

    } else {
      const headers = makeHeader();
      // emp wants day off -> post/add to unavails table in db
      axios.post((this.state.EMP_DASH + `/unavails`), { day_off: this.state.daySpotlight }, { headers })
      .then( response => {
        // quick update on front end to match db
        latestEmpUnavails.push( response.data );
        this.setState({ empUnavails: latestEmpUnavails, availStatusOfDay: false });
      } )   
      .catch(error => toast.error(`ERROR adding from db: ${error.message}`));
    }
  }

  takeShift = (shift) => {    
    const URL_endpoint = this.state.EMP_DASH+`/shifts/${shift.id}`;
    const headers = makeHeader();

    // JS weirdness!!! axios HAS to have somehting as the 2nd arg, bc it thinks it's the parameter, 
    // if I had put {headers} in the 2nd arg, then jbackend will NOT recog the headers bc it's looking for something in the 3rd arg
    axios.put(URL_endpoint, null, {headers})
    .then(response => {
      // RACE CONDITION!  If another employee accepted it before you did, then current list wouldn't change
      // need to compare the arrays of existing this.state.empShifts VS response.data... 
        // if same, then user did NOT actually get the shift
        // if not, then user did successfully get the shift, plus save this new state
        if (deepCompareTwoSchedArrayss(this.state.empShifts, response.data)) {
          toast.error("UH OH! Shift was just taken by someone else 😕");
        } else {
          // api sending back current list of emp's shifts
          toast.success("The shift is yours! Huzzah! 🥳")
          this.setState({ empShifts: response.data })
        }
        
        // need to update state unstaffedShifts[] either way, b/c now that shift is no longer unavailable
        this.updateLatestUnstaffedShifts();
    })
    .catch(error => toast.error(`ERROR: ${error.message}`));
  }

  updateLatestUnstaffedShifts = () => { 
    const headers = makeHeader();
    axios.get(this.state.EMP_DASH+"/unstaffedShifts", {headers})
    .then( response => this.setState({ unstaffedShifts: response.data}))
    .catch(error => toast.error(`ERROR: ${error.message}`));
  }
  
  updateInfo = (newEmpInfo) => {
    this.setState({ empInfo: newEmpInfo });
  }
  ////////////////////// render //////////////////////
  render() {

      if (this.props.authenticatedRole !== "EMPLOYEE") {
        return <ErrorGeneral message="Please log in to see EMPLOYEE dashboard" icon="lock"/>
      }

      return (
        <section>

        <Navbar bg="primary" variant="dark" sticky="top">
            <Navbar.Brand onClick={()=>this.setShowCategory('calendar')}>CALENDAR</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link onClick={()=>this.setShowCategory('shifts')}>SHIFTS</Nav.Link>
              <Nav.Link onClick={()=>this.setShowCategory('unavails')}>UNAVAILABLE DAYS</Nav.Link>
              <Nav.Link onClick={()=>this.setShowCategory('info')}>INFO</Nav.Link>
            </Nav>
        </Navbar>

        {this.showChosenCategory()}

        </section>
      );
    }
}

