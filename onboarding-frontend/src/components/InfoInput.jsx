import { Button } from "@mui/material";
import React, {useState} from "react";
import { TextField, Typography, Grid, InputAdornment } from "@mui/material";


export function InfoInput({ activeStep, steps, nextStep, lastStep }) {

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
    <>
      <Typography variant="h4" sx={{marginTop: '1rem'}}>Your energy consumptions</Typography>
      <Grid sx={{ marginTop: '1rem'}} item>
        <Typography variant="h5" sx={{marginTop: '2rem'}}>Electricity Usage</Typography>
        <TextField
          type="number"
          label="Electricity"
          value={number1}
          onChange={handleNumber1Change}
          variant="outlined"
          margin="normal"
          InputProps={{
            endAdornment: <InputAdornment position="end">Kwh</InputAdornment>,
          }}
        />
      </Grid>
      <Grid item>
        <Typography variant="h5" sx={{marginTop: '2rem'}}>Gas Usage</Typography>
        <TextField
          type="number"
          label="Gas"
          value={number2}
          onChange={handleNumber2Change}
          variant="outlined"
          margin="normal"
          InputProps={{
            endAdornment: <InputAdornment position="end">MJ</InputAdornment>,
          }}
        />
      </Grid>
      <Grid item>
        <Typography variant="h5" sx={{marginTop: '2rem'}}>Private Vehicle Usage</Typography>
        <TextField
          type="number"
          label="Private Vehicle"
          value={number3}
          onChange={handleNumber3Change}
          variant="outlined"
          margin="normal"
          InputProps={{
            endAdornment: <InputAdornment position="end">Km</InputAdornment>,
          }}
        />
      </Grid>
      <Grid item>
        <Typography variant="h4" sx={{marginTop: '2rem'}}>Your Total Carbonfootprint:</Typography>
        <Typography variant="h6">{result}</Typography>
        <Typography variant="h6">
          Your Electricity Carbonfootprint: {electricity}
        </Typography>
        <Typography variant="h6">Your Gas Carbonfootprint: {gas}</Typography>
        <Typography variant="h6">
          Your Vehicle Carbonfootprint: {car}
        </Typography>
      </Grid>
      <Grid item>
        <Button sx={{marginTop: '2rem', marginRight: '1rem'}} variant="contained" onClick={lastStep}>
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button sx={{marginTop: '2rem'}} variant="contained" onClick={nextStep}>
            Finish
          </Button>
        ) : (
          <Button sx={{marginTop: '2rem'}} variant="contained" onClick={nextStep}>
            Next
          </Button>
        )}
      </Grid>
    </>
  );
}
