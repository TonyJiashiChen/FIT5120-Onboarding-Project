import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', flexDirection: 'row' }}>
            <img src='/favicon-white.png' style={{height: '32px', marginRight: '1rem'}} alt='logo' />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Carbon Visualiser
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  )
}