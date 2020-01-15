import React from 'react';
import lock from '../images/comboLock.svg';

export default function ErrorLogin(props) {

  return (
    <section>
      <h1 className="text-centered">{props.message}</h1>
      <img src={lock} alt="a lock" className="homepage-logo"/>
    </section>
  );
}