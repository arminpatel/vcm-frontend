import { Navbar } from "./../components/Navbar";
import Footer from "./../components/Footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Contest = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const { contestId } = useParams();
  const { status, data, error } = useQuery(["contest"], async () => {
    const res = await axios.get(`api/contests/${contestId}`);
    return res.data;
  });

  var problemsCount = 0,
    solvedCount = 0;

  const getTime = () => {
    const durHours = Number(data.duration.slice(0, 2));
    const durMins = Number(data.duration.slice(3, 5));
    const endtime =
      Date.parse(data.start_date_time) + 360000 * durHours + 60000 * durMins;
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
    data.problems.forEach(({ isSolved }) => {
      if (isSolved) solvedCount++;
    });
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-between pt-[5rem]">
        <div className="overflow-x-auto w-[80vw] px-[3rem]">
          <table className="table text-lg">
            <thead className="text-xl pb-[5rem]">
              <tr>
                <th></th>
                <th>Problem Name</th>
                <th>Check</th>
              </tr>
            </thead>
            <tbody>
              {data.problems.map(({ name, link, isSolved }, ind) => {
                return (
                  <tr
                    key={link}
                    className={
                      isSolved ? "bg-green-600 text-white" : "bg-base-300"
                    }
                  >
                    <td>{ind + 1}</td>
                    <td>
                      <a href={link} target="_blank" rel="noreferrer">
                        {name}
                      </a>
                    </td>
                    <td>
                      {isSolved ? (
                        <div className="btn text-2xl"> ✅ </div>
                      ) : (
                        <div className="btn text-2xl"> 🔍 </div>
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
            <div className="text-xl">{data.name}</div>
          </div>
          <div className="text-center pl-[10px]">
            <div>
              {days} days {hours} hours
              <br />
              {minutes} minutes {seconds} seconds
            </div>
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contest;
