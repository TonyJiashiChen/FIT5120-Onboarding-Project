import { Button, Typography } from "@mui/material";
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

// const byBillLabels = ["Electricity", "Gas", "Privite Transport"];

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

  const getComparison = useCallback(() => {
    var percentage = 0;
    console.log(averageElectricity);
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
  }, [averageElectricity, largestCarbon, suburb.suburb]);

  const convertToYearly = useCallback((value) => {
    return (12 / timeframe.value) * value;
  }, [timeframe.value]);

  const isScreenLargerThanMd = useMediaQuery(theme.breakpoints.up("md"));
  // const byBillData = useMemo(
  //   () => ({
  //     labels: byBillLabels,
  //     datasets: [
  //       {
  //         label: "Carbon footprint",
  //         data: [convertToYearly(electricity), convertToYearly(gas), convertToYearly(car)],
  //         backgroundColor: theme.palette.primary.main,
  //       },
  //       {
  //         label: "Neighbor Average Footprint",
  //         data: [0, 0, 0],
  //         backgroundColor: theme.palette.secondary.main,
  //       },
  //     ],
  //   }),
  //   [
  //     car,
  //     electricity,
  //     gas,
  //     convertToYearly,
  //     theme.palette.primary.main,
  //     theme.palette.secondary.main,
  //   ]
  // );

  const planeRounds = useMemo(() => {
    return (convertToYearly(largestCarbon) / 0.115 / 758).toFixed(2);
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
          backgroundColor: theme.palette.primary.main,
        },
      ],
    };
  }, [activityUsages, theme.palette.primary.main]);

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
        <b style={{ color: theme.palette.secondary.main }}>{getComparison()}</b>
      </Typography>
      <Typography variant="h5" sx={{ marginTop: "3rem" }}>
        Top 3 Carbon-Emitting Activities
      </Typography>
      <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
        Data is in yearly basis
      </Typography>
      <Bar
        style={{ maxWidth: 500, marginTop: "1rem", marginBottom: "1rem" }}
        options={options}
        data={byActivityData}
      />
      {/* <Typography variant="h5" sx={{ marginTop: "3rem" }}>
        Carbon Footprint By Bill Type
      </Typography>
      <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
        Data is in yearly basis
      </Typography>
      <Bar
        style={{ maxWidth: 500, marginTop: "1rem", marginBottom: "1rem" }}
        options={options}
        data={byBillData}
      /> */}
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
