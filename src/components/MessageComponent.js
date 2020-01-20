import React from 'react';
import PropTypes from 'prop-types';
import hourglass from '../images/hourglass.svg';
import thumbsUp from '../images/thumbsUp.svg';
import twoPeopleInteract from '../images/twopeopleinteract.svg';

function MessageComponent({ icon, message }) {

  const showSpecificIcon = () => {
    if (icon === "hourglass") {
      return <img src={hourglass} alt="hourglass" className="homepage-logo"/>
    } else if (icon === "thumbsUp") {
      return <img src={thumbsUp} alt="thumbs up" className="homepage-logo"/>
    } else {
      return <img src={twoPeopleInteract} alt="2 people interacting" className="homepage-logo"/>
    }
  }

  return (
    <section>
      <h1 className="text-centered">{message}</h1>
      {showSpecificIcon()}
    </section>
  );
}

export default MessageComponent;

MessageComponent.propTypes = {
  icon: PropTypes.string,
};