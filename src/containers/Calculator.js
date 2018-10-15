import React, { Component } from "react";
import Display from "../components/Display/Display";
import NumberPad from "../components/NumberPad/NumberPad";

class Calculator extends Component {
  state = {
    input: "",
    result: null,
    currentOperator: "",
    lengthForScaling: 0
  };

  inputTextChanger = e => {
    let newInput = parseFloat(e.target.value);
    this.setState({ input: newInput });
  };

  //Handling NUMBERS
  numbersHandler = e => {
    let submit = e.target.value;
    let input = this.state.input;
    let increaseLength = this.state.lengthForScaling;

    //Checking multiple dots entered
    if (input.length > 12) {
      submit = input;
    } else {
      submit = input + submit;
      increaseLength++;
    }

    this.setState({ input: submit, lengthForScaling: increaseLength });
  };

  //Main
  operationHandler = operation => {
    let input = this.state.input;
    let result = this.state.result;
    let operator = this.state.currentOperator;
    let lengthForScaling = this.state.lengthForScaling;

    console.log(operation, operator);
    if ((input && result) || operation === "=") {
      result = this.calculateResult(input, result, operator);
      input = "";
      operator = "";
    } else if (!result) {
      result = input;
      input = "";
    }
    if (operation !== "=") {
      operator = operation;
    }
    console.log(operation, operator);

    this.setState({
      input,
      result: result,
      currentOperator: operator,
      lengthForScaling: lengthForScaling
    });
  };

  //calculating result
  calculateResult = (input, result, operation) => {
    input = parseFloat(input);
    result = parseFloat(result);
    //Add
    if (operation === "+") {
      result += input;
    }

    //Subtract
    if (operation === "-") {
      result -= input;
    }
    //Multiplication
    if (operation === "x") {
      result *= input;
    }

    //Divide
    if (operation === "/") {
      result /= input;
    }
    return result;
  };

  //SPECIAL FUNCTIONS
  specialFunctions = operation => {
    let result, input, currentOperator;
    //Changing sign
    if (operation === "+/-") {
      console.log("+/-");
    }

    //Percent
    else if (operation === "%") {
      console.log("%");
    }
    //Clearing all
    else if (operation === "AC") {
      result = "";
      input = "";
      currentOperator = "";
    }

    this.setState({ input, result, currentOperator });
  };

  //Equal handling
  equalHandler = () => {
    console.log("equal");
    this.operationHandler("=");
  };

  //Dot handling
  dotAdder = () => {
    console.log("dot");
  };

  render() {
    return (
      <React.Fragment>
        <Display
          inputHandler={this.inputTextChanger}
          currentNumber={this.state.input}
          showCurrentOperator={this.state.currentOperator}
          result={this.state.result}
          scalingLength={this.state.lengthForScaling}
        />
        <NumberPad
          numbersHandler={this.numbersHandler}
          operation={this.operationHandler}
          specialFunctions={this.specialFunctions}
          equal={this.equalHandler}
          dotAdder={this.dotAdder}
        />
      </React.Fragment>
    );
  }
}

export default Calculator;
