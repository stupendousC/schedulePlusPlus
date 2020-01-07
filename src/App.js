import React from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginBanner from './LoginBanner';
import AdminDash from './components/AdminDash';
import EmployeeDash from './components/EmployeeDash';

import {} from './components/Helpers';
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import Homepage from './components/Homepage';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      authenticatedRole: "",
      googleId: "",
      username: ""
    }
    sessionStorage.setItem('authenticatedRole', 'ADMIN');   // TEMPORARY
    sessionStorage.setItem('googleId', '');
    sessionStorage.setItem('username', '');
  }

  login = (googleId) => {
    const endpoint = process.env.REACT_APP_LOGIN + "/" + googleId;
    
    axios.get(endpoint)
      .then(response => {
        if (Object.entries(response.data).length === 0) {
          console.log("NOT IN OUR DB!!!");
          sessionStorage.setItem('authenticatedRole', "NEED UUID");
          this.setState({ authenticatedRole: "NEED UUID" });
        }

        const authenticatedRoleDB = Object.keys(response.data)[0];
        const usernameDB = Object.values(response.data)[0].name;

        sessionStorage.setItem('authenticatedRole', authenticatedRoleDB);
        sessionStorage.setItem('userName', usernameDB);
        sessionStorage.setItem('googleId', googleId);

        this.setState({
          authenticatedRole: authenticatedRoleDB,
          googleId: googleId,
          username: usernameDB      
      })
      })
      .catch(error => console.log("LOGIN error!", error.message));

      // check to see what the authenticatedRole is... 
      // console.log("session storage ready? ", sessionStorage.getItem('authenticatedRole'));
      // console.log("state ready?", this.state.authenticatedRole);
      // DO NOT ASK FOR UUID at this point, b/c both session & state updates are not ready yet! 
  }

  logout = () => {
    console.log("APP.js is logging you out!!!");
    this.setState({
      authenticatedRole: "",  
      googleId: "",
      username: ""
    })
    sessionStorage.setItem('authenticatedRole', '');
    sessionStorage.setItem('googleId', '');
    sessionStorage.setItem('username', '');
  }

  render() {
    
    return (
      
      <Router>
          <LoginBanner authenticatedRole={this.state.authenticatedRole} googleAuthCB={this.login} logoutCB={this.logout}/>
          
          <Switch>   
            {/* Displays only 1 of these components based on on what the URL is */}
            <Route path="/" exact component={Homepage}/>    
            <Route path="/adminDash" component={() => <AdminDash authenticatedRole={this.state.authenticatedRole} username={this.state.username} googleId={this.state.googleId}/>} />
            <Route path="/employeeDash" component={EmployeeDash} />
          </Switch>
      </Router>
  );
  }
}


export default App;

       // showCorrectDashboard = () => {
    
    // const authenticatedRole = sessionStorage.getItem('authenticatedRole');
    
    // console.log("session says..", authenticatedRole);
    
    // if (authenticatedRole === "ADMIN") {
    //   return <Redirect to="/adminDash" />
    // } else if (authenticatedRole === "EMPLOYEE") {
    //   return <Redirect to="/employeeDash" />
    // } else {
    //   console.log("Nobody logged in -> HOME");
    //   return <Redirect to="/" />
    // }
  // }     