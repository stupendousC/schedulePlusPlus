import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginBanner from './LoginBanner';
import AdminDash from './components/AdminDash';
import EmployeeDash from './components/EmployeeDash';

import { BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import Homepage from './components/Homepage';

class App extends React.Component {
  
  render() {
    return (
      <Router>
          <LoginBanner />
          <Switch>  
            {/* Displays only 1 of these components based on on what the URL is */}
            <Route path="/" exact component={Homepage}/>    {/* use 'exact' so it won't accidentally outrank anything below*/}
            <Route path="/adminDash" component={AdminDash} />
            <Route path="/employeeDash" component={EmployeeDash} />
            <Route path="/googlef09f7182011b6bdd.html" component={AdminDash} />
          </Switch>
      </Router>
  );
  }
}


export default App;
