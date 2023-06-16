import React from "react";
import { Grid, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CreateProblem = ({
  problem,
  removeProblem,
  addProblemName,
  addProblemLink,
  addProblemScore,
}) => {
  return (
    <>
      <Grid item xs={4} sm={4} mt={3}>
        <TextField
          id="problem-name"
          label="Problem Name"
          onChange={(event) => {
            addProblemName(problem.id, event.target.value);
          }}
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={4} sm={4} mt={3}>
        <TextField
          id="problem-link"
          label="Problem Link"
          onChange={(event) => {
            addProblemLink(problem.id, event.target.value);
          }}
          fullWidth
          required
        ></TextField>
      </Grid>
      <Grid item xs={3} sm={3} mt={3}>
        <TextField
          id="problem-score"
          label="Score"
          onChange={(event) => {
            addProblemScore(problem.id, event.target.value);
          }}
          type={"number"}
          fullWidth
          required
        ></TextField>
      </Grid>
      <Grid item xs={1} sm={1} mt={3}>
        <Button
          variant="contained"
          color="error"
          onClick={() => removeProblem(problem.id)}
        >
          <CloseIcon fontSize="medium" />
        </Button>
      </Grid>
    </>
  );
};

export default CreateProblem;
