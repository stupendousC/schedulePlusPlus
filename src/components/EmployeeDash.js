import React from 'react';
import Calendar from 'react-calendar';
import CalendarDay from './EmployeeDash_CalendarDay';
import UnavailDays from './EmployeeDash_UnavailDays';
import Error from './Error';
import axios from 'axios';
import ShiftsTable from './EmployeeDash_ShiftsTable';
import { convertDateString, formatDate, sortUnavailsByDate, sortShiftsByDate, convertToPST } from './Helpers';

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
      shiftsOfDay: [],
      availStatusOfDay: null,
      show: 'calendar',
      unstaffedShifts: []
    }
  }

  getEmpInfo = () => axios.get(this.state.EMP_DASH);
  getEmpShifts = () => axios.get(this.state.EMP_DASH+"/shifts");
  getEmpUnavails = () => axios.get(this.state.EMP_DASH+"/unavails");
  getUnstaffedShifts = () => axios.get(this.state.EMP_DASH+"/unstaffedShifts");
  
  componentDidMount() {
    if (this.props.authenticatedRole !== "EMPLOYEE") {
      console.log("\n\nYou are *NOT* an employee!!!!");
      return;
    }

    // initial loading of data from database
    axios.all([
      this.getEmpInfo(), 
      this.getEmpShifts(), 
      this.getEmpUnavails(),
      this.getUnstaffedShifts()
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
          shiftsOfDay: shiftsToday,
          availStatusOfDay: canWorkBool,
          unstaffedShifts: unstaffedShifts
        });
        }))
        .catch(errors => console.log(errors));
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

  ////////////////////// DISPLAY: own info //////////////////////
  showAllInfo = () => {
    const info = this.state.empInfo;
    
    return(
      <section>   
        <form>
          <fieldset>
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" placeholder={info.name}/>
              <label>Address</label>
              <input type="text" className="form-control" placeholder={info.address}/>
              <label>Phone</label>
              <input type="text" className="form-control" placeholder={info.phone}/>
              <label>Email</label>
              <input type="text" className="form-control" placeholder={info.email}/>
            </div>
            <button onClick={this.update} className="btn btn-primary">READ ONLY FOR NOW (updates planned for future release)</button>
          </fieldset>
        </form>
      </section>
    );
  }

  update = (e) => {
    e.preventDefault();
  }

  ////////////////////// DISPLAY: own shifts //////////////////////

  showAllShifts = () => {
    const sortedOwnShifts = sortShiftsByDate(this.state.empShifts);
    const sortedUnstaffedShifts = sortShiftsByDate(this.state.unstaffedShifts);
    const sortedUnavails = sortUnavailsByDate(this.state.empUnavails);
    return (<ShiftsTable sortedOwnShifts={sortedOwnShifts} sortedUnstaffedShifts={sortedUnstaffedShifts} sortedUnavails={sortedUnavails} freeToWorkCallback={this.freeToWork} takeShiftCallback={this.takeShift}/>);
  }

  ////////////////////// DISPLAY: own unavails //////////////////////
  showAllUnavails = () => {
    const empUnavails = this.state.empUnavails;
    const sortedUnavails = sortUnavailsByDate(empUnavails);

    if (empUnavails.length === 0) {
      return (
        <section>No upcoming unavailable days</section>
      );
    } else {
      return(
      <section>
        <UnavailDays sortedUnavails={sortedUnavails} freeToWorkCallback={this.freeToWork}/>
      </section>
    );
    }
  }
  
  
  ////////////////////// DISPLAY: calendar  //////////////////////
  showCalendar = () => {
    return (
      <section>
        <Calendar onChange={this.updateStateForCalendarDay} value={convertToPST(this.state.daySpotlight)}/>
        <CalendarDay toggleAvailCallback={this.toggleAvail} basicShiftInfo={this.state.shiftsOfDay} dateStr={this.state.daySpotlight} availStatus={this.state.availStatusOfDay}/>
      </section>
    );
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

  ////////////////////// Callback fcns //////////////////////
  freeToWork = (unavailObj) => {
    console.log("so you want to work after all..., delete unavailObj", unavailObj);
    axios.delete(this.state.EMP_DASH + `/unavails/${unavailObj.id}`)
      .then( response => {
        // quick update on front end to match db
        // response.data is the latest data from Unavails table in db for this employee
        this.setState({ empUnavails: response.data, availStatusOfDay: true });
      })  
      .catch(error => console.log("ERROR deleting from db: ", error.message));
  }

  toggleAvail = (availBoolean) => {
    let latestEmpUnavails = [...this.state.empUnavails];

    if (availBoolean) {
      // emp wants to work -> delete row from unavails table in db
      // find id from this.state.empUnavails
      const unavailObj = this.state.empUnavails.find( unavail => unavail.day_off === this.state.daySpotlight );
      this.freeToWork(unavailObj);

    } else {
      // emp wants day off -> post/add to unavails table in db
      axios.post((this.state.EMP_DASH + `/unavails`), { day_off: this.state.daySpotlight })
      .then( response => {
        // quick update on front end to match db
        latestEmpUnavails.push( response.data );
        this.setState({ empUnavails: latestEmpUnavails, availStatusOfDay: false });
      } )   
      .catch(error => console.log("ERROR adding to db: ", error.message));
    }
  }


  takeShift = (shift) => {
    // send axios call if everything's cool
    console.log("\nSEND API FOR", shift);
    
    const URL_endpoint = this.state.EMP_DASH+`/shifts/${shift.id}`;

    axios.put(URL_endpoint)
    .then(response => this.setState({empShifts: response.data}))
    .catch(error => console.log(error.message));
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
              <button className="nav-link active" onClick={()=>this.setShowCategory('unavails')}>UNAVAILABLE DAYS</button>
            </li>
            <li className="nav-item">
              <button className="nav-link active" onClick={()=>this.setShowCategory('info')}>INFO</button>
            </li>
          </ul>

          {this.props.authenticatedRole === "EMPLOYEE" ? this.showChosenCategory() : <Error message="You need to log in first to see EMPLOYEE dashboard"/>}  

        </section>
      );
    }
}

