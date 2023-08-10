import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
//import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
//import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Intro from "./Intro";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
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

  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.primary.main;
    return () => {document.body.style.backgroundColor = theme.palette.background.default};
  }, [theme.palette.primary.main, theme.palette.background.default]);

  return (
      <Box
        height="100vh" 
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <div
          style={{
            display: "flex",
            maxHeight: "20%",
            marginTop: "1rem",
            flexDirection: "row",
            marginBottom: "2rem",
          }}
        >
          <img
            src="/favicon-white.png"
            style={{
              height: "2.8rem",
              marginLeft: "1rem",
              marginRight: "1rem",
              marginTop: "0.5rem",
            }}
            alt="logo"
          />
          <Typography variant="h3" color="common.white">
            Carbon Visualiser
          </Typography>
        </div>
        <Grid>
          <Trail open={true}>
            <Grid item mn={9}>
              <Intro />
            </Grid>
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
          <Grid item mn={3} display="flex" justifyContent={"center"}>
            <Button
              variant="contained"
              style={{
                marginBottom: "4rem ",
                marginTop: "8rem",
                maxWidth: "200px",
                maxHeight: "100px",
                minWidth: "200px",
                minHeight: "100px",
                backgroundColor: theme.palette.primary.dark,
              }}
              onClick={handlePasswordCheck}
            >
              <Typography variant="h6" color="common.white">
                Start <br></br>Action
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
  );
};

export default LandingPage;
