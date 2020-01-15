import React from 'react';
import blackLock from '../images/blackLock.svg';

export default function ErrorLogin(props) {

  return (
    <section>
      <h1 className="text-centered">{props.message}</h1>
      <img src={blackLock} alt="blackLock" className="homepage-logo"/>
    </section>
  );
}