import { Navbar } from "./../components/Navbar";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  mainPage: {
    width: "80vw",
    height: "75vh",
  },
  sidebar: {
    flexGrow: 1,
    height: "75vh",
  },
  contestTitle: {
    textAlign: "center",
    padding: "10px 0",
  },
  timer: {
    textAlign: "center",
    padding: "10px 0",
  },
  solvedProblem: {
    background: "#DBECC9",
  },
}));

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
  }, [data]);
  const classes = useStyles();

  if (status === "loading") return <div>Loading...</div>;
  if (error) return <div>Some error Occured </div>;

  return (
    <div>
      <Navbar />
      <div className={classes.container}>
        <div className={classes.mainPage}>
          <List sx={{ padding: "10px" }} dense>
            {data.problems.map(({ name, link, isSolved }) => {
              return (
                <>
                  <ListItem
                    key={link}
                    className={
                      classes.listItem +
                      (isSolved ? " " + classes.solvedProblem : null)
                    }
                  >
                    <ListItemButton component="a" href={link}>
                      <ListItemText primary={name} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              );
            })}
          </List>
        </div>
        <div className={classes.sidebar}>
          <div className={classes.contestTitle}>
            <Typography variant="h5">{data.name}</Typography>
          </div>
          <Divider />
          <div className={classes.timer}>
            <Typography>
              {days} days {hours} hours
              <br />
              {minutes} minutes {seconds} seconds
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contest;
