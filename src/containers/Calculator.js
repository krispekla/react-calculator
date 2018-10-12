import React, { Component } from "react";
import Display from "../components/Display/Display";
import NumberPad from "../components/NumberPad/NumberPad";

class Calculator extends Component {
  state = {
    input: "",
    accumulator: 0,
    result: 0,
    currentOperator: [],
    lastWasOperand:false,
    displayFirst: true,
    equalWasLast: false
  };

  inputTextChanger = e => {
    let newInput = parseFloat(e.target.value);
    this.setState({ input: newInput });
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

  //calculating result
  calculateResult = (input, result, operatorArray) => {
    //Add
    if (operatorArray[0] === "+") {
      result += input;
      input = result;
    }

    //Subtract
    if (operatorArray[0] === "-") {
      result -= input;
      input = result;
    }
    //Multiplication
    if (operatorArray[0] === "x") {
      result *= input;
      input = result;
    }

    //Divide
    if (operatorArray[0] === "/") {
      result /= input;
      input = result;
    }
    return result;
  };

  //SPECIAL FUNCTIONS
  specialFunctions = (
    operation,
    input,
    operatorArray,
    result,
    accumulator,
    displayFirst
  ) => {
    //Changing sign
    if (operation === "+/-") {
      if (this.state.equalWasLast) {
        input = this.state.result;
      } else {
        input = this.state.input;
      }

      if (input > 0) {
        input = "-" + input;
      } else {
        input = "" + input;
        input = input.slice(1);
      }

      input = parseFloat(input);
      operatorArray.shift();
      result = input;
      accumulator = result;
      displayFirst = false;
    }

    //Percent
    if (operation === "%") {
      result = result / 100;

      operatorArray.shift();
      input = result;
      accumulator = result;
      displayFirst = false;
    }

    const returningVariables = {
      input,
      accumulator,
      result,
      operatorArray,
      displayFirst
    };

    return returningVariables;
  };

  //MAIN handling for OPERATIONS
  operationHandler = operation => {
    let result = this.state.accumulator;
    let input = parseFloat(this.state.input);
    let accumulator = result;
    let operatorArray = [...this.state.currentOperator];
    let displayFirst = this.state.displayFirst;
    let equalWasLast = false;
    let lastWasOperand = this.state.lastWasOperand;
    //Pushing operator
    operatorArray.push(operation);

  
    //Handling operations when there is enough saved in array
    if (operatorArray.length === 2) {
      result = this.calculateResult(input, result, operatorArray);

      operatorArray.shift();
      if (result % 1 !== 0 && result % 1 < 100) {
        result = parseFloat(result).toFixed(2);
      }

      if (this.state.equalWasLast) {
        accumulator = 0;
      }

      if (operation === "=") {
        if (this.state.input === "") {
          input=result;
          result=accumulator;
          operation=operatorArray[0];
        } else {
          input = result;
          operation = result;
          operatorArray.shift();
          displayFirst = true;
          equalWasLast = true;
        }
      }
    } else if (!result) {
      result = input;
    }

    input = "";
    accumulator = result;

    const values = this.specialFunctions(
      operation,
      input,
      operatorArray,
      result,
      accumulator,
      displayFirst
    );

    this.setState({
      input: values.input,
      accumulator: values.accumulator,
      result: result,
      currentOperator: values.operatorArray,
      displayFirst: values.displayFirst,
      equalWasLast: equalWasLast
    });

    //Clearing all
    if (operation === "AC") {
      this.clearAll();
    }
  };

  //MAIN handling for NUMBERS
  buttonSubmitHandler = e => {
    let submit = e.target.value;
    let input = this.state.input;

    //Checking multiple dots entered
    if (input.length > 10) {
      submit = input;
    } else if (
      (input.indexOf(".") > -1 && submit === ".") ||
      (submit === "." && input === "")
    ) {
      submit = input;
    } else if (submit === "." && input) {
      submit = input + ".";
    } else {
      submit = input + submit;
      if (this.state.equalWasLast) {
        this.clearAll();
        input = submit;
      }
    }

    this.setState({ input: submit });
  };

  render() {
    let firstDisplay = this.state.displayFirst ? this.state.accumulator : null;

    return (
      <React.Fragment>
        <Display
          inputHandler={this.inputTextChanger}
          currentNumber={this.state.input}
          lastEntered={firstDisplay}
          operator={this.state.currentOperator[0]}
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
