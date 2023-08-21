import React, { useState } from "react";
import CreateProblemList from "./CreateProblemList";
import getMaxId from "../utils/getMaxId";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

const CreateContestForm = () => {

  const [contestName, setContestName] = useState("");
  const [contestStartDateAndTime, setContestStartDateAndTime] = useState();
  const [contestDuration, setContestDuration] = useState(0);
  const [problemCount, setProblemCount] = useState(2);
  const [problems, setProblems] = useState([
    {
      id: 1,
      name: "",
      link: "",
      score: 0,
    },
    {
      id: 2,
      name: "",
      link: "",
      score: 0,
    },
  ]);

  const addContestName = (event) => setContestName(event.target.value);
  const addContestDateAndTime = (date) => setContestStartDateAndTime(date);
  const addContestDuration = (event) => setContestDuration(+event.target.value);

  const addProblem = () => {
    if (problemCount >= 100) {
      alert("Reached maximum problem Limit");
      return;
    }
    setProblemCount(problemCount + 1);
    const maxId = getMaxId(problems);
    setProblems([...problems, { id: maxId + 1, name: "", link: "", score: 0 }]);
  };

  const removeProblem = (problemId) => {
    if (problemCount == 2) return;
    setProblemCount(problemCount - 1);

    const tempProblems = problems.filter((problem) => {
      return problem.id !== problemId;
    });
    setProblems(tempProblems);
  };

  const addProblemName = (problemId, name) => {
    const tempProblems = problems.map((problem) => {
      if (problem.id !== problemId) {
        return problem;
      } else {
        problem.name = name;
        return problem;
      }
    });
    setProblems(tempProblems);
  };

  const addProblemLink = (problemId, link) => {
    const tempProblems = problems.map((problem) => {
      if (problem.id !== problemId) {
        return problem;
      } else {
        problem.link = link;
        return problem;
      }
    });
    setProblems(tempProblems);
  };

  const addProblemScore = (problemId, score) => {
    const tempProblems = problems.map((problem) => {
      if (problem.id !== problemId) {
        return problem;
      } else {
        problem.score = score;
        return problem;
      }
    });
    setProblems(tempProblems);
  };

  const contestCreationMutation = useMutation({
    mutationFn: (data) => {
      return axios.post("api/contests/", data);
    },
  });

  const validateForm = () => {
    if (!contestName || !contestStartDateAndTime || !contestDuration) {
      window.alert("The Contest Detail Field cannot be empty");
      return false;
    }

    let flag = "allCorrect";
    problems.forEach((problem) => {
      if (!problem.name || !problem.link || !problem.score) {
        flag = "problemDetailIncorrect";
        return;
      }
      let score = Number(problem.score);
      if (isNaN(score) || score < 0 || score > 10000) {
        flag = "problemScoreIncorrect";
        return;
      }
      let url;
      try {
        url = new URL(problem.link);
      } catch (e) {
        flag = "problemURLIncorrect";
        return;
      }
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        flag = "problemLinkFormatIncorrect";
      }
    });

    if (flag === "problemDetailIncorrect") {
      window.alert("Problem Detail Field cannot be empty");
      return false;
    } else if (flag === "problemURLIncorrect") {
      window.alert("The Problem link is not a URL");
      return false;
    } else if (flag === "problemLinkFormatIncorrect") {
      window.alert(
        "The Problem link is not correctly formatted, please enter a http: or https: link"
      );
      return false;
    } else if (flag === "problemScoreIncorrect") {
      window.alert("The problem score must be between 0 and 10000");
      return false;
    }
    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    let contestStartDateObject = new Date(contestStartDateAndTime);
    let contestStartDateString = contestStartDateObject.toISOString();
    let nwproblems = problems.map((problem) => {
      // eslint-disable-next-line no-unused-vars
      let { id: _, ...rest } = problem;
      return rest;
    });

    const contestdetails = {
      name: contestName,
      start_date_time: contestStartDateString,
      duration: contestDuration,
      problems: nwproblems,
    };

    contestCreationMutation.mutate(contestdetails);
  };

  if (contestCreationMutation.isSuccess) {
    let contestid = contestCreationMutation.data.data.id;
    return <Navigate to={`/contest/${contestid}`} />;
  }
  if (contestCreationMutation.isError) {
    return <div>Some Error Occured </div>;
  }
  return (
      <form className="form-control">
        <div className="card w-[63vw] m-auto bg-neutral ">
          <div className="text-2xl m-6"> Contest Details </div>
          <input type="text" 
                 placeholder="Contest Name"
                 required 
                 className="m-6 p-4 rounded"
                 onChange={addContestName}
          />
          <div>
            <input type="datetime-local" 
                   placeholder="Contest Start Date and Time"
                   required 
                   className="m-6 p-4 rounded w-1/3"
                   onChange={addContestDateAndTime}
            />
            <input type="number" 
                   placeholder="Contest Duration"
                   required 
                   className="m-6 p-4 rounded w-1/3"
                   onChange={addContestDuration}
            />
          </div>
        </div>

        <div className="card w-[63vw] m-auto bg-neutral mt-[3rem] p-[1rem]">
          <CreateProblemList
            addProblem={addProblem}
            removeProblem={removeProblem}
            addProblemName={addProblemName}
            addProblemLink={addProblemLink}
            addProblemScore={addProblemScore}
            problemCount={problemCount}
            problems={problems}
          />
        </div>
        <div className="flex justify-evenly">
          <button className="btn mt-4 btn-accent" onClick={submitForm}>
            Create Contest
          </button>
        </div>
      </form>

  );
};

export default CreateContestForm;
