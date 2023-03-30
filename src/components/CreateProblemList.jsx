import React from "react";
import { Typography, Button, Grid } from "@mui/material";
import CreateProblem from "./CreateProblem";

const CreateProblemList = ({
  addProblem,
  removeProblem,
  addProblemName,
  addProblemLink,
  addProblemScore,
  problemCount,
  problems,
}) => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" align="left">
          PROBLEMS
        </Typography>

        <Button variant="contained" align="right" onClick={addProblem}>
          Add Problem
        </Button>
      </div>

      <Grid container spacing={2}>
        {problems.map((problem) => {
          return (
            <CreateProblem
              key={problem.id}
              problem={problem}
              removeProblem={removeProblem}
              addProblemName={addProblemName}
              addProblemLink={addProblemLink}
              addProblemScore={addProblemScore}
            />
          );
        })}
        <Typography mt={3} variant="h6">
          Total Problems: {problemCount}
        </Typography>
      </Grid>
    </>
  );
};

export default CreateProblemList;
