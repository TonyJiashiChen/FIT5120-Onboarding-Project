import {
  Button,
  Box
} from "@mui/material";
import React, { useState } from "react";
import { TextField, Typography, Grid, InputAdornment } from "@mui/material";
import { useEffect, useCallback } from "react";
import { useTheme } from "@mui/material";

export function OverallUsage({
  activeStep,
  steps,
  nextStep,
  lastStep,
  electricity,
  gas,
  car,
  result,
  setElectricity,
  setGas,
  setCar,
  setResult,
  averageElectricity,
  setAverageElectricity,
  averageGas,
  setAverageGas,
  suburb,
}) {
  const [electricityUsage, setElectricityUsage] = useState(0);
  const [gasUsage, setGasUsage] = useState(0);
  const [carUsage, setCarUsage] = useState(0);

  const theme = useTheme();

  const handleNumericInputChange = (event, setterFunc) => {
    const value = event.target.value;
    const numericRegex = /^[0-9]*$/; // This regex matches any string that contains only digits.
    if (numericRegex.test(value) || value === "") {
      setterFunc(value);
    }
  };

  useEffect(() => {
    setElectricity(electricityUsage * 0.85);
    setGas(gasUsage * 11.7 * 0.02);
    setCar(carUsage * 0.146);
  }, [carUsage, electricityUsage, gasUsage, setCar, setElectricity, setGas]);

  useEffect(() => {
    setResult(electricity + gas + car);
  }, [car, electricity, gas, setResult]);

  const getElectricity = useCallback(async () => {
    const response = await fetch(
      `http://104.168.117.112:8000/api/energy/${suburb.postcode}?year=2022&energy_type=Electricity`
    );
    const res = await response.json();

    return res;
  }, [suburb.postcode]);
  const getGas = useCallback(async () => {
    const response = await fetch(
      `http://104.168.117.112:8000/api/energy/${suburb.postcode}?year=2022&energy_type=Gas`
    );
    const res = await response.json();
    return res;
  }, [suburb.postcode]);

  useEffect(() => {
    getElectricity().then((data) => {
      setAverageElectricity(data.avg_emissions);
      if (data && data.length > 0) {
        setAverageElectricity(data[0].avg_emissions);
      }
    });
  }, [getElectricity, setAverageElectricity]);

  useEffect(() => {
    getGas().then((data) => {
      setAverageGas(data.avg_emissions);
      if (data && data.length > 0) {
        setAverageGas(data[0].avg_emissions);
      }
    });
  }, [getGas, setAverageGas]);

  useEffect(() => {
    setElectricity(electricityUsage * 0.85);
    setGas(gasUsage * 11.7 * 0.02);
    setCar(carUsage * 0.146);
  }, [carUsage, electricityUsage, gasUsage, setCar, setElectricity, setGas]);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Typography variant="h4" sx={{ marginTop: "1rem" }}>
          Calculate Overall Carbon Footprint
        </Typography>
      </Grid>

      <Grid
        container
        item
        xs={12}
        md={8}
        marginTop={4}
      >
        <Grid item xs={12} md={12}>
          <Grid
            container
            className={"inputGroup"}
            alignItems="center"
            spacing={2}
            marginBottom={4}
          >
            <Grid item xs={12} md={3}>
              <Typography variant="h6">Electricity:</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                type="text"
                label="Electricity"
                value={electricityUsage}
                onChange={(event) => {
                  handleNumericInputChange(event, setElectricityUsage);
                }}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">kWh</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <Typography marginLeft={2} variant="h6" sx={{ color: theme.palette.primary.dark}}>
              ≈ {electricity.toFixed(2)} kg CO2
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <Grid
            container
            className={"inputGroup"}
            alignItems="center"
            spacing={2}
            marginBottom={4}
          >
            <Grid item xs={12} md={3}>
              <Typography variant="h6">Gas:</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                type="text"
                label="Gas"
                value={gasUsage}
                onChange={(event) => {
                  handleNumericInputChange(event, setGasUsage);
                }}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">MJ</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <Typography marginLeft={2} variant="h6" sx={{ color: theme.palette.primary.dark }}>
                ≈ {gas.toFixed(2)} kg CO2
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <Grid
            container
            className={"inputGroup"}
            alignItems="center"
            spacing={2}
            marginBottom={2}
          >
            <Grid item xs={12} md={3}>
              <Typography variant="h6">Car:</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                type="text"
                label="Car"
                value={carUsage}
                onChange={(event) => {
                  handleNumericInputChange(event, setCarUsage);
                }}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">km</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <Typography marginLeft={2} variant="h6" sx={{ color: theme.palette.primary.dark }}>
              ≈ {car.toFixed(2)} kg CO2
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        className={"total"}
        xs={12}
        md={4}
        sx={{
          marginTop: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "1.1rem" }}>
          Total Carbon Footprint
        </Typography>
        <Typography
          sx={{ fontSize: "4rem" }}
        >
          <span style={{ color: theme.palette.primary.main }}>{result.toFixed(2)}</span>
        </Typography>
        <Typography sx={{ fontSize: "1.3rem", color: theme.palette.text.secondary }}>kg CO2</Typography>
      </Grid>

      <Grid container item md={12} sx={{ marginTop: "1rem" }}>
        <Grid item xs={12} md={12}>
          <Box>
            <Button
              variant="contained"
              style={{
                backgroundColor: "white",
                color: theme.palette.primary.main,
              }}
              onClick={lastStep}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={nextStep}
              sx={{ marginLeft: 2 }}
            >
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}