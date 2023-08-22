import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import { ReactComponent as Codeforces } from "../../assets/codeforces.svg";
import { ReactComponent as Codechef } from "../../assets/codechef.svg";
import atcoder_logo from "../../assets/atCoder_logo.png";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";

export function Profile() {
  const { username } = useParams();

  const { status, data, error } = useQuery(["profile"], async () => {
    let res = await axios.get(`api/users/${username}`);
    let dataDetails = res.data;
    let dataContests;
    try {
      let res2 = await axios.get(`api/contests/user/${username}`);
      dataContests = res2.data;
    } catch (err) {
      dataContests = undefined;
    }
    return { dataDetails, dataContests };
  });

  if (status === "loading") {
    return (
      <>
        <span>loading</span>
      </>
    );
  }
  if (error) {
    return (
      <>
        <span> Some Error Occured </span>
      </>
    );
  }

  const { dataDetails, dataContests } = data;

  return (
    <>
      <Navbar />
      <div className="m-4 p-4 bg-neutral-focus min-h-[80vh]">
        <div className="bg-neutral-focus rounded-2xl px-4 mt-4 flex justify-between items-center">
          <div>
            <div className="text-4xl">{dataDetails.username}</div>
            <div>{dataDetails.first_name + " " + dataDetails.last_name}</div>
          </div>

          <div className="w-[40vw] radius-[1rem] p-4 mt-4">
            <div className="flex my-2">
              <Codeforces className="mr-2 w-6 h-6" />
              <span className="mr-2"> Codeforces: </span>
              {dataDetails.profile?.cf_handle ? (
                <a
                  className="link link"
                  href={`https://codeforces.com/profile/${dataDetails.profile.cf_handle}`}
                >
                  {dataDetails.profile.cf_handle}
                </a>
              ) : (
                "Unavailable"
              )}
            </div>
            <div className="flex my-2">
              <Codechef className="mr-2 w-6 h-6" />
              <span className="mr-2"> Codechef: </span>
              {dataDetails.profile?.cc_handle ? (
                <a
                  className="link link"
                  href={`https://codechef.com/users/${dataDetails.profile.cc_handle}`}
                >
                  {dataDetails.profile.cc_handle}
                </a>
              ) : (
                "Unavailable"
              )}
            </div>
            <div className="flex my-2">
              <img src={atcoder_logo} className="w-6 h-6 mr-2" alt="atcoder" />
              <span className="mr-2"> AtCoder: </span>
              {dataDetails.profile?.ac_handle ? (
                <a
                  className="link link"
                  href={`https://atcoder.jp/users/${dataDetails.profile.ac_handle}`}
                >
                  {dataDetails.profile.ac_handle}
                </a>
              ) : (
                "Unavailable"
              )}
            </div>
          </div>
          <div>
            <div className="btn">Edit Profile</div>
          </div>
        </div>

        <div className="text-3xl mb-4"> Contests </div>

        <div className="flex flex-wrap justify-around">
          {dataContests ? (
            dataContests.map((contest, index) => {
              const dt = new Date(Date.parse(contest.start_date_time));
              return (
                <div
                  key={index}
                  className="card bg-base-300 bg-red-500 text-primary-content rounded-2xl p-4 m-4"
                >
                  <h2 className="card-title text-2xl py-2 capitalize">
                    {contest.name}
                  </h2>
                  <div>
                    <div>
                      {" "}
                      <span className="font-bold"> Start Time:</span>{" "}
                      {dt.toLocaleString()}
                    </div>
                    <div>
                      {" "}
                      <span className="font-bold"> Duration: </span>{" "}
                      {contest.duration}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-6">No Contest to Show</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
