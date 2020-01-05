import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import bannerLogo from './SPPbanner.png';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

import {getAllAdminDB} from './components/Helpers';
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

class LoginBanner extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedInPerson: ""    // TODO: sub in Admin/Employee obj
    }
  }
  
  ////////////////////// LOGIN //////////////////////
  responseGoogle = (response) => {
    // Are you even an admin or employee?
    const roleDB = this.checkAgainstDB();

    // If yes, send info up to App.js     
    if (roleDB === "ADMIN" || roleDB === "EMPLOYEE") {
      this.props.googleAuthCB(response.profileObj.googleId, response.profileObj.email, roleDB);
    } else {
      console.log("ARE YOU A CLIENT THEN?  SORRY THAT FEATURE IS NOT YET IMPLEMENTED");
    }
    
  }

  checkAgainstDB = () => {
    // check agaisnt admins first
    const allAdmins = getAllAdminDB();
    console.log(allAdmins);
    // check agaisnt employees

    // return either admin or employee
    return "NOPE!";     // TODO!!!!!!!!
  }

  showBothLogins = () => {
    return (
      <section className="giant-in-middle">
        <GoogleLogin
          clientId="10529880190-r19j0h35rit1kcoki6dnk9itkhpkqs9e.apps.googleusercontent.com"
          buttonText="LOGIN"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </section>
    );
  }


  ////////////////////// DASHBOARD BUTTONS //////////////////////
  showDashWithLogout = () => {
    const authenticatedRole = this.props.authenticatedRole;
    if (authenticatedRole === "ADMIN") {
      return (
        <section>
          <button className="btn btn-warning"><Link to="/adminDash">ADMIN Dashboard</Link></button>
          <button onClick={this.logout}><Link to="/">LOGOUT</Link></button>
        </section>
      );
    } else if (authenticatedRole === "EMPLOYEE") {
      return (
        <section>
          <button className="btn btn-warning"><Link to="/employeeDash">EMPLOYEE Dashboard</Link></button>
          <button onClick={this.logout}><Link to="/">LOGOUT</Link></button>
        </section>
      );
    } else {
      console.log("error, who are you?");
    }
  }


  
  ////////////////////// LOGOUT //////////////////////
  logout = () => {
    console.log("TODO: ALERT, you've successfully logged out")
    this.props.logoutCB();
  }

////////////////////// RENDER //////////////////////
  render() {

    return(
      <section>
        <Link to="/"><img src={bannerLogo} alt="sppBannerLogo" /></Link>
        {this.props.authenticatedRole? this.showDashWithLogout():this.showBothLogins()}
      </section>
    );
  }
    
}

export default LoginBanner;


  // showLogins = () => {
  //   if (this.getLoggedInPerson()) {
  //     return (
  //       <section className = 'navbar'>
  //         <section>You're logged in as... {this.getLoggedInRole()}: {this.getLoggedInPerson()}</section>
  //         { this.showDashboardChoice() }
  //         <button onClick={this.logout}><Link to="/">LOGOUT</Link></button>
  //       </section>
  //     );
  //   } else {
  //     return (
  //       <section className="giant-in-middle">
  //         <GoogleLogin
  //           clientId="10529880190-r19j0h35rit1kcoki6dnk9itkhpkqs9e.apps.googleusercontent.com"
  //           buttonText="ADMIN LOGIN"
  //           onSuccess={this.responseGoogle}
  //           onFailure={this.responseGoogle}
  //           cookiePolicy={'single_host_origin'}
  //         />

  //         <GoogleLogin
  //           clientId="10529880190-r19j0h35rit1kcoki6dnk9itkhpkqs9e.apps.googleusercontent.com"
  //           buttonText="EMPLOYEE LOGIN"
  //           onSuccess={this.responseGoogle}
  //           onFailure={this.responseGoogle}
  //           cookiePolicy={'single_host_origin'}
  //         />
  //         {/* <button onClick={this.loginAdmin} className="btn btn-warning"><Link to="/adminDash">ADMIN LOGIN</Link></button>
  //         <button onClick={this.loginEmployee} className="btn btn-warning"><Link to="/employeeDash">EMPLOYEE LOGIN</Link></button> */}
  //       </section>
  //     );
  //   }
  // }



  ////////////////////// GARBAGE NOW??? LOGIN //////////////////////
  // loginAdmin = () => this.login("admin");

  // loginEmployee = () => this.login("employee");

  // login = (role) => {
  //   console.log('logging into table for', role);
  //   // TODO: oAuth login

    
  //   const oAuthSuccessful = true;   

  //   // if successful, .setState to affect the login buttons 
  //   // TODO: switch out role with loggedInPerson.name
  //   if (oAuthSuccessful) {
  //     sessionStorage.setItem('authenticatedRole', role);
  //     sessionStorage.setItem('loggedInPerson', 'NAME HERE');

  //     if (role === "admin") {
  //       this.setState({ adminLoggedIn: true, loggedInPerson: role});
  //       console.log(this.getLoggedInPerson());
  //     } else {
  //       this.setState({ employeeLoggedIn: true, loggedInPerson: role});
  //       console.log(this.getLoggedInPerson());
  //     } 
  //   }
  // }

  