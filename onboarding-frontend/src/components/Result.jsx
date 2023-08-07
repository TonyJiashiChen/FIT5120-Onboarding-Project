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
import { useMemo } from "react";
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

const labels = ["Electricity", "Gas", "Privite Transport"];

export function Result({
  lastStep,
  electricity,
  gas,
  car,
  result,
  timeframe,
  cleanAndRedo,
  suburb,
}) {
  const theme = useTheme();
  const isScreenLargerThanMd = useMediaQuery(theme.breakpoints.up("md"));
  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Carbon footprint",
          data: [electricity, gas, car],
          backgroundColor: theme.palette.primary.main,
        },
        {
          label: "Neighbor Average Footprint",
          data: [0, 0, 0],
          backgroundColor: theme.palette.secondary.main,
        },
      ],
    }),
    [
      car,
      electricity,
      gas,
      theme.palette.primary.main,
      theme.palette.secondary.main,
    ]
  );

  const convertToYearly = (value) => {
    return (12 / timeframe.value) * value;
  };

  const getPlaneRounds = () => {
    return (convertToYearly(result) / 0.115 / 758).toFixed(2);
  };

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
        <b style={{ color: theme.palette.primary.main }}>
          {convertToYearly(result).toFixed(2)} kg{" "}
        </b>
      </Typography>
      <Typography variant="h5" sx={{ marginTop: "2rem" }}>
        Similar With Carbon Emission
      </Typography>
      <Typography variant="h4">
        <b style={{ color: theme.palette.primary.main }}>{getPlaneRounds()}</b>{" "}
        flights from Sydney to Melbourne
      </Typography>
      <Typography variant="h5" sx={{ marginTop: "3rem" }}>
        Carbon Footprint By Activity
      </Typography>
      <Bar
        style={{ maxWidth: 500, marginTop: "1rem", marginBottom: "1rem" }}
        options={options}
        data={data}
      />
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
