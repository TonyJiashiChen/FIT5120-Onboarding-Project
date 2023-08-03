import React from "react";
import { Button, Typography } from "@mui/material";

export function Welcome({
  nextStep
}) {
  return (
    <>
      <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
        Welcome to the Carbon Visualizer!
      </Typography>
      <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
        This tool will help you visualize the carbon footprint of your daily activities.
      </Typography>
      <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
        Let's get started!
      </Typography>
      <Button variant="contained" onClick={nextStep}>Next</Button>
    </>
  )
}