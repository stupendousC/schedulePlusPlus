import React from 'react';
import twoPeople from '../images/twopeople.svg';

export default function Homepage() {
  const sessionRole = sessionStorage.getItem('authenticatedRole');
  console.log("sessionRole = ", sessionRole);

  return (
    <section className="homepage-section text-centered">
      <img src={twoPeople} alt="2 people" className="homepage-logo"/>
    </section>
  );
}
