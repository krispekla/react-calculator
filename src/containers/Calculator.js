import React, { Component } from "react";
import Display from "../components/Display/Display";
import NumberPad from "../components/NumberPad/NumberPad";

class Calculator extends Component {
  state = {
    input: "",
    accumulator: 0,
    result: 0,
    history: [],
    currentOperator: []
  };

  inputTextChanger = e => {
    let newInput = parseFloat(e.target.value);

    this.setState({ input: newInput });
  };
  //reset result
  resetInput = () => {
    const input = "";
    this.setState({ input });
  };

  //Clear all
  clearAll = () => {
    this.setState({
      input: "",
      accumulator: 0,
      result: 0,
      currentOperator: []
    });
  };

  operationHandler = operation => {
    let input = parseFloat(this.state.input);
    let result = this.state.accumulator;

    //Pushing history
    const updateHistory = [...this.state.history];
    updateHistory.push(input);
    updateHistory.push(operation);

    //Pushing operator
    let operatorArray = [...this.state.currentOperator];
    operatorArray.push(operation);

    if (operatorArray.length === 2) {
      //Add
      if (operatorArray[0] === "+") {
        result += input;
      }

      //Subtract
      if (operatorArray[0] === "-") {
        result -= input;
      }
      //Multiplication
      if (operatorArray[0] === "*") {
        result *= input;
      }

      //Divide
      if (operatorArray[0] === "/") {
        result /= input;
      }

      operatorArray.shift();

      if (operation === "=") {
        operatorArray.shift();
        operation = result;
      }
    }

    this.resetInput();
    this.setState({
      input: operation,
      currentOperator: operatorArray,
      accumulator: input,
      result,
      history: updateHistory
    });
    if (operation === "+/-") {
      if (input > 0) {
        input = "-" + input;
      } else {
        input = toString(input);
        input = input.substring(1, input.length);
      }

      input = parseFloat(input);
      operatorArray.shift();
      result = input;
      this.setState({ input: result, result, currentOperator: operatorArray });
    }
    if (operation === "%") {
      result = 0;
      result = input / 100;

      operatorArray.shift();
      this.setState({ input: result, result, currentOperator: operatorArray });
    }
    if (operation === "AC") {
      this.clearAll();
    }
  };

  buttonSubmitHandler = e => {
    let submit = e.target.value;
    let input = this.state.input;
    if (isNaN(input)) {
      input = "";
    }

    submit = input + submit;
    this.setState({ input: submit });
  };

  render() {
    return (
      <React.Fragment>
        <Display
          inputHandler={this.inputTextChanger}
          input={this.state.input}
        />
        <NumberPad
          buttonSubmit={this.buttonSubmitHandler}
          operation={this.operationHandler}
        />
      </React.Fragment>
    );
  }
}

export default Calculator;
