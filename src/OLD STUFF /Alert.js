import React from 'react';
import Alert from 'react-bootstrap/Alert';

export default function AlertComp(props) {

  return (
    <Alert variant={props.variant || "primary" }>
      <Alert.Heading>{props.title}</Alert.Heading>
      <p>
        {props.body}
      </p>
    </Alert>
  );
}