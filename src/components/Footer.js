import React from 'react';
import redCrossFlag from '../images/redCrossFlag.svg';

export default function Homepage() {

  return (
    <section className="footer">
      <img src={redCrossFlag} alt="redCrossFlag" className="img-5"/>
      <a href="https://github.com/stupendousC" target="_blank" rel="noopener noreferrer"> Made by: Caroline Wu </a>
      <img src={redCrossFlag} alt="redCrossFlag" className="img-5"/>
      <p className="fine-print">All icons from www.freeicons.io</p>
    </section>
  );
}