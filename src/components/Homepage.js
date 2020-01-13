import React from 'react';
import twoPeople from '../images/twopeople.svg';

export default function Homepage() {

  return (
    <section className="homepage-section">
      <img src={twoPeople} alt="2 people" className="img-90"/>
    </section>
  );
}