import { Button } from "@mui/material";
import React from "react";
import StepTwo from "./StepTwo";

export function InfoInput({ activeStep, steps, nextStep, lastStep }) {
  return (
    <>
      <StepTwo />
      <Button variant="contained" onClick={lastStep}>
        Back
      </Button>
      {activeStep === steps.length - 1 ? (
        <Button variant="contained" onClick={nextStep}>
          Finish
        </Button>
      ) : (
        <Button variant="contained" onClick={nextStep}>
          Next
        </Button>
      )}
    </>
  );
}
