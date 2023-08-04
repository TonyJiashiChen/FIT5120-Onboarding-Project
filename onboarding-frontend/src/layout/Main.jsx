import React from "react";
import { useState } from "react";
import { Welcome } from "../components/Welcome";
import { InfoInput } from "../components/InfoInput";
import { StepIndicator } from "../components/StepIndicator";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Result } from "../components/Result";

// steps for carbon footprint calculator
const steps = [
  {
    title: 'Welcome',
    component: <Welcome />
  }, {
    title: 'Info',
    component: <InfoInput />
  }, {
    title: 'Result',
    component: <Result />
  }
]

export function Main() {
  // current active step
  const [activeStep, setActiveStep] = useState(0);
  // postcode info
  const [postcode, setPostcode] = useState('');
  // surburb info, default to first option, structure in Welcome.jsx and according to API doc
  const [suburb, setSuburb] = useState('');
  // timeframe in months
  const [timeframe, setTimeframe] = useState({
    label: 'One Month',
    value: 1,
  });
  // electronic carbon emission
  const [electricity, setElectricity] = useState(0);
  // gas carbon emission
  const [gas, setGas] = useState(0);
  // car carbon emission
  const [car, setCar] = useState(0);
  const [result, setResult] = useState(0);

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  }
  const lastStep = () => {
    setActiveStep(activeStep - 1);
  }
  return (
    <>
      <Container maxWidth="lg">
        <StepIndicator steps={steps} activeStep={activeStep} />
        <Paper elevation={3} sx={{ padding: '2rem' }}>
          { 
            React.cloneElement(
              steps[activeStep].component, {
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
                setResult
              })
          }
        </Paper>
      </Container>
    </>
  )
}