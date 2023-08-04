import { Button } from "@mui/material";
import React, {useState} from "react";
import { TextField, Typography, Grid, InputAdornment } from "@mui/material";
import { useEffect } from "react";


export function InfoInput({ activeStep, steps, nextStep, lastStep, electricity, gas, car, result, setElectricity, setGas, setCar, setResult }) {

  const [electricityUsage, setElectricityUsage] = useState(0);
  const [gasUsage, setGasUsage] = useState(0);
  const [carUsage, setCarUsage] = useState(0);


  useEffect(() => {
    setElectricity(electricityUsage * 0.85);
    setGas(gasUsage * 11.7 * 0.02);
    setCar(carUsage * 0.146);
  }, [carUsage, electricityUsage, gasUsage, setCar, setElectricity, setGas]);

  useEffect(() => {
    setResult(electricity + gas + car);
  }, [car, electricity, gas, setResult]);

  return (
    <>
      <Typography variant="h4" sx={{marginTop: '1rem'}}>Your energy consumptions</Typography>
      <Grid sx={{ marginTop: '1rem'}} item>
        <Typography variant="h5" sx={{marginTop: '2rem'}}>Electricity Usage</Typography>
        <TextField
          type="number"
          label="Electricity"
          value={electricityUsage}
          onChange={(event) => {
            setElectricityUsage(event.target.value);
          }}
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
          value={gasUsage}
          onChange={(event) => {
            setGasUsage(event.target.value);
          }}
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
          value={carUsage}
          onChange={(event) => {
            setCarUsage(event.target.value);
          }}
          variant="outlined"
          margin="normal"
          InputProps={{
            endAdornment: <InputAdornment position="end">Km</InputAdornment>,
          }}
        />
      </Grid>
      <Grid item>
        <Typography variant="h4" sx={{marginTop: '2rem'}}>Your Total Carbonfootprint: {result.toFixed(2)} kg</Typography>
        <Typography variant="h6">
          Your Electricity Carbonfootprint: {electricity.toFixed(2)} kg
        </Typography>
        <Typography variant="h6">Your Gas Carbonfootprint: {gas.toFixed(2)} kg</Typography>
        <Typography variant="h6">
          Your Vehicle Carbonfootprint: {car.toFixed(2)} kg
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
