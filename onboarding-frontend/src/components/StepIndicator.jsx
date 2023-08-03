import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

export function StepIndicator({
  steps,
  activeStep
}) {
  return (
    <>
      <Stepper activeStep={activeStep} style={{marginTop: '24px', marginBottom: '24px'}} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.title}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  )
}