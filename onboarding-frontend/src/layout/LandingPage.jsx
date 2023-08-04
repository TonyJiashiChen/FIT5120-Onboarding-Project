import React from "react";
import { useTransition, a } from "react-spring"
import { useTheme } from "@mui/material";
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

import Trail from '../components/Trail'


const LandingPage = (props) => {
    const theme = useTheme()

    const fullscreenPage = useTransition(props.landingToggled,{
        from: {opacity: 1, transform: "scale(1)"},
        enter: {opacity: 1, transform: "scale(1)"},
        leave: {opacity: 0, transform: "translate3d(-50%,0,0)"},
        config: {duration: 750}
    })


    return (
        <div>
        {fullscreenPage((styles, item) => item && <a.div style={{
            ...styles,
            position: "fixed",
            maxHeight: "100vh",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            flexDirection: 'column',
            justifyContent: "center",
            backgroundColor: theme.palette.primary.main,
            zIndex: 10
        }}
        
        >
            <div
                style={{
                    display: 'flex',
                    maxHeight: '30vh',
                    flexDirection: 'row'
                }}
            >
            <img src='/favicon-white.png' style={{height: '32px', marginRight: '1rem', marginTop: '0.5rem'}} alt='logo' />
            <Typography variant="h3" color='common.white'>
                Carbon Visualizer
            </Typography>
            
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '3rem'
                }}
            >
            <Typography variant="h6" color='common.white'>Understand your environmental impact and take action today!</Typography>
            </div>
            
            <Trail open={props.landingToggled}>
                
                <Typography variant="h4" color='common.white'>What's my</Typography>
                <Typography variant="h4" color='common.white'>carbon footprint?</Typography>
            </Trail>
            

            <Button 
                variant="contained" 
                sx={ { borderRadius: 30 } }
                style={{
                    maxWidth: '150px', 
                    maxHeight: '150px', 
                    minWidth: '150px', 
                    minHeight: '150px',
                    backgroundColor: theme.palette.primary.dark
                }}
                onClick={props.handleLandingToggle}
            >
                Calculate Now
            </Button>

        </a.div>)}
        </div>
    )
}

export default LandingPage