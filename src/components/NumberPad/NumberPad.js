import React from "react";
import "./NumberPad.css";

const keyArray = [
  { value: "AC" },
  { value: "+/-" },
  { value: "%" },
  { value: "/" },
  { value: "7" },
  { value: "8" },
  { value: "9" },
  { value: "*" },
  { value: "4" },
  { value: "5" },
  { value: "6" },
  { value: "-" },
  { value: "1" },
  { value: "2" },
  { value: "3" },
  { value: "+" },
  { value: "0" },
  { value: "." },
  { value: "=" }
];

const numberPad = props => {
 
  const mappedNumberPad = keyArray.map(btn => {
    let typeCheck=props.buttonSubmit;
    if (isNaN(btn.value)) {
        typeCheck=(()=>props.operation(btn.value));
        
    }
    return (
      <button
        key={btn.value}
        className="Button"
        type="submit"
        value={btn.value}
        onClick={typeCheck}
      >
        {btn.value}
      </button>
    );
  });

  return <React.Fragment>{mappedNumberPad}</React.Fragment>;
};

export default numberPad;
