import React, { useState } from "react";
import "./App.css";
import { Header } from "./layout/Header";
import { Main } from "./layout/Main";
import LandingPage from "./layout/LandingPage"
import { Hidden, useTheme } from "@mui/material";

function App() {
  const theme = useTheme();

  const [landingToggled, setLandingToggled] = useState(true);

  const handleLandingToggle = () => {
    setLandingToggled(prev => !prev)
  }

  return (
    <div style={{
      backgroundColor: theme.palette.background.default,
      height: '100vh'
    }}>
      <LandingPage
        landingToggled={landingToggled}
        handleLandingToggle={handleLandingToggle}
      />
      <Header />
      <Main />
    </div>
  );
}

export default App;
