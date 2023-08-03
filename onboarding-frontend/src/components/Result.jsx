import { Button } from '@mui/material';

export function Result({
  lastStep
}) {
  return (
    <>
      <h1>Result</h1>
      <Button variant="contained" onClick={lastStep}>Back</Button>
    </>
  )
}