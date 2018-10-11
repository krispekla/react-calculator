import React from "react";
import "./Display.css";

const display = props => {
    let firstNumber = props.lastEntered ? props.lastEntered : null;
  return (
    <p className="Display" onChange={props.inputHandler}>
     {firstNumber} {props.operator} {props.currentNumber}
    </p>
  );
};

export default display;
