import { Button, Grid, Typography } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
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

ChartJS.register(
  BarElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);
ChartJS.defaults.font.size = 16;
const options = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const byBillLabels = ["Electricity", "Gas"];

export function Result({
  lastStep,
  electricity,
  gas,
  car,
  result,
  timeframe,
  cleanAndRedo,
  suburb,
  averageElectricity,
  setAverageElectricity,
  averageGas,
  setAverageGas,
  averageEnergy,
  setAverageEnergy,
  averageResult,
  setAverageResult,
  activityUsages,
}) {
  const theme = useTheme();

  useEffect(() => {
    setAverageEnergy(averageGas + averageElectricity);
  }, [averageElectricity, averageGas, setAverageEnergy]);

  const totalCarbonByActivity = useMemo(() => {
    return activityUsages.reduce((acc, curr) => acc + curr.carbon, 0);
  }, [activityUsages]);

  const largestCarbon = useMemo(() => {
    return Math.max(result, totalCarbonByActivity * 52).toFixed(2);
  }, [result, totalCarbonByActivity]);

  const compareMsg = useMemo(() => {
    if (!suburb.suburb) return "Choose your surburb to see the comparasions";
    if (!averageResult) {
      console.log("[WARNING] no average result data found");
      return "";
    }
    var percentage = 0;
    if (largestCarbon === 0) {
      return `Congratulations, you don't produce any carbon footprint!`;
    }
    if (averageElectricity > largestCarbon) {
      percentage =
        ((averageElectricity - largestCarbon) / averageElectricity) * 100;
      return `Congratulations, you are ${percentage.toFixed(2)}% less than ${
        suburb.suburb
      } average energy usage`;
    } else if (averageElectricity < largestCarbon) {
      percentage =
        ((largestCarbon - averageElectricity) / averageElectricity) * 100;
      return `You are ${percentage.toFixed(2)}% more than ${
        suburb.suburb
      } average energy usage`;
    }
  }, [averageElectricity, averageResult, largestCarbon, suburb.suburb]);

  const convertToYearly = useCallback((value) => {
    return (12 / timeframe.value) * value;
  }, [timeframe.value]);

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
    [convertToYearly, electricity, gas, theme.palette.primary.main, theme.palette.secondary.main, averageElectricity, averageGas]
  );

  const planeRounds = useMemo(() => {
    return Math.round((convertToYearly(largestCarbon) / 0.115 / 758));
  }, [convertToYearly, largestCarbon])

  const byActivityData = useMemo(() => {
    const topThreeActivitiesByCarbon = activityUsages
      .sort((a, b) => b.carbon - a.carbon)
      .slice(0, 3);
    return {
      labels: topThreeActivitiesByCarbon.map((activity) => activity.name),
      datasets: [
        {
          label: "Carbon footprint",
          data: topThreeActivitiesByCarbon.map((activity) => activity.carbon * 52),
          tip: topThreeActivitiesByCarbon.map((activity) => activity.tip),
          icon: topThreeActivitiesByCarbon.map((activity) => activity.icon),
          backgroundColor: theme.palette.primary.main,
        },
      ],
    };
  }, [activityUsages, theme.palette.primary.main]);
  console.log(byActivityData.datasets[0].icon)
  return (
    <>
      {isScreenLargerThanMd && (
        <img
          src="/nature.svg"
          alt="environmental drawing"
          style={{
            height: 230,
            position: "absolute",
            right: 20,
            top: 40,
          }}
        />
      )}
      <Typography variant="h4" sx={{ marginTop: "1rem" }}>
        Your yearly carbon emission would be
      </Typography>
      <Typography variant="h2" sx={{ marginTop: "1rem" }}>
        <b style={{ color: theme.palette.primary.main }}>{largestCarbon} kg </b>
      </Typography>
      <Typography variant="h5" sx={{ marginTop: "2rem" }}>
        Similar With Carbon Emission
      </Typography>
      <Typography variant="h4" marginTop={1}>
        <b style={{ color: theme.palette.primary.main }}>{planeRounds}</b>{" "}
        flights from Sydney to Melbourne
      </Typography>
      <Typography variant="h5" marginTop={3}>
        <b style={{ color: theme.palette.secondary.main }}>{compareMsg}</b>
      </Typography>
      {
        totalCarbonByActivity > 0 && (
          <>
            <Typography variant="h5" sx={{ marginTop: "3rem" }}>
              Top 3 Carbon-Emitting Activities
            </Typography>
            <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
              Data is in yearly basis
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Bar
                  style={{ maxWidth: 500, marginTop: "1rem", marginBottom: "1rem" }}
                  options={options}
                  data={byActivityData}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography 
                  sx={{ color: theme.palette.text.secondary, mt: 4, mb: 2  }}
                  variant="h6"
                >
                  Tips
                </Typography>
                <List>
                  {byActivityData.datasets[0].tip.map((tip, index) => (
                      <ListItem key={index}>
                          {byActivityData.datasets[0].icon[index]}
                          <Typography 
                            sx={{ color: theme.palette.text.secondary, ml: 1 }}
                          >
                            {tip}
                          </Typography>
                      </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </>
        )
      }
      
      {
        result > 0 && (
          <>
            <Typography variant="h5" sx={{ marginTop: "3rem" }}>
              Carbon Footprint By Bill Type
            </Typography>
            <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
              Data is in yearly basis
            </Typography>
            <Bar
              style={{ maxWidth: 500, marginTop: "1rem", marginBottom: "1rem" }}
              options={options}
              data={byBillData}
            />
          </>
        )
      }
      
      <Button
        style={{ marginTop: "2rem", marginRight: "1rem" }}
        variant="contained"
        onClick={cleanAndRedo}
      >
        Clean and Redo
      </Button>
      <Button
        style={{ marginTop: "2rem" }}
        variant="outlined"
        onClick={lastStep}
      >
        Back
      </Button>
    </>
  );
}
