import React from "react";
import "./Display.css";

const display = props => {
    let firstNumber = props.lastEntered ? props.lastEntered : null;
    let DisplayNumbers = 'Display';
    if (props.scalingLength>11) {
      DisplayNumbers += ' DecreaseFont';
    }
  return (
    <p className={DisplayNumbers} onChange={props.inputHandler}>
     {firstNumber} {props.operator} {props.currentNumber}
    </p>
  );
};

export default display;
