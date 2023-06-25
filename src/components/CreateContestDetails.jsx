import React from "react";
import { Typography, Grid, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";

const CreateContestDetails = ({
  addContestName,
  addContestDateAndTime,
  addContestDuration,
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

        <Grid item xs={6} sm={6}>
          <DateTimePicker
            id="contest-date-and-time"
            label="Contest Start Date and Time"
            slotProps={{ textField: { fullWidth: true } }}
            onChange={addContestDateAndTime}
            required
          />
        </Grid>

        <Grid item sm={4}>
          <TextField
            id="contest-duration"
            label="Duration (mins)"
            onChange={addContestDuration}
            type="number"
            required
          />
        </Grid>

        <Grid item xs={12} sm={12}></Grid>
      </Grid>
    </>
  );
};

export default CreateContestDetails;
