import React from "react";
import { useState } from "react";
import { Welcome } from "../components/Welcome";
import { InfoInput } from "../components/InfoInput";
import { StepIndicator } from "../components/StepIndicator";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

const steps = [
  {
    title: 'Welcome',
    component: <Welcome />
  }, {
    title: 'Info',
    component: <InfoInput />
  }
]

export function Main() {
  const [activeStep, setActiveStep] = useState(0);
  const [postcode, setPostcode] = useState('');
  const [suburb, setSuburb] = useState('');
  const [timeframe, setTimeframe] = useState('');
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
                setTimeframe
              })
          }
        </Paper>
      </Container>
    </>
  )
}