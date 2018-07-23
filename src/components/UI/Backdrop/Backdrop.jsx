import React from 'react';
import './Backdrop.css';

const backdrop = ({ show, closeBackdrop }) => {
  return (
    show
      ? <div className="Backdrop" onClick={closeBackdrop} />
      : null
  );
};

export default backdrop;
