import React from 'react';
import axios from 'axios';

export default class Employee extends React.Component {


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