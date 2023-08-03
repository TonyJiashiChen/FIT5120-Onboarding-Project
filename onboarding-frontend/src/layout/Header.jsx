import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export function Header() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <img src='/favicon-white.png' style={{height: '32px', marginRight: '1rem'}} alt='logo' />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Carbon Visualizer
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}