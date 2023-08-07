import React, { useEffect, useState } from "react";
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
  nextStep,
  timeframe,
  setTimeframe,
  suburb,
  setSuburb,
  postcode,
  setPostcode,
}) {
  const theme = useTheme();
  const isScreenLargerThanMd = useMediaQuery(theme.breakpoints.up("md"));

  const [options, setOptions] = useState([]);

  const get_options = async () => {
    const response = await fetch(`http://104.168.117.112:8000/api/location/`)
    //const response = await fetch(`${apiUrl}location`);
    return await response.json();
  };

  useEffect(() => {
    get_options().then((data) => {
      setOptions(data);
      console.log(options);
      if (data && data.length > 0) {
        setSuburb(data[0]);
        setPostcode(data[0].postcode);
      }
    });
  }, []);

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
        Welcome to the Carbon Visualizer!
      </Typography>
      <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
        This tool will help you visualize the carbon footprint of your daily
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
        getOptionLabel={(option) => option.suburb}
        disableClearable
      />

      <Typography
        variant="h5"
        component="div"
        sx={{ flexGrow: 1, marginTop: "2rem" }}
      >
        Select a time period to visualize
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
            variant={tf.value === timeframe.value ? "elevation" : "outlined"}
            sx={{
              minWidth: 200,
              maxWidth: 300,
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
                  height: 120,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {tf.icon}
                <Typography
                  gutterBottom
                  variant="h5"
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
    </>
  );
}
