import React from "react";
import "./Display.css";

const display = props => {
  let DisplayNumbers = "Display";
  if (props.scalingLength > 11) {
    DisplayNumbers += " DecreaseFont";
  }
  return (
    <p className={DisplayNumbers} onChange={props.inputHandler}>
      {props.result} , {props.showCurrentOperator},{props.currentNumber}
    </p>
  );
};

export default display;
