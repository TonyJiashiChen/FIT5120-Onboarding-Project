import Grid  from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";

export function ActivityUsage({
  nextStep,
  lastStep,
}) {
  const theme = useTheme();

  return (
    <>
      <h1>Activity</h1>
      <Grid item xs={12} md={12}>
        <Box>
          <Button
            variant="contained"
            style={{
              backgroundColor: "white",
              color: theme.palette.primary.main,
            }}
            onClick={lastStep}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={nextStep}
            sx={{ marginLeft: 2 }}
          >
            Next
          </Button>
        </Box>
      </Grid>
    </>
  );
}
