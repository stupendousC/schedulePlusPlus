import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import bannerLogo from '../images/SPPbanner2.png';
import GoogleLogin from 'react-google-login';

import {Link} from 'react-router-dom';

const LoginBanner = ({authenticatedRole, googleAuthCallback, logoutCallback}) => {

  ////////////////////// LOGIN //////////////////////
  const responseGoogle = (response) => {
    // send info up to App.js     
    googleAuthCallback(response.profileObj.googleId);
  }

  const showGoogleLogin = () => {
    return (
      <section className="btn btn-google">
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </section>
    );
  }

  ////////////////////// DASHBOARD BUTTONS //////////////////////
  const showDashWithLogout = () => {
    const name = sessionStorage.getItem("username");

    if (authenticatedRole === "ADMIN") {
      return (
        <section className="dashboard-buttons_container">
          <button className="btn btn-success dashboard-buttons"><Link to="/adminDash">{name}'s Dashboard</Link></button>
          <button className="btn btn-danger dashboard-buttons" onClick={logoutCallback}><Link to="/">LOGOUT</Link></button>
        </section>
      );
    } else if (authenticatedRole === "EMPLOYEE") {
      return (
        <section className="dashboard-buttons_container">
          <button className="btn btn-success dashboard-buttons"><Link to="/employeeDash">{name}'s Dashboard</Link></button>
          <button className="btn btn-danger dashboard-buttons" onClick={logoutCallback}><Link to="/">LOGOUT</Link></button>
        </section>
      );
    } else {
      return (
        <section className="dashboard-buttons_container">
          <button className="btn btn-warning dashboard-buttons">First time logging in?  Click to activate account with UUID (upcoming feature)</button>
          <button className="btn btn-danger dashboard-buttons" onClick={logoutCallback}><Link to="/">LOGOUT</Link></button>
        </section>
      );
    }
  }


////////////////////// RENDER //////////////////////
  const currUrl = window.location.href;


  return(
    <section className="loginBanner-section text-centered">
      <Link to="/"><img src={bannerLogo} alt="sppBannerLogo" className="img-90"/></Link>
      {authenticatedRole? showDashWithLogout():showGoogleLogin()}
    </section>
  );
  
    
}

export default LoginBanner;
