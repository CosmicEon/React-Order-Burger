import React from 'react';
import './Input.css';

const input = (props) => {
  let inputElement = null;
  const inputClasses = ['InputElement'];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push('Invalid');
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changeEvent}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changeEvent}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changeEvent}
        >
          {props.elementConfig.options.map(option => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className="InputElement"
          {...props.elementConfig}
          value={props.value}
          onChange={props.changeEvent}
        />
      );
      break;
  }

  let validationError = null;
  if (props.invalid && props.touched) {
    validationError = (
      <p className="ValidationError">
        Please enter a valid {props.elementType}!
      </p>
    );
  }

  return (
    <div className="Input">
      <label className="Label">{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  )
};

export default input;
