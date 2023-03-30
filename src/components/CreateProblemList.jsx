import React from "react";
import { Typography, Button, Grid } from "@mui/material";
import CreateProblem from "./CreateProblem";


const CreateProblemList = ({ problemCount }) => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" align="left">
          PROBLEMS
        </Typography>

        <Button variant="contained" align="right">
          Add Problem
        </Button>
      </div>

      <Grid container spacing={2}>
        <CreateProblem />

        <Typography mt={3} variant="h6">
          Total Problems: {problemCount}
        </Typography>
      </Grid>
    </>
  );
};

export default CreateProblemList;
