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
    let result = this.state.result;
    //Checking multiple dots entered
    if (input.length > 12) {
      submit = input;
    } else if (!this.state.currentOperator && result && !input) {
      result = "";
    } else {
      submit = input + submit;
      increaseLength++;
    }

    this.setState({ input: submit, result, lengthForScaling: increaseLength });
  };

  //Main
  operationHandler = operation => {
    let input = this.state.input;
    let result = this.state.result;
    let operator = this.state.currentOperator;
    let lengthForScaling = this.state.lengthForScaling;

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
    result = "" + result;

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

    if (result % 1 !== 0) {
      result = result.toFixed(2);
    }

    return result;
  };

  //SPECIAL FUNCTIONS
  specialFunctions = operation => {
    let { result, input, currentOperator } = this.state;
    //Changing sign
    if (operation === "+/-") {
      let temp = input;
      if (result) {
        temp = result;
      }

      if (temp[0] !== "-") {
        temp = "-" + temp;
      } else {
        temp = temp.slice(1);
      }

      if (!result) {
        input = temp;
      } else {
        result = temp;
      }
    }

    //Percent
    else if (operation === "%") {
      let temp = input;
      if (result) {
        temp = result;
      }
      temp *= 0.01;
      temp = "" + temp;

      if (!result) {
        input = temp;
      } else {
        result = temp;
      }
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
    if (!this.state.currentOperator) {
    } else if (this.state.input) {
      this.operationHandler("=");
    }
  };

  //Dot handling
  dotAdder = () => {
    let { input } = this.state;
    if (!input.includes(".")) {
      input = input + ".";
    }

    this.setState({ input });
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
