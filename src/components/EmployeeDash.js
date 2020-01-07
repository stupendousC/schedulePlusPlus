import React from 'react';
import Calendar from 'react-calendar';
import CalendarDay from './EmployeeDash_CalendarDay';
import Error from './Error';
import axios from 'axios';
import { convertDateString, convertTimeString } from './Helpers';

//https://www.hobo-web.co.uk/best-screen-size/  
// 360x640
// 1366 x 768
// 1920x1080   

const EMP_DASH = process.env.REACT_APP_EMP_DASH+"/"+sessionStorage.getItem('databaseId');

export default class EmployeeDash extends React.Component {

  constructor() {
    super()
    const today = convertDateString(new Date())
    this.state = {
      empInfo: [],
      empUnavails: [],
      empShifts: [],
      daySpotlight: today,
      shiftsOfDay: [],
      availStatusOfDay: null,
      show: 'calendar'
    }
  }

  componentDidMount() {
    console.log("HELLO, name=", this.props.username, "role=", this.props.authenticatedRole);
    if (this.props.authenticatedRole === "EMPLOYEE") {

      // get employee's own info
      axios.get(EMP_DASH)
      .then(response => {
        this.setState({empInfo: response.data});
      })
      .catch(error => console.log("ERROR downloading employee info:", error.message));

    // get employee's own Unavails
    axios.get(EMP_DASH+"/unavails")
      .then(response => {
        const today = convertDateString(new Date());
        const canWorkBool = this.canWorkThisDay(today);
        this.setState({empUnavails: response.data, availStatusOfDay: canWorkBool});
      })
      .catch(error => console.log("ERROR downloading employee unavails:", error.message));

    // get employee's own Shifts
    axios.get(EMP_DASH+"/shifts")
      .then(response => {
        const today = convertDateString(new Date());
        const shiftsToday = response.data.filter( shift => shift.shift_date === today );
        this.setState({empShifts: response.data, shiftsOfDay: shiftsToday});
      })
      .catch(error => console.log("ERROR downloading employee shifts:", error.message));

    } else {
      console.log("YOU ARE *NOT* AN EMPLOYEE!");
    }    
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
              <input disabled type="text" className="form-control" placeholder={info.name}/>
              <label>Address</label>
              <input disabled type="text" className="form-control" placeholder={info.address}/>
              <label>Phone</label>
              <input disabled type="text" className="form-control" placeholder={info.phone}/>
              <label>Email</label>
              <input disabled type="text" className="form-control" placeholder={info.email}/>
            </div>
            {/* <div className="form-check">
              <input className="form-check-input" type="checkbox"/>
              <label className="form-check-label">
                Check this box to enable updating my info
                //TODO: planning to have all inputs disabled first, then enable it once this box is clicked
              </label>
            </div> */}
            <button onClick={this.update} className="btn btn-primary">Update My Info (UPCOMING)</button>
          </fieldset>
        </form>
      </section>
    );
  }

  update = (e) => {
    e.preventDefault();
    console.log("TODO: UPDATE");
  }

  ////////////////////// DISPLAY: own shifts //////////////////////

  showAllShifts = () => {
    if (this.state.empShifts.length === 0) {
      return (
        <section>No upcoming shifts</section>
      );
    } else {
      return(
        <section>
          Would be nice to show client info, not just random id.  also truncate working time
          {this.state.empShifts.map(shift => {
            return (
              <section key = {shift.id} className="section-4-col">
                <section>{shift.shift_date}</section>
                <section>{shift.client_id}</section>
                <section>{convertTimeString(shift.start_time)}</section>
                <section>{convertTimeString(shift.end_time)}</section>
              </section>
            )}
          )}
        </section>
      );
    }    
  }

  ////////////////////// DISPLAY: own unavails //////////////////////
  showAllUnavails = () => {
    const empUnavails = this.state.empUnavails;
    const sortedByDate = empUnavails.sort((a,b) => b.day_off - a.day_off);
    console.log("should be sorted...", sortedByDate);
    
    if (empUnavails.length === 0) {
      return (
        <section>No upcoming unavailable days</section>
      );
    } else {
      return(
      <section>
        It'd be nice to sort these, and to hide all the ones in the past, can click on them if u really want to
        {sortedByDate.map(unavail => {return <li key = {unavail.id}>{unavail.day_off}</li>})}
      </section>
    );
    }
  }
  
  ////////////////////// DISPLAY: calendar  //////////////////////
  showCalendar = () => {
    return (
      <section>
        <Calendar onChange={this.updateStateForCalendarDay} value={new Date()}/>
        <CalendarDay tempInfo={this.state.shiftsOfDay} dateStr={this.state.daySpotlight} completeShiftsInfo={this.getCompleteShiftsInfo} availStatus={this.state.availStatusOfDay}/>
      </section>
    );
  }

  updateStateForCalendarDay = (e) => {
    const dateStr = convertDateString(e);

    const shiftsOfDay = this.state.empShifts.filter( shift => shift.shift_date === dateStr);
    const canWorkBool = this.canWorkThisDay(dateStr);
    this.setState({ 
      daySpotlight: dateStr, 
      shiftsOfDay: shiftsOfDay, 
      availStatusOfDay: canWorkBool })
  }

  getCompleteShiftsInfo = () => {
    // need to get client name & STUFF
  }

  canWorkThisDay = () => {
    // are you already working today?
    if (this.state.shiftsOfDay.length > 0) {
      return false;
    }

    // do u have today off?
    for (const unavail of this.state.empUnavails) {
      if (unavail.day_off === this.state.daySpotlight) {
        return false;
      }
    }
    
    return true;
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
              <button className="nav-link" onClick={()=>this.setShowCategory('shifts')}>SHIFTS</button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={()=>this.setShowCategory('unavails')}>UNAVAILABLE DAYS</button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={()=>this.setShowCategory('info')}>INFO</button>
            </li>
          </ul>

          {this.props.authenticatedRole === "EMPLOYEE" ? this.showChosenCategory() : <Error message="You need to log in first to see EMPLOYEE dashboard"/>}  

        </section>
      );
    }

}

