import React from 'react';
import './BuildControl.css';

const buildControl = (props) => {
  return (
    <div className="BuildControl">
      <div className="Label">{props.label}</div>

      <button
        className="Less"
        type="button"
        disabled={props.disabled}
        onClick={props.removeIngredient}
      >
        Less
      </button>

      <button
        className="More"
        type="button"
        onClick={props.addIngredient}
      >
        More
      </button>
    </div>
  );
};

export default buildControl;
