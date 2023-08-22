import React from "react";
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
      <div className="flex justify-between mb-4">
        <div className="text-xl">PROBLEMS</div>

        <button className="btn" onClick={addProblem}>
          Add Problem
        </button>
      </div>

      <div className="flex flex-col gap-4">
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
        <div className="text-lg">Total Problems: {problemCount}</div>
      </div>
    </>
  );
};

export default CreateProblemList;
