import React from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginBanner from './LoginBanner';
import Footer from './components/Footer';
import AdminDash from './components/AdminDash';
import EmployeeDash from './components/EmployeeDash';

import LinkTextedToEmployee from './components/Employee_TextedLink';

import {} from './components/Helpers';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Homepage from './components/Homepage';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      authenticatedRole: "",       // TEMPORARY
      googleId: "",
      username: "",// TEMPORARY
      databaseId: ""
    }
    sessionStorage.setItem('authenticatedRole', '');   // TEMPORARY
    sessionStorage.setItem('googleId', '');
    sessionStorage.setItem('username', '');    // TEMPORARY
    sessionStorage.setItem('databaseId', '');
  }

  login = (googleId) => {
    const endpoint = process.env.REACT_APP_LOGIN + "/" + googleId;

    axios.get(endpoint)
      .then(response => {
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

        // CAN WE REDIRECT HERE TO REL DASHBOARD???!!!
        if (authenticatedRoleDB === "ADMIN") {
          console.log("AUTO REDIRECT TO admin dash plz!");
          // <Redirect to="/adminDash" component={() => <EmployeeDash authenticatedRole={authenticatedRoleDB} username={usernameDB} googleId={googleId} databaseId={databaseId}/>} />;
        } else if (authenticatedRoleDB === "EMPLOYEE") {
          console.log("AUTO REDIRECT TO employee dash plz!");
          // <Redirect to="/employeeDash" component={() => <EmployeeDash authenticatedRole={authenticatedRoleDB} username={usernameDB} googleId={googleId} databaseId={databaseId}/>} />;

        }
      })
      .catch(error => console.log("LOGIN ERROR!", error.message));
  }

  logout = () => {
    console.log("LOG OUT! send toaster pop up!");
    this.setState({
      authenticatedRole: "",  
      googleId: "",
      username: "",
      databaseId: ""
    })
    sessionStorage.clear();
  }

  render() {
    const role = this.state.authenticatedRole;
    const username = this.state.username;
    const googleId = this.state.googleId;
    const databaseId = this.state.databaseId;

    return (
      
      <Router>
          <LoginBanner authenticatedRole={this.state.authenticatedRole} googleAuthCB={this.login} logoutCB={this.logout}/>
          
          

          <Switch>   
            {/* Displays only 1 of these components based on on what the URL is */}
            <Route path="/" exact component={Homepage}/>    
            <Route path="/adminDash" component={() => <AdminDash authenticatedRole={role} username={username} googleId={googleId} databaseId={databaseId}/>} />
            <Route path="/employeeDash" component={() => <EmployeeDash authenticatedRole={role} username={username} googleId={googleId} databaseId={databaseId}/>} />
            <Route path="/employeeDash/:id/text/:shiftId" component={LinkTextedToEmployee} />
          </Switch>

          <Footer />
      </Router>
  );
  }
}


export default App;
