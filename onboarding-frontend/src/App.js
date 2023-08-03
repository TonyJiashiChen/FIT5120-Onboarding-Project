import React, { useState } from "react";
import "./App.css";
import { Header } from "./layout/Header";
import { Main } from "./layout/Main";
import { Hidden, useTheme } from "@mui/material";

function App() {
  const theme = useTheme();

  return (
    <div style={{
      backgroundColor: theme.palette.background.default,
      height: '100vh'
    }}>
      <Header />
      <Main />
    </div>
  );
}

export default App;
