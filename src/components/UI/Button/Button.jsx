import React from 'react';
import './Button.css';

const button = (props) => {
  return (
    <button
      className={['Button', props.buttonType].join(' ')}
      onClick={props.clickEvent}
    >{props.children}</button>
  );
}

export default button;
