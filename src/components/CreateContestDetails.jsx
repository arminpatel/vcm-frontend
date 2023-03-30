import React from "react";
import { Typography, Grid, TextField } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

const CreateContestDetails = ({
  addContestName,
  addContestDate,
  addContestTime,
}) => {
  return (
    <>

      <Typography variant="h5" align="left">
        CONTEST DETAILS
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} mt={5}>
          <TextField
            id="contest-name"
            label="Contest Name"
            onChange={addContestName}
            fullWidth
            variant="outlined"
            required
          />
        </Grid>
        
        <Grid item sm={6}>
          <DatePicker
            id="contest-date"
            label="Contest Start Date"
            onChange={addContestDate}
            required
          />
        </Grid>

        <Grid item sm={6}>
          <TimePicker
            id="contest-time"
            label="Contest Start Time"
            onChange={addContestTime}
            required
          />
        </Grid>

        <Grid item xs={12} sm={12}></Grid>
      </Grid>
    </>
  );
};

export default CreateContestDetails;
