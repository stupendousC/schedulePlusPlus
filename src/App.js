import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginBanner from './LoginBanner';
import AdminDash from './components/AdminDash';
import EmployeeDash from './components/EmployeeDash';
import GoogleLogin from 'react-google-login';

import { BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import Homepage from './components/Homepage';

class App extends React.Component {

  responseGoogle = (response) => {
    console.log(response);
  }


  render() {
    return (
      <Router>
          <LoginBanner />


          <GoogleLogin
    clientId="10529880190-r19j0h35rit1kcoki6dnk9itkhpkqs9e.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
    cookiePolicy={'single_host_origin'}
  />

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
