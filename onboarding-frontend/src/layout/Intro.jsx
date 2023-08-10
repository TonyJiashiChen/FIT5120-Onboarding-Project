import React from "react"
import { useSpring, a } from 'react-spring';

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container} from "@mui/material";
import { useTheme } from "@mui/material";

import "./Intro.css"

export default function Intro(){
    
    const theme = useTheme();


    return(
        <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                            <ScaleOnHover>
                            <Paper className="IntroPaper" sx={{backgroundColor: theme.palette.primary.dark, p:1}}>
                                
                                <div className="IconText">
                                    <img className="IntroIcon"    
                                    src="/environmental_jog.svg"
                                    alt="environmental jog"
                                    />  

                                    <Typography className="IntroTitle" variant="h6" color="common.white" display="flex" alignItems="center" justifyContent="center">
                                    Me and Carbon Footprint
                                    </Typography>
                                </div>

                                <Box
                                    display='flex'
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    textAlign="center"
                                    className="IntroPaperBox"
                                >
                                <img className="IntroPic"
                                src="/environmental_factory.svg"
                                alt="environmental factory"
                                /> 

                                <Typography variant="h7" color="common.white" display="inline-block" overflow="hidden">
                                Carbon footprint quantifies individual environmental impact.
                                It helps Victorian households achieve sustainability living 
                                and create a greener future for the community.
                                </Typography>
                                </Box>
                            </Paper>
                            </ScaleOnHover>
                        </Grid>
                        
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                            <ScaleOnHover>
                            <Paper className="IntroPaper" sx={{backgroundColor: theme.palette.primary.dark, p:1}}>   
                                <div className="IconText">
                                    <img className="IntroIcon"       
                                    src="/environmental_world.svg"
                                    alt="environmental world"
                                    /> 
                                    
                                    <Typography className="IntroTitle" variant="h6" color="common.white" sx={{display:"flex", alignItems: "center", justifyContent: "center"}}>
                                    What is my impact?
                                    </Typography>
                                </div>  
                                <Box
                                    display='flex'
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    textAlign="center"
                                    className="IntroPaperBox"
                                >
                                <img className="IntroPic"
                                src="/environmental_study.svg"
                                alt="environmental study"
                                /> 

                                <Typography variant="h7" color="common.white" display="inline-block" overflow="hidden">
                                    The Carbon Visualiser contrasts your total carbon footprint 
                                    with the average for your suburb based on 2 provided options, 
                                    helping you assess your environmental performance.
                                </Typography>
                                </Box>
                            </Paper>
                            </ScaleOnHover>
                        </Grid>
                        
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                            <ScaleOnHover>
                            <Paper className="IntroPaper" sx={{backgroundColor: theme.palette.primary.dark, p:1}}>                        
                                <div className="IconText">
                                    <img className="IntroIcon"       
                                    src="/environmental_successful.svg"
                                    alt="environmental successful"
                                    /> 

                                    <Typography className="IntroTitle" variant="h6" color="common.white" sx={{display:"flex", alignItems: "center", justifyContent: "center"}}>
                                        What can I do?
                                    </Typography>
                                </div>
                                <Box
                                    display='flex'
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    textAlign="center"
                                    className="IntroPaperBox"
                                >
                                <img className="IntroPic"
                                src="/environmental_change.svg"
                                alt="environmental change"
                                />                                

                                <Typography variant="h7" color="common.white" display="inline-block" overflow="hidden">
                                    The Carbon Visualiser allows you to compares each of your activity's carbon footprint 
                                    and provides call-to-action suggestions specific to the top 3 carbon emitting activities.
                                </Typography>
                                </Box>
                            </ Paper>
                            </ScaleOnHover>
                        </Grid>
                </Grid>
        </Container>
    )
}

const ScaleOnHover = ({ children }) => {
    const [springProps, setSpringProps] = useSpring(() => ({
      transform: 'scale(1)',
      config: {
        tension: 400, 
        friction: 40,
      }
    }));
  
    return (
      <a.div
        style={springProps}
        onMouseEnter={() => setSpringProps({ transform: 'scale(1.02)' })}
        onMouseLeave={() => setSpringProps({ transform: 'scale(1)' })}
        onTouchStart={() => setSpringProps({ transform: 'scale(1.02)' })}
        onTouchEnd={() => setSpringProps({ transform: 'scale(1)' })}
      >
        {children}
      </a.div>
    );
  }