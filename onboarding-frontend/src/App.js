import React, { useState } from "react";
import "./App.css";

function App() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [result, setResult] = useState("calculating");

  const handleNumber1Change = (event) => {
    const value = event.target.value;
    setNumber1(value);
    updateResult(value, number2);
  };

  const handleNumber2Change = (event) => {
    const value = event.target.value;
    setNumber2(value);
    updateResult(number1, value);
  };

  const updateResult = (num1, num2) => {
    const parsedNum1 = parseInt(num1);
    const parsedNum2 = parseInt(num2);

    if (isNaN(parsedNum1) || isNaN(parsedNum2)) {
      setResult("calculating");
    } else {
      setResult(parsedNum1 + parsedNum2);
    }
  };

  return (
    <div className="App">
      <h1>Know Your Carbon Footprint Right Now!</h1>
      <div>
        <input
          type="number"
          value={number1}
          onChange={handleNumber1Change}
          placeholder="Enter number 1"
        />
        <input
          type="number"
          value={number2}
          onChange={handleNumber2Change}
          placeholder="Enter number 2"
        />
      </div>
      <div>
        <h2>Result:</h2>
        <p>{result}</p>
      </div>
    </div>
  );
}

export default App;
