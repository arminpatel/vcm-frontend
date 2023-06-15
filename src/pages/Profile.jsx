import { Navbar } from "../components/Navbar";
import { useState } from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { makeStyles } from "@mui/styles";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles(() => ({
  header: {
    width: "40vw",
    backgroundColor: "#D4F1F4",
    borderRadius: "1rem",
    padding: "0 1rem 0.5rem 1rem",
    marginTop: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  overview: {
    width: "40vw",
    backgroundColor: "#D4F1F4",
    borderRadius: "1rem",
    padding: "1rem 1rem 0.5rem 1rem",
    marginTop: "1.5rem",
  },
  contest: {
    width: "40vw",
    backgroundColor: "#D4F1F4",
    borderRadius: "1rem",
    padding: "1rem 1rem 0.5rem 1rem",
    marginTop: "1.5rem",
  },
}));

export function Profile() {
  const [tabValue, setTabValue] = useState("overview");
  const { username } = useParams();
  const classes = useStyles();

  const { status, data, error } = useQuery(["profile"], async () => {
    let res = await axios.get(`api/users/${username}`);
    let dataDetails = res.data;
    let dataContests;
    try {
      let res2 = await axios.get(`api/contests/${username}`);
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
      <div className={classes.header}>
        <div>
          <Typography variant="h4">{dataDetails.username}</Typography>
          <Typography>
            {dataDetails.first_name + " " + dataDetails.last_name}
          </Typography>
        </div>
        <div>
          <Button variant="contained">Edit Profile</Button>
        </div>
      </div>

      <Tabs
        value={tabValue}
        onChange={(e, val) => {
          setTabValue(val);
        }}
      >
        <Tab value="overview" label="Overview" />
        <Tab value="contests" label="Contests" />
      </Tabs>

      {tabValue === "overview" && (
        <div className={classes.overview}>
          <Typography>
            Codeforces:{" "}
            {dataDetails.profile.cf_handle ? (
              <Link
                href={`https://codeforces.com/profile/${dataDetails.profile.cf_handle}`}
              >
                {" "}
                {dataDetails.profile.cf_handle}{" "}
              </Link>
            ) : (
              "Unavailable"
            )}
          </Typography>
          <Typography>
            Codechef:{" "}
            {dataDetails.profile.cc_handle ? (
              <Link
                href={`https://codechef.com/users/${dataDetails.profile.cc_handle}`}
              >
                {" "}
                {dataDetails.profile.cc_handle}{" "}
              </Link>
            ) : (
              "Unavailable"
            )}
          </Typography>
          <Typography>
            AtCoder:{" "}
            {dataDetails.profile.ac_handle ? (
              <Link
                href={`https://atcoder.jp/users/${dataDetails.profile.ac_handle}`}
              >
                {" "}
                {dataDetails.profile.ac_handle}{" "}
              </Link>
            ) : (
              "Unavailable"
            )}
          </Typography>
        </div>
      )}

      {tabValue === "contests" && (
        <div className={classes.contestsContainer}>
          {dataContests
            ? dataContests.map((contest, index) => {
                const dt = new Date(Date.parse(contest.start));
                return (
                  <div key={index} className={classes.contest}>
                    <Typography>{contest.name}</Typography>
                    <div>
                      <Typography> Start Time: {dt.toString()}</Typography>
                      <Typography>Duration: {contest.duration}</Typography>
                    </div>
                  </div>
                );
              })
            : "No Contest to Show"}
        </div>
      )}
    </>
  );
}
