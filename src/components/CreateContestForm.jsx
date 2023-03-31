import { Button, Card, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";
import CreateContestDetails from "./CreateContestDetails";
import CreateProblemList from "./CreateProblemList";
import getMaxId from "../utils/getMaxId";
import { useNavigate } from "react-router-dom";

const CreateContestForm = () => {
  
  const navigate = useNavigate();

  const [contestName, setContestName] = useState("");
  const [contestStartTime, setContestStartTime] = useState();
  const [contestStartDate, setContestStartDate] = useState();
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
  const addContestDate = (date) => setContestStartDate(date);
  const addContestTime = (time) => setContestStartTime(time);
  const addContestDuration = (event) => setContestDuration(+event.target.value);

  const addProblem = () => {
    if (problemCount > 100) {
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

    const tproblems = problems.filter((problem) => {
      return problem.id !== problemId;
    });
    setProblems(tproblems);
  };

  const addProblemName = (problemId, name) => {
    const tproblems = problems.map((problem) => {
      if (problem.id !== problemId) {
        return problem;
      } else {
        problem.name = name;
        return problem;
      }
    });
    setProblems(tproblems);
  };

  const addProblemLink = (problemId, link) => {
    const tproblems = problems.map((problem) => {
      if (problem.id !== problemId) {
        return problem;
      } else {
        problem.link = link;
        return problem;
      }
    });
    setProblems(tproblems);
  };

  const addProblemScore = (problemId, score) => {
    const tproblems = problems.map((problem) => {
      if (problem.id !== problemId) {
        return problem;
      } else {
        problem.score = score;
        return problem;
      }
    });
    setProblems(tproblems);
  };

  const submitForm = () => {
    //TODO: Add API POST REQUEST HERE
    console.log(contestName, contestStartDate, contestStartTime, contestDuration);
    console.log(problems);
  };

  return (
    <form>
      
      <Typography variant="h2" align="center" mt={10}>
        Create Your Contest
      </Typography>

      <Card
        style={{ maxWidth: "900px", margin: "50px  auto", padding: "20px" }}
      >
        <CardContent>
          <CreateContestDetails
            addContestName={addContestName}
            addContestDate={addContestDate}
            addContestTime={addContestTime}
            addContestDuration={addContestDuration}
          />
        </CardContent>
      </Card>

      <Card
        style={{ maxWidth: "900px", margin: "50px  auto", padding: "20px" }}
      >
        <CardContent>
          <CreateProblemList
            addProblem={addProblem}
            removeProblem={removeProblem}
            addProblemName={addProblemName}
            addProblemLink={addProblemLink}
            addProblemScore={addProblemScore}
            problemCount={problemCount}
            problems={problems}
          />
        </CardContent>
      </Card>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Button variant="contained" onClick={submitForm}>
          Create Contest
        </Button>
        <Button variant="contained" onClick={()=> navigate('/')}>Go Back Home</Button>
      </div>

    </form>
  );
};

export default CreateContestForm;
