import React from 'react';
import redCrossFlag from '../images/redCrossFlag.svg';
import logo from '../images/SPPicon.png';

export default function Homepage() {

  return (
    <section className="blue-bg">
      <h6>Wow I bet you're impressed by this app, and wants to know who made it, huh?</h6>
      <img src={redCrossFlag} alt="redCrossFlag" className="img-5"/>
      <a href="https://github.com/stupendousC" target="_blank">Hey everybody, look at me!</a>
      <img src={redCrossFlag} alt="redCrossFlag" className="img-5"/>
    </section>
  );
}