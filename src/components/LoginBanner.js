import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import bannerLogo from '../images/SPPbanner2.png';
import GoogleLogin from 'react-google-login';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { makeHeader } from './Helpers';

const LoginBanner = ({authenticatedRole, googleAuthCallback, logoutCallback}) => {

  const [uuid, setUuid] = useState("");

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  ////////////////////// LOGIN //////////////////////
  const responseGoogle = (response) => {
    // send info up to App.js     
    const googleId = response.profileObj.googleId;
    const googleAccessToken = response.Zi.access_token;
    
    sessionStorage.setItem('googleId', googleId);
    sessionStorage.setItem('googleAccessToken', googleAccessToken);

    googleAuthCallback();
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
  
  const updateUuid = (e) => {
    setUuid(e.target.value);
  }

  const sendUuidApi = (e) => {
    e.preventDefault();
    handleCloseModal();

    const googleId = sessionStorage.getItem('googleId');
    const loginParams = { "googleId": googleId, "uuid": uuid };
    const URL_endpoint = process.env.REACT_APP_LOGIN + `/firstTime`;

    const headers = makeHeader();
    axios.post(URL_endpoint, loginParams, {headers})
    .then(response => {
      const roleDB = Object.keys(response.data)[0];

      if (roleDB === "ADMIN" || roleDB === "EMPLOYEE") {
        // uuid does match someone in the database, now invoke googleAuthCallback back up to App.js to save info & re-render/re-direct
        googleAuthCallback();
      } else {
        toast.error("Invalid uuid verification code, please double check and try again");
      }
    })
    .catch(error => toast.error(error.message));
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
          <button className="btn btn-warning dashboard-buttons" onClick={handleShowModal}>First time logging in?  Click to activate account!</button>
          <button className="btn btn-danger dashboard-buttons" onClick={logoutCallback}><Link to="/">LOGOUT</Link></button>
        </section>
      );
    }
  }


////////////////////// RENDER //////////////////////
  return(
    <section>
      <section className="loginBanner-section text-centered">
        <Link to="/"><img src={bannerLogo} alt="sppBannerLogo" className="img-90"/></Link>
        {authenticatedRole? showDashWithLogout():showGoogleLogin()}
      </section>


      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome to Schedule Plus Plus!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Please copy and paste your unique verification id (uuid), including the dashes.
          <form>
            <input type="text" className="form-control margin-top-1rem" onChange={updateUuid} placeholder={"Example: 12345678-abcd-abcd-abcd-1234abcd1234"}/>
            <section className="centered-children-per-row_container">
              <button className="btn btn-primary margin-top-1rem" onClick={sendUuidApi}>Log in!</button>
            </section>
          </form>
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default LoginBanner;

LoginBanner.propTypes = {
  authenticatedRole: PropTypes.string,
  googleAuthCallback: PropTypes.func.isRequired,
  logoutCallback: PropTypes.func.isRequired,
};