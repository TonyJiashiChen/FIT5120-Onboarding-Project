import React from "react"

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography";
import { Container} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { PrimaryMainTheme } from "./PrimaryMainTheme";

import "./Intro.css"

export default function Intro(){
    var w = window.innerWidth;
    console.log("hello this is ", w)
    return(
        <Container>
            <ThemeProvider theme={PrimaryMainTheme}>
                <Grid container spacing={2.5}>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                            <Paper className="IntroPaper" sx={{backgroundColor: 'primary.main', p:1}}>
                                
                                <div className="IconText">
                                    <img className="IntroIcon"    
                                    src="/environmental_jog.svg"
                                    alt="environmental jog"
                                    />  

                                    <Typography className="IntroTitle" variant="h5" color="common.white" display="flex" alignItems="center" justifyContent="center">
                                    Me and Carbon Footprint
                                    </Typography>
                                </div>

                                <img className="IntroPic"
                                src="/environmental_factory.svg"
                                alt="environmental factory"
                                /> 

                                <Typography variant="h7" color="common.white" display="inline-block" overflow="hidden">
                                Carbon footprint quantifies individual environmental impact.
                                It helps Victorian households achieve sustainability living 
                                and create a greener future for the community.
                                </Typography>
                            </Paper>
                        </Grid>
                        
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                            <Paper className="IntroPaper" sx={{backgroundColor: 'primary.main', p:1}}>   
                                <div className="IconText">
                                    <img className="IntroIcon"       
                                    src="/environmental_world.svg"
                                    alt="environmental world"
                                    /> 
                                    
                                    <Typography className="IntroTitle" variant="h5" color="common.white" sx={{display:"flex", alignItems: "center", justifyContent: "center"}}>
                                    What is my impact?
                                    </Typography>
                                </div>  

                                <img className="IntroPic"
                                src="/environmental_study.svg"
                                alt="environmental study"
                                /> 

                                <Typography variant="h7" color="common.white" display="inline-block" overflow="hidden">
                                    The Carbon Visualizer contrasts your total carbon footprint 
                                    with the average for your suburb based on 2 provided options, 
                                    helping you assess your environmental performance.
                                </Typography>
                            </Paper>
                        </Grid>
                        
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                            <Paper className="IntroPaper" sx={{backgroundColor: 'primary.main', p:1}}>                        
                                <div className="IconText">
                                    <img className="IntroIcon"       
                                    src="/environmental_successful.svg"
                                    alt="environmental successful"
                                    /> 

                                    <Typography className="IntroTitle" variant="h5" color="common.white" sx={{display:"flex", alignItems: "center", justifyContent: "center"}}>
                                        What can I do?
                                    </Typography>
                                </div>

                                <img className="IntroPic"
                                src="/environmental_change.svg"
                                alt="environmental change"
                                />                                

                                <Typography variant="h7" color="common.white" display="inline-block" overflow="hidden">
                                    The Carbon Visualiser allows you to compares each of your activity's carbon footprint 
                                    and provides call-to-action suggestions specific to the top 3 carbon emitting activities.
                                </Typography>
                            </ Paper>
                        </Grid>
                </Grid>
            </ThemeProvider>
        </Container>
    )
}