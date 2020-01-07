import React from 'react';
import Calendar from 'react-calendar';
import CalendarDay from './CalendarDay';
import Error from './Error';
import axios from 'axios';
import { convertDateString } from './Helpers';

//https://www.hobo-web.co.uk/best-screen-size/  
// 360x640
// 1366 x 768
// 1920x1080   

export default class EmployeeDash extends React.Component {

  constructor() {
    super()
    this.state = {
      empInfo: [],
      empUnavails: [],
      empShifts: [],
      daySpotlight: convertDateString(new Date()),
      show: 'calendar'
    }
  }

  componentDidMount() {
    console.log("HELLO, name=", this.props.username, "role=", this.props.authenticatedRole);
    if (this.props.authenticatedRole === "EMPLOYEE") {

      // THIS IS WHERE I LEFT OFF!!!!!!!
      // get employee's own info
      axios.get()
      .then()
      .catch()
    // get employee's own Unavails

    // get employee's own Shifts

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
    // read = (i, listFromState) => {
    //   const selectedPerson = listFromState[i];
    //   this.setState({ personSpotlight: selectedPerson });
    //   return selectedPerson;    
    // }
  
    // update = (i, listFromState) => {
    //   console.log("TODO: UPDATE");
    //   const selectedPerson = listFromState[i];
    //   this.setState({personSpotlight: selectedPerson});
  
    //   // TODO: add fields for input
    // }
  
    // deactivate = (person, URL_endpoint) => {
    //   console.log("deactivate", person.name, "from", URL_endpoint);
  
    //   this.setState({personSpotlight: ""});
    //   axios.delete(URL_endpoint + "/" + person.id)
    //   .then(response => this.setState({message: `deactivated ${person.name} from database`}))
    //   .catch(error => console.log("ERROR:", error.messages));
    // }
    


  ////////////////////// DISPLAY: calendar  //////////////////////
  showCalendar = () => {
    return (
      <section>
        <Calendar onChange={this.changeDaySpotlight} value={new Date()}/>
        {/* <NewShift /> and <CalendarDay /> will change based on which day you click on in the <Calendar> */}
        <CalendarDay dateStr={this.state.daySpotlight} completeShiftsInfo={ this.getCompleteShiftsInfo()} />
      </section>
    );
  }

  // changeDaySpotlight = (e) => {
  //   // convert chosen event value to yyyy-mm-dd format
  //   const dateStr = convertDateString(e);
  //   const shiftsOfDay = this.state.allShifts.filter(shift => shift.shift_date === dateStr)
  //   this.setState({ daySpotlight: dateStr, shiftsSpotlight: shiftsOfDay });
  // }

  // // TODO: BUG!!! it seRches only ACTIVE clients & employees, maybe get this info from backend???
  // getCompleteShiftsInfo = () => {
  //   const allShifts = this.state.shiftsSpotlight;

  //   // console.log("STARTING WITH #allShifts =", allShifts.length);

  //   if (allShifts) {
  //     let completeShiftsInfo = [];
  //     for (let shift of allShifts) {
  //       let thisShift = [];
  //       // part 1: the shift itself goes into thisShift[]
  //       thisShift.push(shift);
  //       // part 2 & 3: relevant employee & client also go into thisShift[]
  //       const employee = this.state.allEmployees.find( emp => (emp.id === shift.employee_id ));
  //       thisShift.push(employee);
  //       const client = this.state.allClients.find( client => client.id === shift.client_id );
  //       thisShift.push(client);
  //       // put the triple combo of thisShift into completeShiftsInfo
  //       completeShiftsInfo.push(thisShift);
  //     }
  //     return completeShiftsInfo;
  //   }
  // }

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
              <button className="nav-link" onClick={()=>this.setShowCategory('unavails')}>UNAVAILABILE DAYS</button>
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





  

