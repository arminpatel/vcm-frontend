import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const CreateProblem = ({
  problem,
  removeProblem,
  addProblemName,
  addProblemLink,
  addProblemScore,
}) => {
  return (
    <div className="flex gap-4">
      <input id="problem-name" placeholder="Problem Name" className="rounded p-2"
        onChange={(event) => {
          addProblemName(problem.id, event.target.value);
        }}
        required
      />
      <input id="problem-link" placeholder="Problem Link" className="rounded p-2"
        onChange={(event) => {
          addProblemLink(problem.id, event.target.value);
        }}
        required
      />
      <input id="problem-score" type="number" placeholder="Score" className="rounded p-2"
        onChange={(event) => {
          addProblemScore(problem.id, event.target.value);
        }}
        required
      />
      <div>
        <div className = "btn btn-error" onClick={() => removeProblem(problem.id)} >
          <CloseIcon fontSize="medium" />
        </div>
      </div>
    </div>
  );
};

export default CreateProblem;
