import Grid  from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Autocomplete, useTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useMemo, useState } from "react";
import { ApplianceWattage } from "../data/ApplianceWattage";
import InputAdornment from "@mui/material/InputAdornment";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import useMediaQuery from "@mui/material/useMediaQuery";

export function ActivityUsage({
  nextStep,
  lastStep,
  activityUsages,
  setActivityUsages,
}) {
  const theme = useTheme();
  const result = useMemo(() => {
    return activityUsages.reduce((acc, activity) => {
      return acc + activity.carbon;
    }, 0);
  }
  , [activityUsages]);
  const [activitySelectHelperMessage, setActivitySelectHelperMessage] = useState("");

  const isScreenLargerThanXs = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <>
      <Typography variant="h4" sx={{ marginTop: "1rem" }}>
        Know Your Carbon Footprint By Activity
      </Typography>
      <Grid container>
        <Grid item xs={12} md={8} marginTop={5}>
          <Typography variant="h5">
            Add your activity
          </Typography>

          <Grid container item xs={12} md={12} marginTop={1}>
            <Autocomplete
              disablePortal
              options={ApplianceWattage}
              onChange={(event, newValue) => {
                const existed = activityUsages.find(
                  (activity) => activity.name === newValue.name
                );
                if (!existed) {
                  setActivityUsages([...activityUsages, {
                    ...newValue,
                    hours: 1,
                    carbon: newValue.kilowatt * 1 * 0.85,
                  }]);
                  setActivitySelectHelperMessage("");
                } else {
                  setActivitySelectHelperMessage("This activity has already been added");
                }
              }}
              sx={{width: 300, maxWidth: 400, marginTop: "1rem"}}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <div style={{marginRight: '0.5rem'}}>{option.icon}</div> {option.name}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select and add an activity"
                  placeholder="Search"
                  error={activitySelectHelperMessage !== ""}
                  helperText={activitySelectHelperMessage}
                />
              )}
              getOptionLabel={(option) => option.name || ""}
              disableClearable
            />
          </Grid>

          <Grid container item xs={12} md={12} marginTop={6}>
            {
              activityUsages.length > 0 && (
                <Typography variant="h5" marginBottom={3}>
                  Enter the hours you spend on each activity per week
                </Typography>
              )
            }
            {
              activityUsages && activityUsages.map((activity, index) => {
                return (
                  <Grid
                    container
                    className={"inputGroup"}
                    alignItems="center"
                    spacing={2}
                    marginBottom={4}
                    key={index}
                  >
                    <Grid item xs={12} md={4} display="flex" flexDirection="row" gap={1} alignItems="center">
                      {activity.icon} <b>{activity.name}</b>
                    </Grid>
                    <Grid item xs={8} md={4}>
                      <TextField
                        type="text"
                        label={"Hours per week"}
                        value={
                          activityUsages[index] && activityUsages[index].hours
                            ? activityUsages[index].hours
                            : ""
                        }
                        onChange={(event) => {
                          const value = event.target.value;
                          const numericRegex = /^[0-9]*$/;
                          if (numericRegex.test(value) || value === "") {
                            const newactivityUsages = [...activityUsages];
                            newactivityUsages[index].hours = value;
                            newactivityUsages[index].carbon =
                              newactivityUsages[index].kilowatt * value * 0.85;
                            setActivityUsages(newactivityUsages);
                          }
                        }}
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">hours</InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={4} md={4}>
                      <Button variant="outlined" size={isScreenLargerThanXs? "medium" : "small"} startIcon={<DeleteForeverIcon />} color="error" onClick={() => {
                        const newActivityUsages = [...activityUsages];
                        newActivityUsages.splice(index, 1);
                        setActivityUsages(newActivityUsages);
                      }
                      }>
                        DELETE
                      </Button>
                    </Grid>
                  </Grid>
                );
              })
            }
          </Grid>

          <Box marginTop={4}>
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
        <Grid
          item
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
      </Grid>
    </>
  );
}
