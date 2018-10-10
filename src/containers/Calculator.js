import React, { Component } from "react";
import Display from "../components/Display/Display";
import NumberPad from "../components/NumberPad/NumberPad";

class Calculator extends Component {
  state = {
    input: "",
    accumulator: 0,
    result: 0,
    history: [],
    currentOperator: [],
    displayFirst: true,
    equalWasLast: false
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

  //Handling button operation
  operationHandler = operation => {
    let result = this.state.accumulator;
    let input = parseFloat(this.state.input);

    if (operation) {
      this.setState({ equalWasLast: false });
    }

    //Pushing history
    const updateHistory = [...this.state.history];
    updateHistory.push(input);
    updateHistory.push(operation);

    //Pushing operator
    let operatorArray = [...this.state.currentOperator];
    operatorArray.push(operation);

    //Handling operations when there is enough saved in array
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
      if (operatorArray[0] === "x") {
        result *= input;
      }

      //Divide
      if (operatorArray[0] === "/") {
        result /= input;
      }

      operatorArray.shift();
      if (result % 1 !== 0) {
        result = parseFloat(result.toFixed(2));
      }

      if (this.state.equalWasLast) {
        this.setState({ equalWasLast: false, accumulator: 0 });
      }

      if (operation === "=") {
        operatorArray.shift();
        operation = result;
        this.setState({
          equalWasLast: true,
          displayFirst: true,
          input: result
        });
        console.log(result, typeof result);
      }
    } else if (!result) {
      result = input;
      
    }
      //State update
      this.resetInput();
      this.setState({
        input: "",
        currentOperator: operatorArray,
        accumulator: result,
        result,
        history: updateHistory
      });

    //MORE OPERATION CASES
    //Changing sign
    if (operation === "+/-") {
      input=this.state.result;
      if (input > 0) {
        input = "-" + input;
      } else {
        input = "" + input;
        input = input.slice(1);
      }

      input = parseFloat(input);
      operatorArray.shift();
      result = input;
      this.setState({
        input: result,
        accumulator: result,
        result,
        currentOperator: operatorArray,
        displayFirst: false
      });

    
    }

    //Percent
    if (operation === "%") {
      result = 0;
      result = input / 100;

      operatorArray.shift();
      this.setState({
        input: result,
        accumulator: result,
        result,
        currentOperator: operatorArray,
        displayFirst: false
      });
    }

    //Clearing all
    if (operation === "AC") {
      this.clearAll();
    }
  };

  //Handling number buttons
  buttonSubmitHandler = e => {
    let submit = e.target.value;
    let input = this.state.input;
    if (isNaN(input)) {
      input = "";
    }

    //Checking multiple dots entered
    if (
      (input.indexOf(".") > -1 && submit === ".") ||
      (submit === "." && input === "")
    ) {
      submit = "";
    } else {
      submit = input + submit;
      this.setState({ input: submit });
      if (this.state.equalWasLast) {
        this.clearAll();
        input = submit;
        this.setState({ input: submit });
      }
    }
    this.setState({ input: submit });

    //Special case if entering number after equal
    if (toString(submit) === ".") {
      submit = parseFloat(input + submit);
      this.setState({ input: submit });
    }
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
