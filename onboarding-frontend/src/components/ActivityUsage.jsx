import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Autocomplete, useTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useMemo, useState } from "react";
import { ApplianceWattage } from "../data/ApplianceWattage";
import InputAdornment from "@mui/material/InputAdornment";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddIcon from "@mui/icons-material/Add";

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
  }, [activityUsages]);
  const [currentActivity, setCurrentActivity] = useState("");
  const [activitySelectHelperMessage, setActivitySelectHelperMessage] =
    useState("");

  const isScreenLargerThanXs = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <>
      <Typography variant="h4" sx={{ marginTop: "1rem", userSelect: 'none' }}>
        Know Your Carbon Footprint By Activity
      </Typography>
      <Grid container>
        <Grid item xs={12} md={8} marginTop={5}>
          <Typography variant="h5">Add your activity</Typography>

          <Grid container item xs={12} md={12} marginTop={1}>
            <Autocomplete
              disablePortal
              options={ApplianceWattage}
              onChange={(event, newValue) => {
                if (newValue) {
                  setCurrentActivity(newValue);
                  setActivitySelectHelperMessage("");
                }
              }}
              sx={{ width: 300, maxWidth: 400, marginTop: "1rem" }}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <div style={{ marginRight: "0.5rem" }}>{option.icon}</div>{" "}
                  {option.name}
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
            <Button
              variant="contained"
              sx={{ marginLeft: "1rem", marginTop: "1rem", maxHeight: 56 }}
              startIcon={<AddIcon />}
              onClick={() => {
                if (currentActivity === "") {
                  setActivitySelectHelperMessage("Please select an activity");
                  return;
                }
                const existed = activityUsages.find(
                  (activity) => activity.name === currentActivity.name
                );
                if (!existed) {
                  setActivityUsages([
                    ...activityUsages,
                    {
                      ...currentActivity,
                      hours: 1,
                      carbon: currentActivity.kilowatt * 1 * 0.85,
                    },
                  ]);
                  setActivitySelectHelperMessage("");
                } else {
                  setActivitySelectHelperMessage(
                    "This activity has already been added"
                  );
                }
              }}
            >
              Add
            </Button>
          </Grid>

          <Grid container item xs={12} md={12} marginTop={6}>
            {activityUsages.length > 0 && (
              <Typography variant="h5" marginBottom={3}>
                Enter the hours you spend on each activity per week
              </Typography>
            )}
            {activityUsages &&
              activityUsages.map((activity, index) => {
                return (
                  <Grid
                    container
                    className={"inputGroup"}
                    alignItems="center"
                    spacing={2}
                    marginBottom={4}
                    key={index}
                  >
                    <Grid
                      item
                      xs={12}
                      md={4}
                      display="flex"
                      flexDirection="row"
                      gap={1}
                      alignItems="center"
                    >
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
                            <InputAdornment position="end">
                              hours
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      md={4}
                      style={{ height: "100%", maxHeight: 72 }}
                    >
                      <Button
                        variant="outlined"
                        size={isScreenLargerThanXs ? "medium" : "small"}
                        style={{
                          height: "100%",
                        }}
                        startIcon={<DeleteForeverIcon />}
                        color="error"
                        onClick={() => {
                          const newActivityUsages = [...activityUsages];
                          newActivityUsages.splice(index, 1);
                          setActivityUsages(newActivityUsages);
                        }}
                      >
                        DELETE
                      </Button>
                    </Grid>
                  </Grid>
                );
              })}
          </Grid>
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
            justifySelf: "center",
          }}
        >
          <Typography sx={{ fontSize: "1.1rem" }}>
            Total Carbon Footprint
          </Typography>
          <Typography sx={{ fontSize: "4rem" }}>
            <span style={{ color: theme.palette.primary.main }}>
              {result.toFixed(2)}
            </span>
          </Typography>
          <Typography
            sx={{ fontSize: "1.3rem", color: theme.palette.text.secondary }}
          >
            kg CO2
          </Typography>
        </Grid>
      </Grid>
        <Button
            variant="outlined"
            onClick={lastStep}
            sx={{
                marginTop: '2rem',
                color: "primary.main",
                backgroundColor: "white",
                width: '6rem'
            }}
        >
            Back
        </Button>
        <Button
            variant="contained"
            color="primary"
            sx={{
                marginTop: '2rem',
                marginLeft: '1rem',
                color: "white",
                width: '6rem'

            }}

            onClick={nextStep}
        >
            Next
        </Button>
    </>
  );
}
