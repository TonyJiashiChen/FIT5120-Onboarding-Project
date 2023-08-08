import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
//import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
//import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
//import PasswordIcon from '@mui/icons-material/Password';
//import IconButton from "@mui/material/IconButton";
//import VisibilityOff from "@mui/icons-material/VisibilityOff";
//import Visibility from "@mui/icons-material/Visibility";

import Trail from "../components/Trail";
import { AuthApi } from "../App";
//import { ThemeProvider, createTheme } from '@mui/material/styles';
/*
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#eee'
    },
    error: {
      main: '#ff1744',
    }
  },
});
*/

const LandingPage = () => {
  const theme = useTheme();

  //const [password, setPassword] = useState("");
  //const [error, setError] = useState(false);

  const { setAuth } = useContext(AuthApi);

  const navigate = useNavigate();

  //const [showPassword, setShowPassword] = useState(false);

  const handlePasswordCheck = () => {
    //const CORRECT_PASSWORD = "carbonvisualizer";
    if (true) {
      //setError(false);
      setAuth(true);
      navigate("/home");
    } else {
      //setError(true);
      setAuth(false);
      //setPassword("");
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
            marginTop: "2rem",
            alignItems: "center",
            flexDirection: "row",
            marginBottom: "2rem",
          }}
        >
          <img
            src="/favicon-white.png"
            style={{
              height: "2.8rem",
              marginRight: "1rem",
              marginTop: "0.5rem",
            }}
            alt="logo"
          />
          <Typography variant="h3" color="common.white">
            Carbon Visualiser
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
        {/*
        <ThemeProvider theme={darkTheme}>
          
          <TextField
            error={error}
            helperText={error ? "Incorrect password" : ""}
            type={showPassword ? "text" : "password"}
            value={password}
            label="Password"
            placeholder="Enter password"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handlePasswordCheck();
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon style={{color: "common.white"}} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            sx={{
              input: { color: "common.white", textAlign: "center" },
            }}
          />
        </ThemeProvider>
        */}
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
