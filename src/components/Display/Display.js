import React from 'react';
import  './Display.css';

const display = (props) => {

    return <p className="Display" onChange={props.inputHandler}>{props.input}</p>;
};  

export default display;
