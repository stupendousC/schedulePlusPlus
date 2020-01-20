import React from 'react';
import PropTypes from 'prop-types';
import alarmClock from '../images/alarmClock.svg';
import stopwatch from '../images/stopwatch.svg';
import warning from '../images/warning.svg';
import questionBubble from '../images/questionBubble.svg';
import lock from '../images/comboLock.svg';

export default function ErrorGeneral({ icon, message }) {

  const showSpecificIcon = () => {
    if (icon === "alarm") {
      return <img src={alarmClock} alt="alarm clock" className="homepage-logo"/>;
    } else if (icon === "stopwatch") {
      return <img src={stopwatch} alt="stopwatch" className="homepage-logo"/>
    } else if (icon === "warning") {
      return <img src={warning} alt="warning sign" className="homepage-logo"/>
    } else if (icon === "lock") {
      return <img src={lock} alt="lock" className="homepage-logo"/>
    } else {
      return <img src={questionBubble} alt="man with question bubble above head" className="homepage-logo"/>
    }
  }
  
  return (
    <section className="margin-all-1rem">
      <h1 className="text-centered margin-all-1rem">{message}</h1>
      {showSpecificIcon()}
    </section>
  );
}

ErrorGeneral.propTypes = {
  icon: PropTypes.string,
  message: PropTypes.string,
};