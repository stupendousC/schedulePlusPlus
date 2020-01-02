import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Admin from './components/Admin';
import Employee from './components/Employee';
import Tester from './components/Tester';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      adminLoggedIn: false,
      employeeLoggedIn: false,
      loggedInPerson: []
    }
  }

  showLogins = () => {
    if (this.state.adminLoggedIn | this.state.employeeLoggedIn) {
      return (
      <section>You're logged in as... {this.state.loggedInPerson}</section>
      );
    } else {
      return (
        <section>
          <Link to="/admin">ADMIN LOGIN</Link>
          <Link to="/employee">EMPLOYEE LOGIN</Link>
        </section>
      )
    }
  }

  render() {
    return (
    <div className="App">
      <header className="App-header">
          SCHEDULE++
      </header>

      <Router className="App-intro">
          <nav className="navbar navbar-light">
            <Link to="/">Home</Link>
            {this.showLogins()}
          </nav>

          <Switch>

            <Route path="/admin">
              <Admin />
            </Route>

            <Route path="/employee">
              <Employee />
            </Route>
            
            <Route path="/">
            </Route>

          </Switch>
      </Router>

      


    </div>
  );
  }
  
}

export default App;
