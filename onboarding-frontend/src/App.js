import React, { useState, createContext }from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import "./App.css";
import { Header } from "./layout/Header";
import { Main } from "./layout/Main";
import LandingPage from "./layout/LandingPage"
import { useTheme } from "@mui/material";

export const AuthApi = createContext();

function App() {
  const theme = useTheme();

  const [auth, setAuth] = useState(false);

  return (
    <AuthApi.Provider value={{ auth, setAuth }}>
    <Router>
    <div style={{
      backgroundColor: theme.palette.background.default,
      height: '100%',
    }}>
      <Routes>
          <Route path="/" element={
            <LandingPage />
          }/>
          <Route path="/home" element={
              ProtectedRoute({
                auth: auth, 
                component: () => (
                  <>
                    <Header />
                    <Main />
                  </>
                ), 
                fallback: <Navigate to="/" />
              })
            } />
            
        </Routes>
    </div>
    </Router>
    </AuthApi.Provider>
  );
}

function ProtectedRoute({ auth, component: Component, fallback }) {
  return auth ? <Component /> : fallback;
}

export default App;
