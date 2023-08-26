import { Navbar } from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Submissions = () => {
  const { contestId } = useParams();
  const [usernameFilter, setUsernameFilter] = useState("");

  const {
    data: contest_data,
    status: contest_status,
    error: contest_error,
  } = useQuery(["contest"], async () => {
    const response = await axios.get(`api/contests/${contestId}/`);
    return response.data;
  });

  const {
    data: submission_data,
    status: submission_status,
    error: submission_error,
  } = useQuery(["submissions"], async () => {
    const response = await axios.get(`api/submissions/${contestId}/`);
    return response.data;
  });

  if (contest_status == "loading" || submission_status == "loading") {
    return (
      <>
        <Navbar />
        <div> Loading .. </div>
        <Footer />
      </>
    );
  }
  if (contest_error || submission_error) {
    return (
      <>
        <Navbar />
        <div> Some Error Occured </div>
        <Footer />
      </>
    );
  }

  const filterChange = (event) => {
    setUsernameFilter(event.target.value);
  };

  return (
    <div className="h-screen">
      <Navbar />
      <div className="h-4/5 flex flex-col px-20">
        <div className="text-6xl mt-10 text-center"> {contest_data.name} </div>
        <div className="mt-[-2] text-2xl text-center text-gray-600">
          {" "}
          Submissions{" "}
        </div>
        <div className="flex w-full justify-end">
          <input
            type="text"
            placeholder="seach by username 🔍"
            value={usernameFilter}
            onChange={filterChange}
            className="input w-1/6 border-gray-600 justify-end mt-6 focus:ring"
          />
        </div>
        <table className="table text-lg mt-2">
          <thead className="text-xl pb-5]">
            <tr>
              <th></th>
              <th>User</th>
              <th>Problem</th>
              <th className="text-right">Time of Solving</th>
            </tr>
          </thead>
          <tbody>
            {submission_data
              .filter((submission) => {
                if (!usernameFilter) return true;
                const username = submission.user.username;
                return username.startsWith(usernameFilter);
              })
              .sort((submissiona, submissionb) => {
                const day1 = Date.parse(submissiona.time);
                const day2 = Date.parse(submissionb.time);
                return day2 - day1;
              })
              .map(({ id, user, problem, time }, ind) => {
                let time_in_seconds =
                  Date.parse(time) - Date.parse(contest_data.start_date_time);
                let time_elapsed = new Date(0);
                time_elapsed.setSeconds(Math.max(0, time_in_seconds));

                return (
                  <tr key={id} className="bg-base-300">
                    <td>{ind + 1}</td>
                    <td>
                      <a href={"."} target="_blank" rel="noreferrer">
                        {user.username}
                      </a>
                    </td>
                    <td>
                      <a href={"."} target="_blank" rel="noreferrer">
                        {problem.name}
                      </a>
                    </td>
                    <td className="whitespace-nowrap text-right">
                      {time_elapsed.toISOString().substring(11, 19)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default Submissions;
