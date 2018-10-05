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
  { value: "x" },
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
    let typeCheck = () => props.operation(btn.value);
    
    let padStyle= "Button";
    if (!isNaN(btn.value) || btn.value === ".") {
      typeCheck = props.buttonSubmit;
    }
    else if (btn.value==='AC' || btn.value==='+/-' || btn.value==='%') {
      padStyle += " ButtonGrey";      
    }
    else {
      padStyle += " ButtonOrange";
    }

    if (btn.value==='0') {
      padStyle += " Zero";
    }
   
    return (
      <button
        key={btn.value}
        className={padStyle}
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
