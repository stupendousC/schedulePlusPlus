import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import bannerLogo from './images/SPPbanner2.png';
import GoogleLogin from 'react-google-login';

import {Link} from 'react-router-dom';

class LoginBanner extends React.Component {
  
  ////////////////////// LOGIN //////////////////////
  responseGoogle = (response) => {
    // send info up to App.js     
    this.props.googleAuthCB(response.profileObj.googleId);
  }

  showBothLogins = () => {
    return (
      <section className="btn btn-google">
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="LOGIN WITH GOOGLE"
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
          Hello {sessionStorage.getItem("username")}
          <button className="btn btn-success"><Link to="/adminDash">ADMIN Dashboard</Link></button>
          <button className="btn btn-danger" onClick={this.logout}><Link to="/">LOGOUT</Link></button>
        </section>
      );
    } else if (authenticatedRole === "EMPLOYEE") {
      return (
        <section>
          Hello {sessionStorage.getItem("username")}
          <button className="btn btn-success"><Link to="/employeeDash">EMPLOYEE Dashboard</Link></button>
          <button className="btn btn-danger" onClick={this.logout}><Link to="/">LOGOUT</Link></button>
        </section>
      );
    } else {
      return (
        <section>
          <button className="btn btn-warning">First time logging in?  Click to activate account with UUID (upcoming feature)</button>
          <button className="btn btn-danger" onClick={this.logout}><Link to="/">LOGOUT</Link></button>
        </section>
      );
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
      <section className="loginBanner-section">
        <Link to="/"><img src={bannerLogo} alt="sppBannerLogo" className="img-90"/></Link>
        {this.props.authenticatedRole? this.showDashWithLogout():this.showBothLogins()}
      </section>
    );
  }
    
}

export default LoginBanner;
