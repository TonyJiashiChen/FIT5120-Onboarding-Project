import React, { useCallback } from "react";
import { useState } from "react";
import { Welcome } from "../components/Welcome";
import { OverallUsage } from "../components/OverallUsage";
import { StepIndicator } from "../components/StepIndicator";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Result } from "../components/Result";
import { ActivityUsage } from "../components/ActivityUsage";

// bill based steps for carbon footprint calculator
const stepsBillMode = [
  {
    title: "Welcome",
    component: <Welcome />,
  },
  {
    title: "Activity Usage",
    component: <OverallUsage />,
  },
  {
    title: "Result",
    component: <Result />,
  },
];

// activity based steps for carbon footprint calculator
const stepsActivityMode = [
  {
    title: "Welcome",
    component: <Welcome />,
  },
  {
    title: "Overall Usage",
    component: <ActivityUsage />,
  },
  {
    title: "Result",
    component: <Result />,
  },
];

export function Main() {
  //step activity mode
  const [stepActivityMode, setStepActivityMode] = useState(true);
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
  // average electricity usage in the area
  const [averageElectricity, setAverageElectricity] = useState(0);
  // average gas usage in the area
  const [averageGas, setAverageGas] = useState(0);
  // average energy usage in the area
  const [averageEnergy, setAverageEnergy] = useState(0);
  // average total carbon emission in the area
  const [averageResult, setAverageResult] = useState("");
  // activity usages
  const [activityUsages, setActivityUsages] = useState([]);

  // resets all user inputs and results
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

  // go to the next step
  const nextStep = useCallback(() => {
    if (activeStep < stepsBillMode.length - 1) {
      setActiveStep(activeStep + 1);
    }
  }, [setActiveStep, activeStep]);

  // go to the previous step
  const lastStep = useCallback(() => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  }, [setActiveStep, activeStep]);

  return (
    <>
      <Container maxWidth="lg" sx={{ paddingBottom: "4rem" }}>
        <StepIndicator
          steps={stepActivityMode ? stepsBillMode : stepsActivityMode}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
        <Paper elevation={3} sx={{ padding: "2rem", position: "relative" }}>
          {React.cloneElement(
            stepActivityMode
              ? stepsActivityMode[activeStep].component
              : stepsBillMode[activeStep].component,
            {
              stepActivityMode,
              setStepActivityMode,
              activeStep,
              steps: stepsBillMode,
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
            }
          )}
        </Paper>
      </Container>
    </>
  );
}
