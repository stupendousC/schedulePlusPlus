import React from 'react';
import alarmClock from '../images/alarmClock.svg';
import stopwatch from '../images/stopwatch.svg';
import warning from '../images/warning.svg';
import questionBubble from '../images/questionBubble.svg';

export default function ErrorGeneral(props) {

  const showSpecificIcon = () => {
    if (props.icon === "alarm") {
      return <img src={alarmClock} alt="alarm clock" className="homepage-logo"/>;
    } else if (props.icon === "stopwatch") {
      return <img src={stopwatch} alt="stopwatch" className="homepage-logo"/>
    } else if (props.icon === "warning") {
      return <img src={warning} alt="warning sign" className="homepage-logo"/>
    } else {
      return <img src={questionBubble} alt="man with question bubble above head" className="homepage-logo"/>
    }
  }
  
  return (
    <section>
      <h1 className="text-centered">{props.message}</h1>
      {showSpecificIcon()}
    </section>
  );
}