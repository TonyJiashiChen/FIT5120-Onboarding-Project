import React, { useEffect, useState, useCallback } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material";
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

import useMediaQuery from "@mui/material/useMediaQuery";

const apiUrl = process.env.REACT_APP_API_URL;

const calculatorModes = [
  {
    label: "Activity Based",
    isActivityBased: true,
    icon: <DryCleaningIcon />,
  },
  {
    label: "Utility Bill Based",
    isActivityBased: false,
    icon: <ReceiptLongIcon />,
  }
];

export function Welcome({
  stepActivityMode,
  setStepActivityMode,
  nextStep,
  timeframe,
  setTimeframe,
  suburb,
  setSuburb,
  setPostcode,
  setAverageElectricity,
  setAverageGas,
  cleanAndRedo,
}) {
  const theme = useTheme();
  const isScreenLargerThanMd = useMediaQuery(theme.breakpoints.up("md"));

  const [options, setOptions] = useState([]);

  const get_options = async () => {
    const response = await fetch(`${apiUrl}location`);
    return response.json();
  };


  useEffect(() => {
    if (apiUrl !== undefined) {
      get_options().then((data) => {
        if (data && data.length > 0) {
          setOptions(data);
          setSuburb(data[0]);
          setPostcode(data[0].postcode);
        }
      });
    } else {
      // Mock data for development
      setOptions([
        {
          postcode: 3802,
          suburb: "Endeavour Hills",
          latitude: -37.97020387932868,
          longitude: 145.2562723381787,
        },
      ]);
      setSuburb({
        postcode: 3802,
        suburb: "Endeavour Hills",
        latitude: -37.97020387932868,
        longitude: 145.2562723381787,
      });
      setPostcode(3802);
    }
  }, [setPostcode, setSuburb, setOptions]);

  const getElecAndGas = useCallback(async () => {
    if (suburb?.postcode) {
      const response = await fetch(`${apiUrl}energy/${suburb.postcode}?year=2022`);
      return response.json();
    } else {
      return {
        electricity_emissions_kg_year: 3991,
        gas_emissions_kg_year: 3389,
      };
    }
  }, [suburb?.postcode]);

  useEffect(() => {
    getElecAndGas().then((data) => {
      setAverageElectricity(data.electricity_emissions_kg_year);
      setAverageGas(data.gas_emissions_kg_year);

      if (data && data.length > 0) {
        setAverageElectricity(data[0].electricity_emissions_kg_year);
        setAverageGas(data[0].gas_emissions_kg_year);
      }
    }).catch((err) => {
      console.log(err);
    });
  },[getElecAndGas, setAverageElectricity, setAverageGas]);

  useEffect(() => {
    setSuburb(options[0]);
  }, [options, setSuburb]);

  return (
    <>
    
      {isScreenLargerThanMd && (
        <img
          src="/environment_iaus.svg"
          alt="environmental drawing"
          style={{
            height: 200,
            position: "absolute",
            right: 0,
            top: 60,
            transform: "scaleX(-1)",
          }}
        />
      )}
      <Typography
        variant="h4"
        component="div"
        sx={{ flexGrow: 1, marginTop: "1rem", userSelect: "none" }}
      >
        Welcome to the Carbon Visualizer!
      </Typography>
      <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1, userSelect: "none" }}>
        This tool will help you visualize the carbon footprint of your daily
        activities.
      </Typography>
      <Typography
        variant="h5"
        component="div"
        sx={{ flexGrow: 1, marginTop: "2rem", userSelect: "none" }}
      >
        Select a suburb for comparasion
      </Typography>
      <Autocomplete
        disablePortal
        options={options}
        value={suburb}
        onChange={(event, newValue) => {
          setSuburb(newValue);
          setPostcode(newValue.postcode);
        }}
        sx={{ maxWidth: 400, marginTop: "1rem" }}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            {option.suburb} ({option.postcode})
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter your suburb"
            helperText="Compare your carbon consumption with your neighbors."
          />
        )}
        getOptionLabel={(option) => `${option.suburb} (${option.postcode})`}
        disableClearable
      />


      <Typography
        variant="h5"
        component="div"
        sx={{ flexGrow: 1, marginTop: "2rem", userSelect: "none" }}
      >
        Pick either Activity or Bill-based Carbon Calculation.
      </Typography>
      <Typography
        variant="subtitle1"
        component="div"
        sx={{ flexGrow: 1, marginTop: "0.5rem", userSelect: "none" }}
      >
        Your selection: <b>{stepActivityMode? calculatorModes[0].label: calculatorModes[1].label}</b>
      </Typography>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "1rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {calculatorModes.map((mode) => (
          <Card
            key={mode.label}
            variant={mode.isActivityBased === stepActivityMode ? "elevation" : "outlined"}
            sx={{
              width: 200,
              marginTop: "1rem",
              border:
                mode.isActivityBased === stepActivityMode
                  ? `3px solid ${theme.palette.primary.main}`
                  : `2px dashed ${theme.palette.primary.main}`,
            }}
          >
            <CardActionArea
              onClick={() => {
                cleanAndRedo();
                setStepActivityMode(mode.isActivityBased);
              }}
            >
              <CardContent
                sx={{
                  height: 60,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {mode.icon}
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ marginBottom: 0, marginLeft: "5px" }}
                >
                  {mode.label}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>

      
      <Button
        sx={{ marginTop: "3rem",width: "6rem" }}
        disabled={!suburb}
        variant="contained"
        onClick={()=>{nextStep()}}
      >
        Next
      </Button>
    </>
  );
}
