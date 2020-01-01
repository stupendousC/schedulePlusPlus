import React from 'react';
import axios from 'axios';

export default class Tester extends React.Component {

  constructor() {
    super()
    this.state = {
      allEmployees: "",
      endpointURL: "http://sppexperiment.us-west-2.elasticbeanstalk.com/admin/employees"
    }
  }

  componentDidMount() {
    // Queries postgres for all employees
    axios.get(this.state.endpointURL)
    .then( response => {
      console.log(response.data);
      this.setState({ message: response.data});
      return response.data;
    })
    .catch(error => {
      console.log("NO!!!", error);
    });
  }


  

    render() {

      return (
        <div>
          TESTER here!
        </div>
      );
    }
  
  
  
  
}