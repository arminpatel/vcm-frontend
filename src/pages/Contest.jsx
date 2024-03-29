import { Navbar } from "./../components/Navbar";
import Footer from "./../components/Footer";
import ContestCountdown from "./../components/ContestCountdown";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Contest = () => {
  let navigate = useNavigate();
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const { contestId } = useParams();
  const { status, data, error } = useQuery(["contest"], async () => {
    const res = await axios.get(`api/contests/${contestId}`);
    return res.data;
  });

  let problemsCount = 0,
    solvedCount = 0;

  const getTime = () => {
    const durHours = Number(data.duration.slice(0, 2));
    const durMins = Number(data.duration.slice(3, 5));
    const endtime =
      Date.parse(data.start_date_time) + 3600000 * durHours + 60000 * durMins;
    const time = endtime - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);
    return () => clearInterval(interval);
  });

  if (status === "loading") return <div>Loading...</div>;
  if (error) return <div>Some error Occured </div>;

  if (data) {
    problemsCount = data.problems.length;
    data.problems.forEach(({ is_solved }) => {
      if (is_solved) solvedCount++;
    });
  }

  const submitProblem = async (problem_id) => {
    try {
      await axios.post("/api/submissions/", { problem_id: problem_id });
      window.location.reload();
    } catch (err) {
      if (
        err.code == "ERR_BAD_REQUEST" &&
        err.request.response == '["problem is not solved"]'
      ) {
        alert("You have not solved the Problem yet");
        return;
      }
    }
  };

  if (Date.now() - Date.parse(data.start_date_time) < 0)
    return (
      <ContestCountdown
        start_time={data.start_date_time}
        contest_name={data.name}
      />
    );
  else
    return (
      <div>
        <Navbar />
        <div className="flex justify-between pt-[5rem]">
          <div className="overflow-x-auto w-[77vw] px-[3rem]">
            <table className="table text-lg">
              <thead className="text-xl pb-[5rem]">
                <tr>
                  <th></th>
                  <th>Problem Name</th>
                  <th>Check</th>
                </tr>
              </thead>
              <tbody>
                {data.problems.map(({ id, name, link, is_solved }, ind) => {
                  return (
                    <tr
                      key={id}
                      className={
                        is_solved ? "bg-green-600 text-white" : "bg-base-300"
                      }
                    >
                      <td>{ind + 1}</td>
                      <td>
                        <a href={link} target="_blank" rel="noreferrer">
                          {name}
                        </a>
                      </td>
                      <td>
                        {is_solved ? (
                          <div className="btn text-2xl"> ✅ </div>
                        ) : (
                          <button
                            className="btn text-2xl"
                            onClick={() => submitProblem(id)}
                          >
                            {" "}
                            🔍{" "}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="grow h-[75vh]">
            <div className="text-center pl-[10px]">
              <div className="text-4xl">{data.name}</div>
            </div>
            <div className="text-center text-xl mt-10">- Time Left -</div>
            <div className="text-center text-lg mt-2 pl-[10px]">
              {days >= 0 && hours >= 0 && minutes >= 0 && seconds >= 0 ? (
                <div>
                  {days} days {hours} hours
                  <br />
                  {minutes} minutes {seconds} seconds
                </div>
              ) : (
                <div>Contest has Ended</div>
              )}
              <div
                className="radial-progress text-green-500 mt-[5rem]"
                style={{
                  "--value": (solvedCount / problemsCount) * 100,
                  "--size": "7rem",
                }}
              >
                {" "}
                {solvedCount + " / " + problemsCount}
              </div>
            </div>
            <div className="flex flex-row justify-center mt-10 gap-10">
              <button
                className="shadow-md py-2 px-3 text-white text-sm rounded-md bg-blue-800 hover:bg-blue-600"
                onClick={() => navigate("./submissions")}
              >
                My Submissions
              </button>
              <button
                className="shadow-md py-2 px-3 text-white text-sm rounded-md bg-purple-800 hover:bg-purple-600"
                onClick={() => navigate("./submissions/username")}
              >
                All Submissions
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
};

export default Contest;
