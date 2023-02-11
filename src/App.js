import React, { useEffect } from "react";
import {render} from "react-dom";
import { useState, useEffect } from "react";

// =====Arrays of numbers and operators =========
const operators = ["AC", "/", "*", "+", "-", "="];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


const App = () => {
  // useState hooks for displaying the formula, button input, and the answer in the
  // display Box.
  const [formula, setFormula ] = useState("");
  const [answer, setAnswer] = useState(0);
  const [calculations, setCalculations] = useState("");

  //useEffect hook that handles the changes in the formula and calculations.
  useEffect(() => {
    handleAnswer();
  }, [calculations]);

  // Function that sets the formula from the calculations that have been implemented
  const handleAnswer = () => {
    setFormula(calculations);
  }


  //Function that calls back from other functions. 
  // In our div elements, they return a onClick Function that gives on object of either 
  // a number or operator and are objects referred as "val". 
  const display = (val) => {
    // The two functions "number" and "operator" call back from the arrays above,
    // finds the element referred as "num" and "op". Then it compares if num is 
    // strictly equal to the object val. 
    // Example:
    // 10 === 10; true;
    // "10" === 10; false; (because it's a string, and the other is an integer)
    const number = numbers.find((num) => num === val);
    const operator = operators.find((op) => op === val);

    // The switch statement preforms when the the expression is preformed.
    // When a number or operator is clicked upon, it will bring up the case and
    // what ever that expression may be, a function will be executed. 
    // The break keyword, stops the execution of the function.
    // the default keyword specifies the code to run if there is no cases that matches.
      switch (val) {
        case "=": // When the user clicks on the "=" button, the solve() function is executed
          solve();
          break;
        case "AC": // When the user clicks on the "AC" button, the clearAll() function is executed.
          clearAll();
          break;
        case number: // When a user clicks on the numbers "0-9" buttons, the handleNumbers(val) function is executed.
          handleNumbers(val);
          break;
        case ".": // When a user clicks on the "." button, the dotOperator(val) function is executed.
          dotOperator(val);
          break;
        case operator: // When a user clicks on the operators "/, *, +, -" button, the handleOperators(val) function is executed.
          handleOperators(val);
          break;
          default: // When none of the cases are matched, no functions are executed.
          break;
      }
  };
// This function deletes all objects/elements in the calculations by returning the object
// as an empty string. This also sets the input/answer back to zero. 
// When the user clicks on the "AC" button, this is the function that is being played.
  const clearAll = () => {
    setCalculations("");
    setAnswer(0)
  };
  
  // This Function is for when the equals operator is clicked upon.
  const solve = () => {
    const total = eval(calculations); // The calculations that are in the string, gets evaluated and are called as "total". 
    //"eval" is a javascript code that is represented as a string and returns its completion value.
    setAnswer(total);
    // Sets the total in setAnswer and will display the answer.
    setFormula(`${total} = ${total}`);
    // Sets the 
    setCalculations(`${total}`);
  };

  const handleNumbers =(val) => {
    if (!calculations.length) {
      setAnswer(`${val}`);
      setCalculations(`${val}`);
    } else {
      if (val === 0 && (calculations === "0" || answer === "0")) {
        setCalculations(`${calculations}`);
      } else {
        const lastPos = calculations.charAt(calculations.length -1);
        const isLastPosOperator = lastPos === "*" || operators.includes(lastPos);

        setAnswer(isLastPosOperator ? `${val}` : `${answer}${val}`);
        setCalculations(`${calculations}${val}`);
      }
    }
 };

 const dotOperator = () => {
  const lastPos = calculations.charAt(calculations.length - 1);
  if (!calculations.length) {
    setAnswer("0.");
    setCalculations("0.");
  } else {
    if (lastPos === "*" || operators.includes(lastPos)) {
      setAnswer("0.");
      setCalculations(`${calculations} 0.`);
    } else {
      setAnswer(
        lastPos ==="." || answer.includes(".") ? `${answer}` : `${answer}.`
      );
      const formattedValue =
        lastPos === "." || answer.includes(".")
        ? `${calculations}`
        :`${calculations}.`;
      setCalculations(formattedValue);
    }
  }
 };

 const handleOperators = (val) => {
  if (calculations.length) {
    setAnswer(`${val}`);
    const beforeLastPos = calculations.charAt(calculations.length -2);

    const beforeLastPosIsOperator =
      operators.includes(beforeLastPos) || beforeLastPos === "*";

    const lastPos = calculations.charAt(calculations.length -1);

    const lastPosIsOperator = operators.includes(lastPos) || lastPos ==="*";

    const validOp = val ==="x" ? "*" : val;
    if (
      (lastPosIsOperator && val !== "-") ||
      beforeLastPosIsOperator && lastPosIsOperator
    ) {
      if (beforeLastPosIsOperator) {
        const updatedValue = `${calculations.substring(
          0,
          calculations.length - 2
        )}${val}`;
        setCalculations(updatedValue);
      } else {
        setCalculations(`${calculations.substring(0, calculations.length - 1)}${validOp}`);
      }
    } else {
      setCalculations(`${calculations}${validOp}`);
    }
  }
 };

  return (
  <>
    <div>
      <div id="calculator">
        <div id="displayBox">
          <div type="text" class="formula" placeholder="0" disabled>{formula}</div>
          <div id ="display" class="output" >{answer}</div>
        </div>
        <div onClick={() => display(".")} id="decimal" className="buttons">.</div>
        <div onClick={() => display(0)} id="zero" className="buttons">0</div>
        <div onClick={() => display(1)} id="one" className="buttons">1</div>
        <div onClick={() => display(2)} id="two" className="buttons">2</div>
        <div onClick={() => display(3)} id="three" className="buttons">3</div>
        <div onClick={() => display(4)} id="four" className="buttons">4</div>
        <div onClick={() => display(5)} id="five" className="buttons">5</div>
        <div onClick={() => display(6)} id="six" className="buttons">6</div>
        <div onClick={() => display(7)} id="seven" className="buttons">7</div>
        <div onClick={() => display(8)} id="eight" className="buttons">8</div>
        <div onClick={() => display(9)} id="nine" className="buttons">9</div>
        <div onClick={() => display("-")} id="subtract" className="buttons">-</div>
        <div onClick={() => display("+")} id="add" className="buttons">+</div>
        <div onClick={() => display("*")} id="multiply" className="buttons">x</div>
        <div onClick={() => display("/")} id="divide" className="buttons">/</div>
        <div onClick={solve} id="equals" className="buttons">=</div>
        <div onClick={() => clearAll()} id="clear" className="buttons">AC</div>
      </div>
    </div>
  </>
  )
}



render(<App/>, document.getElementById("root"));

