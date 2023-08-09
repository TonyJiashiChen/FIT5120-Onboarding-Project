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
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import useMediaQuery from "@mui/material/useMediaQuery";

const apiUrl = process.env.REACT_APP_API_URL;

const timeframes = [
  {
    label: "One Month",
    value: 1,
    icon: <TodayIcon />,
  },
  {
    label: "Three Months",
    value: 3,
    icon: <DateRangeIcon />,
  },
  {
    label: "One Year",
    value: 12,
    icon: <CalendarMonthIcon />,
  },
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
}) {
  const theme = useTheme();
  const isScreenLargerThanMd = useMediaQuery(theme.breakpoints.up("md"));

  const set_mode = () => {
    setStepActivityMode(!stepActivityMode);
  }

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
        sx={{ flexGrow: 1, marginTop: "1rem" }}
      >
        Welcome to the Carbon Visualiser!
      </Typography>
      <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
        This tool will help you visualise the carbon footprint of your daily
        activities.
      </Typography>
      <Typography
        variant="h5"
        component="div"
        sx={{ flexGrow: 1, marginTop: "2rem" }}
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
        getOptionLabel={(option) => option.suburb || ""}
        disableClearable
      />

      <Typography
        variant="h5"
        component="div"
        sx={{ flexGrow: 1, marginTop: "2rem" }}
      >
        Select a billing period
      </Typography>
      <Typography
        variant="subtitle1"
        component="div"
        sx={{ flexGrow: 1, marginTop: "0.5rem" }}
      >
        Your selection: <b>{timeframe.label}</b>
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
        {timeframes.map((tf) => (
          <Card
            key={tf.value}
            variant={tf.value === timeframe.value ? "elevation" : "outlined"}
            sx={{
              width: 200,
              marginTop: "1rem",
              border:
                tf.value === timeframe.value
                  ? `3px solid ${theme.palette.primary.main}`
                  : `2px dashed ${theme.palette.primary.main}`,
            }}
          >
            <CardActionArea
              onClick={() => {
                setTimeframe(tf);
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
                {tf.icon}
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ marginBottom: 0, marginLeft: "5px" }}
                >
                  {tf.label}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
      <Button
        sx={{ marginTop: "3rem" }}
        disabled={!(suburb && timeframe)}
        variant="contained"
        onClick={nextStep}
      >
        Next
      </Button>
      <Button
        sx={{ marginTop: "3rem", marginLeft: "1rem" }}
        disabled={!(suburb && timeframe)}
        variant="contained"
        onClick={set_mode}
      >
        Switch to Calculate carbon footprint by {stepActivityMode ? 'total bill':'activity'}
      </Button>
    </>
  );
}
