import {
  Button,
  Card,
  CardContent, Typography
} from "@mui/material";
import React, { useState } from "react";
import CreateContestDetails from "./CreateContestDetails";
import CreateProblemList from "./CreateProblemList";

const CreateContestForm = () => {
  const [contestName, setContestName] = useState("");
  const [contestStartTime, setContestStartTime] = useState();
  const [contestStartDate, setContestStartDate] = useState();
  const [problemCount, setProblemCount] = useState(1);
  const [problems, setProblems] = useState([
    {
      id: 1,
      name: "",
      link: "",
    },
    {
      id: 2,
      name: "",
      link: "",
    },
  ]);

  const addContestName = (name) => setContestName(name);
  const addContestDate = (date) => setContestStartDate(date);
  const addContestTime = (time) => setContestStartTime(time);

  return (
    <form>
      <Typography variant="h2" align="center" mt={10}>
        Create Your Contest
      </Typography>
      <Card
        style={{ maxWidth: "900px", margin: "50px  auto", padding: "20px" }}
      >
        <CardContent>
          <CreateContestDetails />
        </CardContent>
      </Card>
      <Card
        style={{ maxWidth: "900px", margin: "50px  auto", padding: "20px" }}
      >
        <CardContent>
          <CreateProblemList problemCount={problemCount}/>
        </CardContent>
      </Card>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Button type="submit" contained>Create Contest</Button>
        <Button variant="contained">Go Back Home</Button>
      </div>
    </form>
  );
};

export default CreateContestForm;
