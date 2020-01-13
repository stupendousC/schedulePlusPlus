import React from 'react';
import redCrossFlag from '../images/redCrossFlag.svg';
// import logo from '../images/SPPicon.png';

export default function Homepage() {

  return (
    <section className="footer">
      <img src={redCrossFlag} alt="redCrossFlag" className="img-5"/>
      <a href="https://github.com/stupendousC" target="_blank" rel="noopener noreferrer">Hey everybody, look at me!</a>
      <img src={redCrossFlag} alt="redCrossFlag" className="img-5"/>
    </section>
  );
}