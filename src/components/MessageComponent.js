import React from 'react';
import hourglass from '../images/hourglass.svg';
import thumbsUp from '../images/thumbsUp.svg';
import twoPeopleInteract from '../images/twopeopleinteract.svg';

export default function MessageComponent(props) {

  const showSpecificIcon = () => {
    if (props.icon === "hourglass") {
      return <img src={hourglass} alt="hourglass" className="homepage-logo"/>
    } else if (props.icon === "thumbsUp") {
      return <img src={thumbsUp} alt="thumbs up" className="homepage-logo"/>
    } else {
      return <img src={twoPeopleInteract} alt="2 people interacting" className="homepage-logo"/>
    }
  }

  return (
    <section>
      <h1 className="text-centered">{props.message}</h1>
      {showSpecificIcon()}
    </section>
  );
}