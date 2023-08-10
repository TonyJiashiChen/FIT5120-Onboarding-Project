import { Button, Grid, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import {
  Chart as ChartJS,
  BarElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useMemo, useEffect, useCallback } from "react";
import { Bar } from "react-chartjs-2";
import { useTheme } from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

ChartJS.register(
  BarElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);
ChartJS.defaults.font.size = 16;

const byBillLabels = ["Electricity", "Gas"];

export function Result({
  lastStep,
  electricity,
  gas,
  timeframe,
  cleanAndRedo,
  suburb,
  averageElectricity,
  averageGas,
  setAverageEnergy,
  activityUsages,
}) {
  const theme = useTheme();

  useEffect(() => {
    setAverageEnergy(averageGas + averageElectricity);
  }, [averageElectricity, averageGas, setAverageEnergy]);

  const totalCarbonByActivity = useMemo(() => {
    return activityUsages.reduce((acc, curr) => acc + curr.carbon, 0);
  }, [activityUsages]);

  const totalCarbonByBill = useMemo(() => {
    return (electricity + gas) * (12 / timeframe.value);
  }, [electricity, gas, timeframe.value]);

  const largestCarbon = useMemo(() => {
    return Math.max(totalCarbonByBill, totalCarbonByActivity * 52).toFixed(2);
  }, [totalCarbonByBill, totalCarbonByActivity]);

  const compareMsg = useMemo(() => {
    if (!suburb.suburb)
      return {
        message3: "Choose your surburb to see the comparasions",
      };
    if (!averageElectricity) {
      console.log("[WARNING] no average result data found");
      return {
        message3: "No average result data found",
      };
    }
    var percentage = 0;
    if (largestCarbon === 0) {
      return {
        message: `Congratulations, you don't produce any carbon footprint!`,
      };
    }
    if (averageElectricity > largestCarbon) {
      percentage =
        ((averageElectricity - largestCarbon) / averageElectricity) * 100;
      return {
        message: `Congratulations, you are `,
        percentage: percentage.toFixed(2),
        message2: `less than`,
        message3: `average energy usage`,
      };
    } else if (averageElectricity < largestCarbon) {
      percentage =
        ((largestCarbon - averageElectricity) / averageElectricity) * 100;
      return {
        message: `You are `,
        percentage: percentage.toFixed(2),
        message2: `more than`,
        message3: `average energy usage`,
      };
    }
    return {
      message: `You are the average energy usage`,
    };
  }, [averageElectricity, largestCarbon, suburb.suburb]);

  const convertToYearly = useCallback(
    (value) => {
      return (12 / timeframe.value) * value;
    },
    [timeframe.value]
  );

  const isScreenLargerThanMd = useMediaQuery(theme.breakpoints.up("md"));
  const byBillData = useMemo(
    () => ({
      labels: byBillLabels,
      datasets: [
        {
          label: "Carbon footprint",
          data: [convertToYearly(electricity), convertToYearly(gas)],
          backgroundColor: theme.palette.primary.main,
        },
        {
          label: "Neighbor Average Footprint",
          data: [averageElectricity, averageGas],
          backgroundColor: theme.palette.secondary.main,
        },
      ],
    }),
    [
      convertToYearly,
      electricity,
      gas,
      theme.palette.primary.main,
      theme.palette.secondary.main,
      averageElectricity,
      averageGas,
    ]
  );

  const planeRounds = useMemo(() => {
    return Math.round(convertToYearly(largestCarbon) / 0.115 / 758);
  }, [convertToYearly, largestCarbon]);

  const byActivityData = useMemo(() => {
    const topThreeActivitiesByCarbon = activityUsages
      .sort((a, b) => b.carbon - a.carbon)
      .slice(0, 3);
    return {
      labels: topThreeActivitiesByCarbon.map((activity) => activity.name),
      datasets: [
        {
          label: "Carbon footprint",
          data: topThreeActivitiesByCarbon.map(
            (activity) => activity.carbon * 52
          ),
          name: topThreeActivitiesByCarbon.map((activity) => activity.name),
          tip: topThreeActivitiesByCarbon.map((activity) => activity.tip),
          icon: topThreeActivitiesByCarbon.map((activity) => activity.icon),
          backgroundColor: theme.palette.primary.main,
        },
      ],
    };
  }, [activityUsages, theme.palette.primary.main]);

  const options = useMemo(() => {
    return {
      barPercentage: 0.4,
      categoryPercentage: 0.5,
      indexAxis: isScreenLargerThanMd ? "y" : "x",
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: false,
        },
        y: {
          stacked: false,
        },
      },
    };
  }, [isScreenLargerThanMd]);

  const cardStyle = {
    height: "16rem",
    minWidth: "16rem",
    width: "100%",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: "5px",
  };

  const infoTextStyle = {
    fontSize: "1.5rem",
    fontColor: "black",
  };

  const numberStyle = {
    fontSize: "3rem",
    color: theme.palette.primary.main,
    fontWeight: "bold",
  };

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Grid item xs={12} md={4} paddingRight={isScreenLargerThanMd ? 2 : 0}>
            <Card style={cardStyle}>
              <Typography style={numberStyle}>{largestCarbon} kg</Typography>
              <Typography style={infoTextStyle}>carbon emission</Typography>
              <Typography style={infoTextStyle}>per year</Typography>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            paddingRight={isScreenLargerThanMd ? 2 : 0}
            marginTop={isScreenLargerThanMd ? 0 : 2}
          >
            <Card style={cardStyle}>
              <Typography style={numberStyle}>≈ {planeRounds}</Typography>
              <Typography style={infoTextStyle}>flights from</Typography>
              <Typography style={infoTextStyle}>Sydney to Melbourne</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} marginTop={isScreenLargerThanMd ? 0 : 2}>
            <Card style={cardStyle}>
              {compareMsg?.message3 && (
                <>
                  {compareMsg?.percentage && (
                    <Typography
                      style={{
                        ...numberStyle,
                        color:
                          averageElectricity > largestCarbon
                            ? theme.palette.primary.main
                            : "red",
                      }}
                    >
                      {compareMsg.percentage}%{" "}
                    </Typography>
                  )}
                  {compareMsg?.message2 && (
                    <>
                      <Typography style={infoTextStyle}>
                        {" "}
                        {compareMsg.message2}{" "}
                      </Typography>
                      <Typography
                        style={{ ...infoTextStyle, fontWeight: "bold" }}
                      >
                        {" "}
                        {suburb.suburb}{" "}
                      </Typography>
                      <Typography style={infoTextStyle}>
                        {" "}
                        {compareMsg.message3}{" "}
                      </Typography>
                    </>
                  )}
                  {compareMsg?.errorMessage && (
                    <Typography style={infoTextStyle}>
                      {" "}
                      {compareMsg.errorMessage}{" "}
                    </Typography>
                  )}
                </>
              )}
            </Card>
          </Grid>
        </Grid>

        {totalCarbonByActivity > 0 && (
          <>
            <Grid item xs={12} md={12} marginTop={2}>
              <Card style={{ padding: "2rem", borderRadius: "5px" }}>
                <Grid container>
                  <Grid item xs={12} md={7}>
                    <Typography style={{ fontSize: "1.5rem" }}>
                      Top 3 Carbon-Emitting Activities
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      Data is in yearly basis
                    </Typography>
                    <Box height={"400px"}>
                      <Bar
                        style={{
                          marginTop: "1rem",
                          marginBottom: "1rem",
                        }}
                        options={options}
                        data={byActivityData}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <Typography variant="h5" marginTop={3} marginLeft={1}>
                      Tips
                    </Typography>
                    <List>
                      {byActivityData.datasets[0].tip.map((tip, index) => (
                        <ListItem key={index}>
                          <ListItemAvatar>
                            {byActivityData.datasets[0].icon[index]}
                          </ListItemAvatar>
                          <ListItemText
                            primary={byActivityData.datasets[0].name[index]}
                            secondary={tip}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </>
        )}
        {totalCarbonByBill > 0 && (
          <Grid container item xs={12} md={12} marginTop={2}>
            <Grid item xs={12} md={7}>
            <Card style={{ padding: "2rem", boxSizing: 'border-box', borderRadius: "5px", width: "100%" }}>
              <Typography style={{ fontSize: "1.5rem" }}>
                Carbon Footprint By Bill Type
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: theme.palette.text.secondary }}
              >
                Data is in yearly basis
              </Typography>
              <Box height={400} width="100%">
                <Bar
                  style={{
                    marginTop: "1rem",
                    marginBottom: "1rem",
                  }}
                  options={options}
                  data={byBillData}
                />
              </Box>
            </Card>
            </Grid>
          </Grid>
        )}
      </Grid>

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
        onClick={cleanAndRedo}
      >
        Reset
      </Button>
    </>
  );
}
