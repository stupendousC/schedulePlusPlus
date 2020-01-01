import React from 'react';
import axios from 'axios';

export default class Tester extends React.Component {

  constructor() {
    super()
    this.state = {
      message: "",
      endpointURL: "http://sppexperiment.us-west-2.elasticbeanstalk.com/admin/employees"
    }
  }

  getAllEmployees = () => {

    axios.get(this.state.endpointURL)
    .then( response => {
      console.log("YES!!!");
      this.setState({ message: response.data});
      return response.data;
    })
    .catch(error => {
      console.log("NO!!!", error);
    });
  }

    render() {
      this.getAllEmployees();

      return (
        <div>
          TESTER here!
          {this.getAllEmployees}
        </div>
      );
    }
  
  
  
  
}