import React from 'react';
import alarmClock from '../images/alarmClock.svg';

export default function LoginError(props) {

  return (
    <section>
      <h1 className="text-centered">{props.message}</h1>
      <img src={alarmClock} alt="alarm clock" className="homepage-logo"/>
    </section>
  );
}