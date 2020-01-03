import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlertComp from './components/Alert';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import AdminDash from './components/AdminDash';
import EmployeeDash from './components/EmployeeDash';









class App extends React.Component {
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
      if (role === "admin") {
        this.setState({ adminLoggedIn: true, loggedInPerson: role});
        sessionStorage.setItem('loggedInPerson', 'ADMIN NAME PLACEHOLDER');
        sessionStorage.setItem('role', role);
        console.log(this.getLoggedInPerson());
        
      } else {
        this.setState({ employeeLoggedIn: true, loggedInPerson: role});
        sessionStorage.setItem('loggedInPerson', 'EMPLOYEE NAME PLACEHOLDER');
        sessionStorage.setItem('role', role);
        console.log(this.getLoggedInPerson());
      } 
    }
  }


  ////////////////////// LOGOUT //////////////////////
  logout = () => {
    console.log("TODO: ALERT, you've successfully logged out")
    console.log("TODO: REMOVE PREVIOUS SCREEN IF THEY LOGGED OUT!");
    this.setState({ loggedInPerson: null, adminLoggedIn: false, employeeLoggedIn: false });
    sessionStorage.setItem('loggedInPerson', '');
    sessionStorage.setItem('role', '');
  }


  ////////////////////// DISPLAY //////////////////////
  showLogins = () => {
    if (this.getLoggedInPerson()) {
      // someone is already logged in, show logout buttons instead
      return (
        <section className = 'navbar'>
    <section>You're logged in as... {this.getLoggedInRole()}: {this.getLoggedInPerson()}</section>
          <button onClick={this.logout}>LOGOUT</button>
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

  showHomepage = () => {
    // refresh when user clicks on big banner up top
  }


  ////////////////////// RENDER //////////////////////
  render() {
    return (
    <div className="App">

      
      
      <Router className="navbar navbar-light">
        <Link to="/">
          <header className="App-header">
          SCHEDULE++    (this is clickable for homepage, activate showHomepage())
          </header>
        </Link>
        <Switch>
          <Route path="/">
          </Route>
        </Switch>
      </Router>

<AlertComp title="title here" body="body here" variant="success"/>

      <Router className="App-intro">
        <section>
          {this.showLogins()}
        </section>
            
          <Switch>
            <Route path="/adminDash">
              <AdminDash />
            </Route>

            <Route path="/employeeDash">
              <EmployeeDash />
            </Route>
          </Switch>
      </Router>
    </div>
  );
  }
  
}

export default App;
