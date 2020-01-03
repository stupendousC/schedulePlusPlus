import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';


// import AdminDash from './components/AdminDash';
// import EmployeeDash from './components/EmployeeDash';
// import Homepage from './components/Homepage';




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


////////////////////// RENDER //////////////////////
  render() {
    
    return(
      <section>

        <Link to="/">LOGO to go home</Link>
        {this.showLogins()}

        <Link to="/adminDash">ADMIN LOGIN</Link>
        <Link to="/employeeDash">EMPLOYEE LOGIN</Link>

        
      </section>
    );
  }
    
}

export default LoginBanner;


//   render() {
//     return (
//     <div className="App">

// <AlertComp title="Alert" body="TODO: make it shortlived" variant="success"/>

//       <Router className="navbar navbar-light">
//         <Link to="/">
//           <header className="App-header">
//           SCHEDULE++    (TODO: clickable logo for homepage, activate showHomepage())
//           </header>
//         </Link>
//         <Switch>
//           <Route path="/">
//           </Route>
//         </Switch>
//       </Router>


//       <Router className="App-intro">
//         <section>
//           {this.showLogins()}
//         </section>
            
//           <Switch>
//             <Route path="/adminDash">
//               <AdminDash />
//             </Route>

//             <Route path="/employeeDash">
//               <EmployeeDash />
//             </Route>
//           </Switch>
//       </Router>
//     </div>
//   );
//   }