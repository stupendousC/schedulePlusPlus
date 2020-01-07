import React from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginBanner from './LoginBanner';
import AdminDash from './components/AdminDash';
import EmployeeDash from './components/EmployeeDash';

import {} from './components/Helpers';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Homepage from './components/Homepage';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      authenticatedRole: "EMPLOYEE",       // TEMPORARY
      googleId: "",
      username: "TEMPORARY OVERRIDE EMPLOYEE",// TEMPORARY
      databaseId: ""
    }
    sessionStorage.setItem('authenticatedRole', 'EMPLOYEE');   // TEMPORARY
    sessionStorage.setItem('googleId', '');
    sessionStorage.setItem('username', 'TEMPORARY OVERRIDE EMPLOYEE');// TEMPORARY
  }

  login = (googleId) => {
    const endpoint = process.env.REACT_APP_LOGIN + "/" + googleId;
    // const endpoint = process.env.REACT_APP_LOGIN + "/?googleId=" + googleId;

    axios.get(endpoint)
      .then(response => {
        console.log("got this back from backend:", response.data);


        if (Object.entries(response.data).length === 0) {
          console.log("NOT IN OUR DB!!! ");
          sessionStorage.setItem('authenticatedRole', "NEED UUID");
          this.setState({ authenticatedRole: "NEED UUID" });
        }

        const authenticatedRoleDB = Object.keys(response.data)[0];
        const usernameDB = Object.values(response.data)[0].name;
        const databaseId = Object.values(response.data)[0].id;

        sessionStorage.setItem('authenticatedRole', authenticatedRoleDB);
        sessionStorage.setItem('username', usernameDB);
        sessionStorage.setItem('googleId', googleId);
        sessionStorage.setItem('databaseId', databaseId);

        this.setState({
          authenticatedRole: authenticatedRoleDB,
          googleId: googleId,
          username: usernameDB,
          databaseId: databaseId      
      })
      })
      .catch(error => console.log("LOGIN ERROR!", error.message));
  }

  logout = () => {
    console.log("APP.js is logging you out!!!");
    this.setState({
      authenticatedRole: "",  
      googleId: "",
      username: "",
      databaseId: ""
    })
    sessionStorage.clear();
  }

  render() {
    
    return (
      
      <Router>
          <LoginBanner authenticatedRole={this.state.authenticatedRole} googleAuthCB={this.login} logoutCB={this.logout}/>
          
          <Switch>   
            {/* Displays only 1 of these components based on on what the URL is */}
            <Route path="/" exact component={Homepage}/>    
            <Route path="/adminDash" component={() => <AdminDash authenticatedRole={this.state.authenticatedRole} username={this.state.username} googleId={this.state.googleId}/>} />
            <Route path="/employeeDash" component={() => <EmployeeDash authenticatedRole={this.state.authenticatedRole} username={this.state.username} googleId={this.state.googleId}/>} />
          </Switch>
      </Router>
  );
  }
}


export default App;
