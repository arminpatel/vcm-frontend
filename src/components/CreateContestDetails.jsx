import React from "react";
import { Typography, Grid, TextField } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";


const CreateContestDetails = () => {
  return (
    <>
      <Typography variant="h5" align="left">
        CONTEST DETAILS
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} mt={5}>
          <TextField
            label="Contest Name"
            fullWidth
            variant="outlined"
            required
          />
        </Grid>
        <Grid item sm={6}>
          <DatePicker label="Contest Start Date" required />
        </Grid>
        <Grid item sm={6}>
          <TimePicker label="Contest Start Time" required />
        </Grid>

        <Grid item xs={12} sm={12}></Grid>
      </Grid>
    </>
  );
};

export default CreateContestDetails;
