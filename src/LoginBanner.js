import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

class LoginBanner extends React.Component {
  constructor() {
    super()
    this.state = {
      adminLoggedIn: false,
      employeeLoggedIn: false,
      loggedInPerson: ""    // TODO: sub in Admin/Employee obj
    }
    // TRIAL: saving sessionStorage so browser refresh won't erase the login
    sessionStorage.setItem('role', '');
    sessionStorage.setItem('loggedInPerson', '');
  }
  
  getLoggedInRole = () => sessionStorage.getItem('role');
  getLoggedInPerson = () => sessionStorage.getItem('loggedInPerson');
  

  ////////////////////// LOGIN //////////////////////
  loginAdmin = () => this.login("admin");

  loginEmployee = () => this.login("employee");

  login = (role) => {
    console.log('logging into table for', role);
    // TODO: oAuth login
    const oAuthSuccessful = true;   

    // if successful, .setState to affect the login buttons 
    // TODO: switch out role with loggedInPerson.name
    if (oAuthSuccessful) {
      sessionStorage.setItem('role', role);
      sessionStorage.setItem('loggedInPerson', 'NAME HERE');

      if (role === "admin") {
        this.setState({ adminLoggedIn: true, loggedInPerson: role});
        console.log(this.getLoggedInPerson());
      } else {
        this.setState({ employeeLoggedIn: true, loggedInPerson: role});
        console.log(this.getLoggedInPerson());
      } 
    }
  }


  ////////////////////// LOGOUT //////////////////////
  logout = () => {
    console.log("TODO: ALERT, you've successfully logged out")
    this.setState({ loggedInPerson: null, adminLoggedIn: false, employeeLoggedIn: false });
    sessionStorage.setItem('loggedInPerson', '');
    sessionStorage.setItem('role', '');
  }


  ////////////////////// DISPLAY //////////////////////
  showLogins = () => {
    if (this.getLoggedInPerson()) {
      return (
        <section className = 'navbar'>
          <section>You're logged in as... {this.getLoggedInRole()}: {this.getLoggedInPerson()}</section>
          { this.showDashboardChoice() }
          <button onClick={this.logout}><Link to="/">LOGOUT</Link></button>
        </section>
      );
    } else {
      return (
        <section className="giant-in-middle">
          <button onClick={this.loginAdmin} className="btn btn-warning"><Link to="/adminDash">ADMIN LOGIN</Link></button>
          <button onClick={this.loginEmployee} className="btn btn-warning"><Link to="/employeeDash">EMPLOYEE LOGIN</Link></button>
        </section>
      );
    }
  }

  showDashboardChoice = () => {
    if (this.state.adminLoggedIn) {
      return (<button className="btn btn-warning"><Link to="/adminDash">ADMIN Dashboard</Link></button>);
    } else if (this.state.employeeLoggedIn) {
      return (<button className="btn btn-warning"><Link to="/employeeDash">EMPLOYEE Dashboard</Link></button>);
    } else {
      console.log("error, who are you?");
    }
  }

////////////////////// RENDER //////////////////////
  render() {
    return(
      <section>
        <Link to="/">LOGO to go home</Link>
        {this.showLogins()}
        
      </section>
    );
  }
    
}

export default LoginBanner;