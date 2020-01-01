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

  render() {
    return (
    <div className="App">
      <header className="App-header">
          FRONT END!!!
          <p>1. If u wanna move this, remember to check the homepage link in package.json!</p>
      </header>

      <Router className="App-intro">
          <nav className="navbar navbar-light">
            <Link to="/">Home</Link>
            <Link to="/admin">ADMIN LOGIN</Link>
            <Link to="/employee">EMPLOYEE LOGIN</Link>
            
            <Link to="/tester">TEMPORARY TESTER</Link>
          </nav>

          <Switch>
            <Route path="/tester">
              <Tester />
            </Route>

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
