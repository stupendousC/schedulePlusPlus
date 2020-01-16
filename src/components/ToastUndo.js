import React from 'react';

// To use this component... see instructions below
const ToastUndo = ({ undo, closeToast, message }) => {

  const handleClick = () => {
    undo();
    closeToast();
  }
 
  return (
    <h3>
      {message} 
      <button onClick={handleClick} className="btn btn-primary">UNDO</button>
    </h3>
  );
}

export default ToastUndo;





///////////// INSTRUCTIONS /////////////
// to use... 
//   ToastUndo(<ToastUndo undo={LOCAL_UNDO_FCN} />, { onClose: LOCAL_CLOSING_FCN});
// required... 
//   LOCAL_CLOSING_FCN <- will run whether u click undo or not 
//   LOCAL_UNDO_FCN <- will run only if u click undo button
// see this in action in AdminDash_PeopleTable.js