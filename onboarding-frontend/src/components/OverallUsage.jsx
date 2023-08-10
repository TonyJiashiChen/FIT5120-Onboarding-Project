import { Button } from "@mui/material";
import React, { useState } from "react";
import { TextField, Typography, Grid, InputAdornment } from "@mui/material";
import { useEffect } from "react";
import { useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

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

export function OverallUsage({
  nextStep,
  lastStep,
  electricity,
  gas,
  setElectricity,
  setGas,
  setCar,
  timeframe,
  setTimeframe,
}) {
  const [electricityUsage, setElectricityUsage] = useState(0);
  const [gasUsage, setGasUsage] = useState(0);
  const [carUsage] = useState(0);

  const theme = useTheme();

  const handleNumericInputChange = (event, setterFunc) => {
    const value = event.target.value;
    const numericRegex = /^[0-9]*$/; // This regex matches any string that contains only digits.
    if ((numericRegex.test(value) || value === "")&& value <= 100000) {
      setterFunc(value);
    }
  };

  useEffect(() => {
    setElectricity(electricityUsage * 0.85);
    setGas(gasUsage * 11.7 * 0.02);
  }, [carUsage, electricityUsage, gasUsage, setCar, setElectricity, setGas]);

  useEffect(() => {
    setElectricity(electricityUsage * 0.85);
    setGas(gasUsage * 11.7 * 0.02);
    setCar(carUsage * 0.146);
  }, [carUsage, electricityUsage, gasUsage, setCar, setElectricity, setGas]);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Typography variant="h4" sx={{ marginTop: "1rem", userSelect: "none" }}>
          Calculate Overall Carbon Footprint
        </Typography>
      </Grid>

      <Grid container item xs={12} md={8}>
        <Grid item xs={12} md={12}>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, marginTop: "1rem", userSelect: "none" }}
          >
            Select a billing period
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ flexGrow: 1, marginTop: "0.5rem", userSelect: "none" }}
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
                variant={
                  tf.value === timeframe.value ? "elevation" : "outlined"
                }
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
        </Grid>
        <Grid item xs={12} md={12} marginTop={5}>
          <Grid
            container
            className={"inputGroup"}
            alignItems="center"
            spacing={2}
            marginBottom={2}
          >
            <Grid item xs={12} md={12} marginBottom={2}>
              <Typography variant="h5" sx={{ userSelect: "none" }}>
                Enter your utility usage:
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ userSelect: "none" }}>
                Electricity:
              </Typography>
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
              <Typography
                marginLeft={2}
                variant="h6"
                sx={{ color: theme.palette.primary.dark, userSelect: "none" }}
              >
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
              <Typography variant="h6" sx={{ userSelect: "none" }}>
                Gas:
              </Typography>
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
              <Typography
                marginLeft={2}
                variant="h6"
                sx={{ color: theme.palette.primary.dark, userSelect: "none" }}
              >
                ≈ {gas.toFixed(2)} kg CO2
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} md={12}>
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
        </Grid> */}
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
        <Typography sx={{ fontSize: "1.1rem", userSelect: "none" }}>
          Total Carbon Footprint
        </Typography>
        <Typography sx={{ fontSize: "4rem", userSelect: "none" }}>
          <span style={{ color: theme.palette.primary.main }}>
            {(electricity + gas).toFixed(2)}
          </span>
        </Typography>
        <Typography
          sx={{
            fontSize: "1.3rem",
            color: theme.palette.text.secondary,
            userSelect: "none",
          }}
        >
          kg CO2
        </Typography>
      </Grid>

      <Grid item>
        <Button
          variant="outlined"
          onClick={lastStep}
          sx={{
            marginTop: "3rem",
            color: "primary.main",
            backgroundColor: "white",
            width: "6rem",
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: "3rem",
            marginLeft: "1rem",
            color: "white",
            width: "6rem",
          }}
          onClick={nextStep}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
}
