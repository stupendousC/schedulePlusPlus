import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import bannerLogo from './SPPbanner.png';
import GoogleLogin from 'react-google-login';

import {Link} from 'react-router-dom';

class LoginBanner extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedInPerson: ""    // TODO: sub in Admin/Employee obj
    }
  }
  
  ////////////////////// LOGIN //////////////////////
  responseGoogle = (response) => {
    console.log(response.profileObj);

    // send info up to App.js     
    this.props.googleAuthCB(response.profileObj.googleId);
    
  }


  showBothLogins = () => {
    return (
      <section className="giant-in-middle">
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="LOGIN"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </section>
    );
  }


  ////////////////////// DASHBOARD BUTTONS //////////////////////
  showDashWithLogout = () => {
    const authenticatedRole = this.props.authenticatedRole;
    if (authenticatedRole === "ADMIN") {
      return (
        <section>
          <button className="btn btn-warning"><Link to="/adminDash">ADMIN Dashboard</Link></button>
          <button onClick={this.logout}><Link to="/">LOGOUT</Link></button>
        </section>
      );
    } else if (authenticatedRole === "EMPLOYEE") {
      return (
        <section>
          <button className="btn btn-warning"><Link to="/employeeDash">EMPLOYEE Dashboard</Link></button>
          <button onClick={this.logout}><Link to="/">LOGOUT</Link></button>
        </section>
      );
    } else {
      console.log("error, who are you?");
    }
  }


  
  ////////////////////// LOGOUT //////////////////////
  logout = () => {
    console.log("TODO: ALERT, you've successfully logged out")
    this.props.logoutCB();
  }

////////////////////// RENDER //////////////////////
  render() {

    return(
      <section>
        <Link to="/"><img src={bannerLogo} alt="sppBannerLogo" /></Link>
        {this.props.authenticatedRole? this.showDashWithLogout():this.showBothLogins()}
      </section>
    );
  }
    
}

export default LoginBanner;
