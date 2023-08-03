import React, { useState } from "react";
import { TextField, Typography, Grid } from "@mui/material";

const StepTwo = () => {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [number3, setNumber3] = useState("");
  const [result, setResult] = useState("calculating");

  const [electricity, setElectricity] = useState(0);
  const [gas, setGas] = useState(0);
  const [car, setCar] = useState(0);

  const handleNumber1Change = (event) => {
    const value = event.target.value;
    setNumber1(value);

    updateResult(value, number2, number3);
  };

  const handleNumber2Change = (event) => {
    const value = event.target.value;
    setNumber2(value);

    updateResult(number1, value, number3);
  };

  const handleNumber3Change = (event) => {
    const value = event.target.value;
    setNumber3(value);

    updateResult(number1, number2, value);
  };

  const updateResult = (num1, num2, num3) => {
    const parsedNum1 = parseInt(num1);
    const parsedNum2 = parseInt(num2);
    const parsedNum3 = parseInt(num3);

    setElectricity(parsedNum1 * 0.85);
    setGas(parsedNum2 * 11.7 * 0.02);
    setCar(parsedNum3 * 146.5);

    const electroCarbon = parsedNum1 * 0.85;
    const gasCarbon = parsedNum2 * 11.7 * 0.02;
    const carCarbon = parsedNum3 * 146.5;

    if (isNaN(electroCarbon) || isNaN(gasCarbon) || isNaN(carCarbon)) {
      setResult("calculating");
    } else {
      setResult(electroCarbon + gasCarbon + carCarbon);
    }
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Typography variant="h6">Electricity (Kwh/Month)</Typography>
        <TextField
          type="number"
          value={number1}
          onChange={handleNumber1Change}
          variant="outlined"
          margin="normal"
        />
      </Grid>
      <Grid item>
        <Typography variant="h6">Gas (MJ/Month)</Typography>
        <TextField
          type="number"
          value={number2}
          onChange={handleNumber2Change}
          variant="outlined"
          margin="normal"
        />
      </Grid>
      <Grid item>
        <Typography variant="h6">Private Vehicle (Km/Month)</Typography>
        <TextField
          type="number"
          value={number3}
          onChange={handleNumber3Change}
          variant="outlined"
          margin="normal"
        />
      </Grid>
      <Grid item>
        <Typography variant="h5">Your Total Carbonfootprint:</Typography>
        <Typography variant="h6">{result}</Typography>
        <Typography variant="h6">
          Your Electricity Carbonfootprint: {electricity}
        </Typography>
        <Typography variant="h6">Your Gas Carbonfootprint: {gas}</Typography>
        <Typography variant="h6">
          Your Vehicle Carbonfootprint: {car}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default StepTwo;
