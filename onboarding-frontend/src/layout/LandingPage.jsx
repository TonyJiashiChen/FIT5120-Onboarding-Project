import React, { useState, useEffect } from "react";
import { useTransition, a } from "react-spring"
import { useTheme } from "@mui/material";
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

import Trail from '../components/Trail'


const LandingPage = (props) => {
    const theme = useTheme()

    const [windowHeight, setWindowHeight] = useState(window.innerHeight)

    
    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight)
        }
        window.addEventListener('resize', handleResize);
        console.log(windowHeight)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    

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
            height: `${windowHeight}px`,
            padding: '10px',
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
                    maxHeight: `${windowHeight/3}px`,
                    flexDirection: 'row',
                    marginBottom: '2rem'
                }}
            >
            <img src='/favicon-white.png' style={{height: '32px', marginRight: '1rem', marginTop: '0.5rem'}} alt='logo' />
            <Typography variant="h3" color='common.white'>
                Carbon Visualizer
            </Typography>
            
            </div>
            
            <Trail open={props.landingToggled}>
                <Typography variant="h6" color='common.white'>Understand your environmental impact and take action today!</Typography>

                <Typography variant="h4" color='common.white'>What's my</Typography>
                <Typography variant="h4" color='common.white'>carbon footprint?</Typography>
            </Trail>
            

            <Button 
                variant="contained" 
                style={{
                    maxWidth: '200px', 
                    maxHeight: '100px', 
                    minWidth: '200px', 
                    minHeight: '100px',
                    backgroundColor: theme.palette.primary.dark
                }}
                onClick={props.handleLandingToggle}
            >
                
                <Typography variant="h6" color='common.white'>Calculate Now</Typography>
            </Button>
            <img src="/environmental_study.svg" style={{ marginTop: 'auto', height: `${windowHeight/3}px` }} alt="environmental study" />
        </a.div>)}
        </div>
    )
}

export default LandingPage