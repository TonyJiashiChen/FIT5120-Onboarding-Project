import Grid  from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Autocomplete, useTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
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
  const [activities, setActivities] = useState([]);

  const isScreenLargerThanXs = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <>
      <Typography variant="h4" sx={{ marginTop: "1rem" }}>
        Know Your Carbon Footprint By Activity
      </Typography>
      <Grid item xs={12} md={12} marginTop={5}>
        <Typography variant="h5">
          Add your activities
        </Typography>

        <Grid container item xs={12} md={12} marginTop={1}>
          <Autocomplete
            disablePortal
            options={ApplianceWattage}
            onChange={(event, newValue) => {
              setActivities([...activities, {
                ...newValue,
                hours: 1,
              }]);
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
              />
            )}
            getOptionLabel={(option) => option.name || ""}
            disableClearable
          />
        </Grid>

        <Grid container item xs={12} md={12} marginTop={6}>
          {
            activities.length > 0 && (
              <Typography variant="h5" marginBottom={3}>
                Enter the hours you spend on each activity per week
              </Typography>
            )
          }
          {
            activities && activities.map((activity, index) => {
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
                    {activity.icon} <Typography variant="h6">{activity.name}</Typography>
                  </Grid>
                  <Grid item xs={8} md={4}>
                    <TextField
                      type="text"
                      label={"Hours per week"}
                      value={
                        activities[index] && activities[index].hours
                          ? activities[index].hours
                          : ""
                      }
                      onChange={(event) => {
                        const newActivities = [...activities];
                        newActivities[index].hours = event.target.value;
                        setActivities(newActivities);
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
                    <Button variant="outlined" size={isScreenLargerThanXs? "large" : "medium"} startIcon={<DeleteForeverIcon />} color="error" onClick={() => {
                      const newActivities = [...activities];
                      newActivities.splice(index, 1);
                      setActivities(newActivities);
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
    </>
  );
}
