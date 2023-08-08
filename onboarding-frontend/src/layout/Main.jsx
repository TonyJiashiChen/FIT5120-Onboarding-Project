import React, { useCallback } from "react";
import { useState } from "react";
import { Welcome } from "../components/Welcome";
import { OverallUsage } from "../components/OverallUsage";
import { StepIndicator } from "../components/StepIndicator";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Result } from "../components/Result";
import { ActivityUsage } from "../components/ActivityUsage";

// steps for carbon footprint calculator
const steps = [
  {
    title: "Welcome",
    component: <Welcome />,
  },
  {
    title: "Overall Usage",
    component: <OverallUsage />,
  },
  {
    title: "Activity Usage",
    component: <ActivityUsage />,
  },
  {
    title: "Result",
    component: <Result />,
  },
];

export function Main() {
  // current active step
  const [activeStep, setActiveStep] = useState(0);
  // postcode info
  const [postcode, setPostcode] = useState("");
  // surburb info, default to first option, structure in Welcome.jsx and according to API doc
  const [suburb, setSuburb] = useState("");
  // timeframe in months
  const [timeframe, setTimeframe] = useState({
    label: "One Month",
    value: 1,
  });
  // electronic carbon emission
  const [electricity, setElectricity] = useState(0);
  // gas carbon emission
  const [gas, setGas] = useState(0);
  // car carbon emission
  const [car, setCar] = useState(0);
  const [result, setResult] = useState(0);
  const [averageElectricity, setAverageElectricity] = useState(0);
  const [averageGas, setAverageGas] = useState(0);
  const [averageEnergy, setAverageEnergy] = useState(0);
  const [averageResult, setAverageResult] = useState("");
  // activity usages
  const [activityUsages, setActivityUsages] = useState([]);

  const cleanAndRedo = useCallback(() => {
    setActiveStep(0);
    setPostcode("");
    setSuburb("");
    setTimeframe({
      label: "One Month",
      value: 1,
    });
    setElectricity(0);
    setGas(0);
    setCar(0);
    setResult(0);
    setAverageElectricity(0);
    setAverageGas(0);
    setAverageEnergy(0);
    setAverageResult("");
    setActivityUsages([]);
  }, []);

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };
  const lastStep = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <>
      <Container maxWidth="lg" sx={{paddingBottom: '4rem'}}>
        <StepIndicator
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
        <Paper elevation={3} sx={{ padding: "2rem", position: "relative" }}>
          {React.cloneElement(steps[activeStep].component, {
            activeStep,
            steps,
            nextStep,
            lastStep,
            suburb,
            setSuburb,
            postcode,
            setPostcode,
            timeframe,
            setTimeframe,
            electricity,
            setElectricity,
            gas,
            setGas,
            car,
            setCar,
            result,
            setResult,
            averageElectricity,
            setAverageElectricity,
            averageGas,
            setAverageGas,
            averageEnergy,
            setAverageEnergy,
            averageResult,
            setAverageResult,
            cleanAndRedo,
            activityUsages,
            setActivityUsages,
          })}
        </Paper>
      </Container>
    </>
  );
}
