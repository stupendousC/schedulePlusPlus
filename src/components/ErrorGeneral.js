import React from 'react';
import alarmClock from '../images/alarmClock.svg';
import warning from '../images/warning.svg';

export default function ErrorGeneral(props) {

  const showSpecificIcon = () => {
    if (props.icon === "alarm") {
      return <img src={alarmClock} alt="alarm clock" className="homepage-logo"/>;
    } else {
    return <img src={warning} alt="warning sign" className="homepage-logo"/>
    }
  }
  

  return (
    <section>
      <h1 className="text-centered">{props.message}</h1>
      {showSpecificIcon()}
    </section>
  );
}