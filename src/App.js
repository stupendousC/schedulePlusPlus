import React from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginBanner from './components/LoginBanner';
import Footer from './components/Footer';
import AdminDash from './components/AdminDash';
import EmployeeDash from './components/EmployeeDash';
import LinkTextedToEmployee from './components/Employee_TextedLink';

import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Homepage from './components/Homepage';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      authenticatedRole: "",       
      // googleId: "",
      // username: "",
      // databaseId: ""
    }
    sessionStorage.setItem('authenticatedRole', '');   
    sessionStorage.setItem('googleId', '');
    sessionStorage.setItem('googleAccessToken', '');
    sessionStorage.setItem('username', '');    
    sessionStorage.setItem('databaseId', '');
  }

  login = () => {
    const googleId = sessionStorage.getItem('googleId');
    const googleAccessToken = sessionStorage.getItem('googleAccessToken');

    const loginParams = { "googleId": googleId, "googleAccessToken": googleAccessToken, "uuid": ""}
    const headers = {"googleId": googleId, "googleAccessToken": googleAccessToken};
    const endpoint = process.env.REACT_APP_LOGIN;

    axios.post(endpoint, loginParams, {headers})
      .then(response => {
        console.log(response.data);

        if (Object.entries(response.data).length === 0) {
          sessionStorage.setItem('authenticatedRole', "NEED UUID");
          this.setState({ authenticatedRole: "NEED UUID" });
        }
        const authenticatedRoleDB = Object.keys(response.data)[0];
        const usernameDB = Object.values(response.data)[0].name;
        const databaseId = Object.values(response.data)[0].id;

        sessionStorage.setItem('authenticatedRole', authenticatedRoleDB);
        sessionStorage.setItem('username', usernameDB);
        sessionStorage.setItem('databaseId', databaseId);

        this.setState({
          authenticatedRole: authenticatedRoleDB,
          googleId: googleId,
          username: usernameDB,
          databaseId: databaseId      
        })

        this.greetToast(usernameDB);
        
      })
      .catch(error => {
        if (sessionStorage.getItem('authenticatedRole') !== "NEED UUID") {
          toast.error(`LOGIN ERROR! ${error.message}`);
        }
      });
  }

  greetToast = (usernameDB) => {
    const hourNow = (new Date()).getHours();
    let greetingBasedOnHour;
    if (hourNow < 12) {
      greetingBasedOnHour = "Good morning";
    } else if (hourNow < 17) {
      greetingBasedOnHour = "Good afternoon";
    } else {
      greetingBasedOnHour = "Good evening";
    }
    
    toast.success(`${greetingBasedOnHour}, ${usernameDB} 😄`);
  }

  logout = () => {
    this.setState({
      authenticatedRole: "",  
      googleId: "",
      username: "",
      databaseId: ""
    })
    toast.success(`Goodbye ${sessionStorage.getItem('username')} 👋`);

    sessionStorage.clear();
  }

  render() {
    const role = this.state.authenticatedRole;
    const username = this.state.username;
    const googleId = this.state.googleId;
    const databaseId = this.state.databaseId;

    return (
      
      <Router>
        <LoginBanner authenticatedRole={this.state.authenticatedRole} googleAuthCallback={this.login} logoutCallback={this.logout}/>
        
        {role === "ADMIN" ? (<Redirect to="/adminDash" component={() => <EmployeeDash authenticatedRole={role} username={username} googleId={googleId} databaseId={databaseId}/>} />): null}
        {role === "EMPLOYEE" ? (<Redirect to="/employeeDash" component={() => <EmployeeDash authenticatedRole={role} username={username} googleId={googleId} databaseId={databaseId}/>} />): null}
  
          <Switch>   
            {/* Displays only 1 of these components based on on what the URL is */}
            <Route path="/" exact component={Homepage}/>    
            <Route path="/adminDash" component={() => <AdminDash authenticatedRole={role} username={username} googleId={googleId} databaseId={databaseId}/>} />
            <Route path="/employeeDash" exact component={() => <EmployeeDash authenticatedRole={role} username={username} googleId={googleId} databaseId={databaseId}/>} />
            
            {/* This route is for users coming from the link admin texted them, so they can take a specific avail shift */}
            <Route path="/text/:uuid"  component={LinkTextedToEmployee} />

          </Switch>

          <Footer />
          <ToastContainer />
      </Router>
  );
  }
}


export default App;
