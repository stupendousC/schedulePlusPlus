import React from 'react';

const ToastUndo = ({ id, undo, closeToast }) => {
  
  const handleClick = () => {
    undo(id);
    closeToast();
  }
 
  return (
    <div>
      <h3>
        Row Deleted <button onClick={handleClick}>UNDO</button>
      </h3>
    </div>
  );
}

export default ToastUndo;