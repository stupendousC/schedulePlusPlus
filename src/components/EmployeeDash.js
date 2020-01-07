import React from 'react';
// import Calendar from 'react-calendar'
// import axios from 'axios';

//https://www.hobo-web.co.uk/best-screen-size/  
// 360x640
// 1366 x 768
// 1920x1080   

export default class EmployeeDash extends React.Component {


  render() {
    return(
      <div>
        <br/>SELF, read/update
        <br/>CALENDAR, from shifts table for self, from unavilabilities table for self
        <br/>MODIFY Calendar, updates unavilabilities table for self
      </div>
    );
  }

}