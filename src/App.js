import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginBanner from './LoginBanner';
import AdminDash from './components/AdminDash';
import EmployeeDash from './components/EmployeeDash';

import { BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import Homepage from './components/Homepage';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      authenticatedRole: "",
      googleId: "",
      googleEmail: ""
    }
    sessionStorage.setItem('authenticatedRole', '');
    sessionStorage.setItem('loggedInPerson', '');
  }

  login = (googleId, googleEmail, authenticatedRole) => {
    this.setState({
      googleId: googleId,
      googleEmail: googleEmail,
      authenticatedRole: authenticatedRole
    })
    sessionStorage.setItem('authenticatedRole', authenticatedRole);     /// USING ADMIN FOR NOW!~!!
    sessionStorage.setItem('loggedInPerson', '');
  }

  logout = () => {
    console.log("APP.js is logging you out!!!");
    this.setState({
      authenticatedRole: "",
      googleId: "",
      googleEmail: ""
    })
    sessionStorage.setItem('authenticatedRole', '');
    sessionStorage.setItem('loggedInPerson', '');
  }

  showCorrectDashboard = () => {
    
    const authenticatedRole = sessionStorage.getItem('authenticatedRole');
    
    console.log("session says..", authenticatedRole);
    
    if (authenticatedRole === "ADMIN") {
      return <Redirect to="/adminDash" />
    } else if (authenticatedRole === "EMPLOYEE") {
      return <Redirect to="/employeeDash" />
    } else {
      console.log("home it is");
      return <Redirect to="/" />
    }
  }

  render() {
    console.log("ENV", process.env.REACT_APP_BASE_URL);
    
    this.showCorrectDashboard();

    return (
      
      <Router>
          <LoginBanner authenticatedRole={this.state.authenticatedRole} googleAuthCB={this.login} logoutCB={this.logout}/>

          <Switch>  
            {/* Displays only 1 of these components based on on what the URL is */}
            <Route path="/" exact component={Homepage}/>    {/* use 'exact' so it won't accidentally outrank anything below*/}
            <Route path="/adminDash" component={AdminDash} />
            <Route path="/employeeDash" component={EmployeeDash} />
          </Switch>
      </Router>
  );
  }
}


export default App;
