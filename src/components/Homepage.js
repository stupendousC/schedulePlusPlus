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

/// NOoooooo!!! cuz they wont' be able to see actual homepage at all!!! thsi just replaces homepage w/ their dash
// const showCorrectStarterPage = () => {
//   if (sessionRole === "ADMIN") {
//     console.log("going straight to ADMIN dash ");
//     return (<section>ADMIN DASH HERE OK</section>);

//   } else if (sessionRole === "EMPLOYEE") {
//     console.log("going straight to EMPLOYEE dash ");
//     return (<section>EMP DASH HERE OK</section>);

//   } else {
//     return (
//       <section className="homepage-section text-centered">
//         <img src={twoPeople} alt="2 people" className="homepage-logo"/>
//       </section>
//     );
//   }
// }
