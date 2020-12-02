import "./App.css";
import React, { Component } from "react";

class App extends Component {
  state = {
    answer: 0,
    button1: "AC",
  };
  buffer = [];
  scale = 1;
  // handleKeyPress = (event) => {
  //   this.handle(event.key);
  // };
  result = (op) => {
    let a = "";

    let operation;
    let result;

    for (let i = 0; i < this.buffer.length; i++) {
      if (
        this.buffer[i] === "-" ||
        this.buffer[i] === "+" ||
        this.buffer[i] === "÷" ||
        this.buffer[i] === "%" ||
        this.buffer[i] === "x"
      ) {
        operation = this.buffer[i];
        a += " ";
      } else a += this.buffer[i];
    }

    a += " ";
    let index = 0;
    let x = "";
    let y = "";

    x = Number(a.substring(index, a.indexOf(" ", index)));
    index = a.indexOf(" ", index) + 1;
    result = x;
    y = Number(a.substring(index, a.indexOf(" ", index)));
    index = a.indexOf(" ", index) + 1;

    // eslint-disable-next-line default-case
    switch (operation) {
      case "+":
        result = Number(x) + Number(y);
        break;
      case "-":
        result = Number(x) - Number(y);
        break;
      case "x":
        result = Number(x) * Number(y);
        break;
      case "÷":
        result = Number(x) / Number(y);
        break;
      case "%":
        result = Number(x) % Number(y);
        break;
    }

    this.buffer = [];
    this.buffer[0] = result;
    if (op) {
      this.buffer.push(op);
      this.point = 1;
      this.operationCount = 1;
    } else {
      this.operationCount = 0;
    }
    this.setState(({ answer }) => ({
      answer: this.buffer.toString().replaceAll(",", ""),
    }));
  };
  flag = 0;
  point = 1;
  opCase = 0;
  operationCount = 0;
  handle = (event) => {
    let op = "";
    let b;
    // eslint-disable-next-line default-case
    switch (event.target.textContent) {
      case "C":
        this.buffer = [];
        b = "AC";
        this.point = 1;
        break;

      case "AC":
        b = "C";
        break;

      case "-":
        op = "-";
        this.opCase = 1;
        b = "C";
        this.operationCount++;
        break;

      case "+":
        op = "+";
        this.opCase = 1;
        b = "C";
        this.operationCount++;
        break;

      case "x":
        op = "x";
        this.opCase = 1;
        b = "C";
        this.operationCount++;
        break;

      case "%":
        op = "%";
        this.opCase = 1;
        b = "C";
        this.operationCount++;
        break;

      case "÷":
        op = "÷";
        this.opCase = 1;
        b = "C";
        this.operationCount++;
        break;

      case ".":
        if (this.point === 1) {
          this.buffer.push(".");
          this.point = -1;
        }
        this.opCase = 0;
        b = "C";
        break;

      default:
        this.buffer.push(event.target.textContent);
        this.opCase = 0;
        b = "C";
        break;
    }

    if (this.opCase && this.buffer.length === 0) {
      this.buffer.push(0);
      this.buffer.push(op);
    } else if (this.opCase) {
      if (
        this.buffer[this.buffer.length - 1] === "-" ||
        this.buffer[this.buffer.length - 1] === "+" ||
        this.buffer[this.buffer.length - 1] === "÷" ||
        this.buffer[this.buffer.length - 1] === "%" ||
        this.buffer[this.buffer.length - 1] === "x"
      ) {
        this.buffer[this.buffer.length - 1] = op;
        this.point = 1;
      } else {
        if (this.operationCount === 2) {
          this.result(op);
        } else {
          this.buffer.push(op);
          this.point = 1;
        }
      }
    }

    let ans = "0";
    if (this.buffer.length !== 0) {
      ans = this.buffer.toString().replaceAll(",", "");
    }
    this.setState(({ answer, button1 }) => ({
      answer: ans,
      button1: b,
    }));
  };

  handleResult = () => {
    this.result();
  };

  render() {
    window.addEventListener("keypress", this.handleKeyPress);
    return (
      <div className="container">
        <span
          id="answer"
          style={{ transform: `scale(${this.scale},${this.scale})` }}
        >
          {this.state.answer}
        </span>
        <div>
          <button className="button1" onClick={this.handle}>
            {this.state.button1}
          </button>
          <button className="button2">+/-</button>
          <button className="button3" onClick={this.handle}>
            %
          </button>
          <button className="button4" onClick={this.handle}>
            ÷
          </button>
        </div>
        <div>
          <button className="button5" onClick={this.handle}>
            7
          </button>
          <button className="button6" onClick={this.handle}>
            8
          </button>
          <button className="button7" onClick={this.handle}>
            9
          </button>
          <button className="button8" onClick={this.handle}>
            x
          </button>
        </div>
        <div>
          <button className="button9" onClick={this.handle}>
            4
          </button>
          <button className="button10" onClick={this.handle}>
            5
          </button>
          <button className="button11" onClick={this.handle}>
            6
          </button>
          <button className="button12" onClick={this.handle}>
            -
          </button>
        </div>
        <div>
          <button className="button13" onClick={this.handle}>
            1
          </button>
          <button className="button14" onClick={this.handle}>
            2
          </button>
          <button className="button15" onClick={this.handle}>
            3
          </button>
          <button className="button16" onClick={this.handle}>
            +
          </button>
        </div>
        <div>
          <button className="button17" onClick={this.handle}>
            0
          </button>
          <button className="button18" onClick={this.handle}>
            .
          </button>
          <button className="button19" onClick={this.handleResult}>
            =
          </button>
        </div>
      </div>
    );
  }
}

export default App;
