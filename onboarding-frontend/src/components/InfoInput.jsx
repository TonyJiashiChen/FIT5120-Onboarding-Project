import {Button, Box, Divider, AccordionSummary, Accordion, AccordionDetails} from "@mui/material";
import React, {useState} from "react";
import {TextField, Typography, Grid, InputAdornment} from "@mui/material";
import {useEffect} from "react";
import {useTheme} from '@emotion/react';
import useMediaQuery from "@mui/material/useMediaQuery";
import {blue} from "@mui/material/colors";

import './InfoInput.css'

export function InfoInput({
                              activeStep,
                              steps,
                              nextStep,
                              lastStep,
                              electricity,
                              gas,
                              car,
                              result,
                              setElectricity,
                              setGas,
                              setCar,
                              setResult
                          }) {

    const [electricityUsage, setElectricityUsage] = useState(0);
    const [gasUsage, setGasUsage] = useState(0);
    const [carUsage, setCarUsage] = useState(0);

    const theme = useTheme();
    const isScreenLargerThanMd = useMediaQuery(theme.breakpoints.up('md'));

    const [expanded, setExpanded] = React.useState('panel1');
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    const handleNumericInputChange = (event, setterFunc) => {
        const value = event.target.value;
        const numericRegex = /^[0-9]*$/;  // This regex matches any string that contains only digits.
        if (numericRegex.test(value) || value === '') {
            setterFunc(value);
        }
    };

    useEffect(() => {
        setElectricity(electricityUsage * 0.85);
        setGas(gasUsage * 11.7 * 0.02);
        setCar(carUsage * 0.146);
    }, [carUsage, electricityUsage, gasUsage, setCar, setElectricity, setGas]);

    useEffect(() => {
        setResult(electricity + gas + car);
    }, [car, electricity, gas, setResult]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <Typography variant="h4" sx={{marginTop: '1rem', textAlign: 'center'}}>Calculate Your Carbon
                    Footprint</Typography>
                <Divider></Divider>
            </Grid>

            <Grid container item xs={12} md={8} alignItems="center" sx={{marginTop: '2rem', alignItems:'start'}}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        // expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{width: '40%', flexShrink: 0}}>
                            Summary
                        </Typography>
                        <Typography sx={{color: 'text.secondary'}}>Summary the cost</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid item xs={12} md={12}>
                            <Grid container className={'inputGroup'} alignItems="center" spacing={2}>
                                <Grid item xs={12} md={3}>
                                    <Typography variant="h5">Electricity:</Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        type="text"
                                        label="Electricity"
                                        value={electricityUsage}
                                        onChange={(event) => {
                                            handleNumericInputChange(event, setElectricityUsage);
                                        }}
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">Kwh</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <Typography variant="h6" sx={{color: '#11C5A7'}}>{electricity.toFixed(2)} kg
                                        CO2</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Grid container className={'inputGroup'} alignItems="center" spacing={2}>
                                <Grid item xs={12} md={3}>
                                    <Typography variant="h5">Gas:</Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        type="text"
                                        label="Gas"
                                        value={gasUsage}
                                        onChange={(event) => {
                                            handleNumericInputChange(event, setGasUsage);
                                        }}
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">MJ</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <Typography variant="h6" sx={{color: '#11C5A7'}}>{gas.toFixed(2)} kg
                                        CO2</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Grid container className={'inputGroup'} alignItems="center" spacing={2}>
                                <Grid item xs={12} md={3}>
                                    <Typography variant="h5">Car:</Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        type="text"
                                        label="Car"
                                        value={carUsage}
                                        onChange={(event) => {
                                            handleNumericInputChange(event, setCarUsage);
                                        }}
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">km</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <Typography variant="h6" sx={{color: '#11C5A7'}}>{car.toFixed(2)} kg
                                        CO2</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        // expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography sx={{width: '40%', flexShrink: 0}}>
                            Summary
                        </Typography>
                        <Typography sx={{color: 'text.secondary'}}>Summary the cost</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid item xs={12} md={12}>
                            <Grid container className={'inputGroup'} alignItems="center" spacing={2}>
                                <Grid item xs={12} md={3}>
                                    <Typography variant="h5">Electricity:</Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        type="text"
                                        label="Electricity"
                                        value={electricityUsage}
                                        onChange={(event) => {
                                            handleNumericInputChange(event, setElectricityUsage);
                                        }}
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">Kwh</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <Typography variant="h6" sx={{color: '#11C5A7'}}>{electricity.toFixed(2)} kg
                                        CO2</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Grid container className={'inputGroup'} alignItems="center" spacing={2}>
                                <Grid item xs={12} md={3}>
                                    <Typography variant="h5">Gas:</Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        type="text"
                                        label="Gas"
                                        value={gasUsage}
                                        onChange={(event) => {
                                            handleNumericInputChange(event, setGasUsage);
                                        }}
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">MJ</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <Typography variant="h6" sx={{color: '#11C5A7'}}>{gas.toFixed(2)} kg
                                        CO2</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Grid container className={'inputGroup'} alignItems="center" spacing={2}>
                                <Grid item xs={12} md={3}>
                                    <Typography variant="h5">Car:</Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        type="text"
                                        label="Car"
                                        value={carUsage}
                                        onChange={(event) => {
                                            handleNumericInputChange(event, setCarUsage);
                                        }}
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">km</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <Typography variant="h6" sx={{color: '#11C5A7'}}>{car.toFixed(2)} kg
                                        CO2</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>


            <Grid item className={'total'} xs={12} md={4} sx={{marginTop: '2rem', alignContent: 'center'}}>
                <Typography sx={{fontSize: '1rem', color: 'grey'}}>
                    Total Carbon Footprint
                </Typography>
                <Typography sx={{fontSize: '4rem',textShadow: '2px 2px 4px lightgrey'}}>
                    <span style={{color: '#11C5A7'}}>{result.toFixed(2)}</span>
                </Typography>
                <Typography sx={{fontSize: '1rem', color: 'grey'}}>
                    kg CO2
                </Typography>
            </Grid>

            <Grid container item md={12} sx={{marginTop: '1rem'}}>
                <Grid item xs={12} md={12}>
                    <Box display="flex" justifyContent="center">
                        <Button variant="contained"
                                style={{backgroundColor: 'white', color: theme.palette.primary.main}}
                                onClick={lastStep}>Back</Button>
                        <Button variant="contained" color="primary" onClick={nextStep}
                                sx={{marginLeft: 2}}>Next</Button>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
}
