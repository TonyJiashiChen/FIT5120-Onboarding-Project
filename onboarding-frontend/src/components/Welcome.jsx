import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material";

const options = [
  {
    "postcode": 3802,
    "suburb": "Endeavour Hills",
    "latitude": -37.97020387932868,
    "longitude": 145.2562723381787
  },
  {
    "postcode": 3807,
    "suburb": "Beaconsfield",
    "latitude": -38.055213443730615,
    "longitude": 145.3660402905909
  },
  {
    "postcode": 3978,
    "suburb": "Clyde and Clyde North",
    "latitude": -38.128774486217914,
    "longitude": 145.35587854314844
  },
  {
    "postcode": 3803,
    "suburb": "Hallam",
    "latitude": -38.007567081050084,
    "longitude": 145.26891675520798
  },
  {
    "postcode": 3806,
    "suburb": "Berwick and Harkaway",
    "latitude": -38.02737301912716,
    "longitude": 145.35162892874706
  },
  {
    "postcode": 3976,
    "suburb": "Hampton Park",
    "latitude": -38.0386345283274,
    "longitude": 145.26866310174384
  },
  {
    "postcode": 3156,
    "suburb": "Lysterfield South",
    "latitude": -37.952494433947635,
    "longitude": 145.26696070561252
  },
  {
    "postcode": 3804,
    "suburb": "Narre Warren North",
    "latitude": -37.98192494004503,
    "longitude": 145.3132574801433
  },
  {
    "postcode": 3975,
    "suburb": "Lynbrook and Lyndhurst",
    "latitude": -38.06185951316981,
    "longitude": 145.25302722972947
  },
  {
    "postcode": 3980,
    "suburb": "Blind Bight , Tooradin and Warneet",
    "latitude": -38.205491632708714,
    "longitude": 145.36995224637462
  },
  {
    "postcode": 3805,
    "suburb": "Narre Warren and Narre Warren South",
    "latitude": -38.03656411385693,
    "longitude": 145.30428192002296
  },
  {
    "postcode": 3912,
    "suburb": "Pearcedale",
    "latitude": -38.19712264995437,
    "longitude": 145.25075485842544
  },
  {
    "postcode": 3177,
    "suburb": "Doveton and Eumemmerring",
    "latitude": -37.9905805847808,
    "longitude": 145.2402222123229
  },
  {
    "postcode": 3977,
    "suburb": "Botanic Ridge, Cannons Creek, Cranbourne, Cranbourne East, Cranbourne North, Cranbourne South, Cranbourne West, Devon Meadows and Junction Village",
    "latitude": -38.13735705358775,
    "longitude": 145.2836422978307
  }
]

const timeframes = [{
  label: 'One Month',
  value: 1,
},{
  label: 'Three Months',
  value: 3,
}, {
  label: 'One Year',
  value: 12,
}]

export function Welcome({
  nextStep,
  timeframe,
  setTimeframe,
  suburb,
  setSuburb,
  postcode,
  setPostcode
}) {
  const theme = useTheme();

  React.useEffect(() => {
    setSuburb(options[0]);
    setPostcode(options[0].postcode);
  }, [setSuburb, setPostcode]);
  return (
    <>
      <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
        Welcome to the Carbon Visualizer!
      </Typography>
      <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
        This tool will help you visualize the carbon footprint of your daily activities.
      </Typography>
      <Typography variant="h5" component="div" sx={{ flexGrow: 1, marginTop: '2rem' }}>
        Select a suburb for comparasion
      </Typography>
      <Autocomplete 
        disablePortal 
        options={options} 
        value={suburb}
        onChange={(event, newValue) => {
          setSuburb(newValue);
          setPostcode(newValue.postcode);
        }}
        sx={{ maxWidth: 400, marginTop: '1rem' }} 
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            {option.suburb} ({option.postcode})
          </Box>
        )}
        renderInput={(params) => <TextField {...params} label="Enter your suburb" helperText="Compare your carbon consumption with your neighbors." />}
        getOptionLabel={(option) => option.suburb}
        disableClearable
      />

      <Typography variant="h5" component="div" sx={{ flexGrow: 1, marginTop: '2rem' }}>
        Select a time period to visualize
      </Typography>
      <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1, marginTop: '0.5rem' }}>
        Your selection: <b>{timeframe.label}</b>
      </Typography>
      
      <div style={{display: 'flex', flexDirection: 'row', marginTop: '1rem', flexWrap: 'wrap', gap: '1rem'}}>
      {
        timeframes.map(tf => (
          <Card variant={tf.value === timeframe.value?'elevation':'outlined'} sx={{ minWidth: 200, maxWidth: 300, marginTop: '1rem', border: tf.value===timeframe.value?`3px solid ${theme.palette.primary.main}`:`2px dashed ${theme.palette.primary.main}` }}>
            <CardActionArea onClick={() => {setTimeframe(tf)}}>
              <CardContent sx={{height: 120, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Typography gutterBottom variant="h5" component="div">
                  {tf.label}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))
      }
      </div>
      <Button sx={{marginTop: '3rem'}} disabled={!(suburb&&timeframe)} variant="contained" onClick={nextStep}>Next</Button>
    </>
  )
}