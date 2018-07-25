import React from 'react';
import './Button.css';

const button = props => (
  <button
    type="button"
    className={['Button', props.buttonType].join(' ')}
    disabled={props.disabled}
    onClick={props.clickEvent}
  >
    {props.children}
  </button>
);


export default button;
