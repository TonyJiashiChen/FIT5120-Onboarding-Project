import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { useTransition, a } from "react-spring";
import { useTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Trail from "../components/Trail";
import { AuthApi } from '../App';

const LandingPage = () => {
  const theme = useTheme();

  const [password, setPassword] = useState('');
  const [error, setError] = useState(false)

  const { setAuth } = useContext(AuthApi);

  const navigate = useNavigate();

  const handlePasswordCheck = () => {
    const CORRECT_PASSWORD = 'carbonvisualizer';
    if (password === CORRECT_PASSWORD) {
        setError(false);
        setAuth(true);
        navigate('/home');
    } else {
      setError(true);
      setAuth(false);
      setPassword('');
    }
  };

  return (
    <div>
        <div
              style={{
                position: "fixed",
                height: "100%",
                padding: "10px",
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: theme.palette.primary.main,
                zIndex: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  maxHeight: "20%",
                  flexDirection: "row",
                  marginBottom: "2rem",
                }}
              >
                <img
                  src="/favicon-white.png"
                  style={{
                    height: "32px",
                    marginRight: "1rem",
                    marginTop: "0.5rem",
                  }}
                  alt="logo"
                />
                <Typography variant="h3" color="common.white">
                  Carbon Visualizer
                </Typography>
              </div>

              <Trail open={true}>
                <Typography variant="h6" color="common.white">
                  Understand your environmental impact and take action today!
                </Typography>

                <Typography variant="h4" color="common.white">
                  What's my
                </Typography>
                <Typography variant="h4" color="common.white">
                  carbon footprint?
                </Typography>
              </Trail>

              <TextField 
                    error={error}
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter password"
                    variant="filled"
                    sx={{
                        input: { color : 'common.white'}
                    }}

              />
              <Button
                variant="contained"
                style={{
                  marginTop: "2rem",
                  maxWidth: "200px",
                  maxHeight: "100px",
                  minWidth: "200px",
                  minHeight: "100px",
                  backgroundColor: theme.palette.primary.dark,
                }}
                onClick={handlePasswordCheck}
              >
                <Typography variant="h6" color="common.white">
                  Calculate Now
                </Typography>
              </Button>
              <img
                src="/environmental_study.svg"
                style={{ marginTop: "auto", height: "30%" }}
                alt="environmental study"
              />
            </div>
    </div>
  );
};

export default LandingPage;
