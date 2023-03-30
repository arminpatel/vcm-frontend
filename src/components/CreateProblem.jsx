import React from "react";
import { Grid, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CreateProblem = () => {
  return (
    <>
      <Grid item xs={4} sm={4} mt={3}>
        <TextField label="Problem Name" fullWidth variant="outlined" required />
      </Grid>
      <Grid item xs={4} sm={4} mt={3}>
        <TextField label="Problem Link" fullWidth></TextField>
      </Grid>
      <Grid item xs={3} sm={3} mt={3}>
        <TextField label="Score" fullWidth></TextField>
      </Grid>
      <Grid item xs={1} sm={1} mt={3}>
        <Button variant="contained" color="error">
          <CloseIcon fontSize="medium" colorAction />
        </Button>
      </Grid>
    </>
  );
};

export default CreateProblem;
