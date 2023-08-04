import { Button, Typography } from '@mui/material';
import { Chart as ChartJS, BarElement, Title, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";
import { useMemo } from 'react';
import { Bar } from "react-chartjs-2";
import { useTheme } from '@emotion/react';

ChartJS.register(BarElement, Title, Tooltip, Legend, CategoryScale, LinearScale);

const options = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true
    }
  }
};

const labels = [
  'Electricity',
  'Gas',
  'Privite Transport'
]

export function Result({
  lastStep,
  electricity,
  gas,
  car,
  result,
  timeframe
}) {
  const theme = useTheme();
  const data = useMemo(() => ({
    labels,
    datasets: [
      {
        label: 'Carbon footprint',
        data: [electricity, gas, car],
        backgroundColor: theme.palette.primary.main
      },
      {
        label: 'Neighbor Average Footprint',
        data: [0, 0, 0],
        backgroundColor: theme.palette.secondary.main
      }
    ]
  }), [car, electricity, gas, theme.palette.primary.main, theme.palette.secondary.main]);

  const convertToYearly = (value) => {
    return 12 / timeframe.value * value;
  }

  const getPlaneKm = () => {
    return (convertToYearly(result) / 0.115).toFixed(2);
  }

  return (
    <>
      <Typography variant="h4" sx={{marginTop: '1rem'}}>Your yearly carbon emission would be</Typography>
      <Typography variant="h2" sx={{marginTop: '1rem'}}><b style={{color: theme.palette.primary.main}}>{convertToYearly(result).toFixed(2)} kg </b></Typography>
      <Typography variant="h5" sx={{marginTop: '2rem'}}>Similar With</Typography>
      <Typography variant="h4">Taking <b style={{color: theme.palette.primary.main}}>{getPlaneKm()}km</b> of flights</Typography>
      <Typography variant="h5" sx={{marginTop: '2rem'}}>Carbon Footprint By Activity</Typography>
      <Bar style={{maxWidth: 500, marginTop: '1rem', marginBottom: '1rem'}} options={options} data={data} />
      <Button style={{marginTop: '2rem'}} variant="contained" onClick={lastStep}>Back</Button>
    </>
  )
}