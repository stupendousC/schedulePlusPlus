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
          <p>2. Can't test CORS UNTIL BACK END is redeployed with @CrossOrigin(origins = "http://frontend.com")</p>
      </header>

      <Router className="App-intro">
          <nav className="navbar navbar-light">
            <Link to="/">Home</Link>
            <Link to="/admin">ADMIN</Link>
            <Link to="/employee">EMPLOYEE</Link>
            <Link to="/tester">TESTER</Link>
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
