import { Navbar } from "./../components/Navbar";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import List from "@mui/material/List";
import ListItem from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

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
  }
}));

const data = {
  title: "VCM TEST CONTEST",
  deadline: "April, 30, 2023",
  problems: [
    {
      name: "Problem 1",
      link: "https://codeforces.com/contest/1807/problem/A",
      isSolved: false,
    },
    {
      name: "Problem 2",
      link: "https://codeforces.com/contest/1807/problem/B",
      isSolved: true,
    },
    {
      name: "Problem 3",
      link: "https://codeforces.com/contest/1807/problem/C",
      isSolved: false,
    },
    {
      name: "Problem 4",
      link: "https://codeforces.com/contest/1807/problem/D",
      isSolved: true,
    },
    {
      name: "Problem 5",
      link: "https://codeforces.com/contest/1807/problem/E",
      isSolved: false,
    },
    {
      name: "Problem 6",
      link: "https://codeforces.com/contest/1807/problem/F",
      isSolved: false,
    },
  ]
}



const Contest = () => {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const getTime = () => {
    const time = Date.parse(data.deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  }

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval)
  }, [])

  const classes = useStyles();
  return (
    <div>
      <Navbar />
      <div className = {classes.container}>
        <div className = {classes.mainPage}>
          <List sx={{padding: "10px"}} dense>
            {
              data.problems.map(({name, link, isSolved}) => {
                return (
                <>
                  <ListItem key = {link} className={classes.listItem + (isSolved ? " " + classes.solvedProblem : null)}>
                    <ListItemButton component="a" href={link} >
                      <ListItemText primary={name} />
                    </ListItemButton>
                  </ ListItem>
                  <Divider />
                </>
                )
              })
            }
          </List>
        </div>
        <div className = {classes.sidebar}>
          <div className = { classes.contestTitle }>
            <Typography variant="h5">
              { data.title }
            </Typography>
          </div>
          <Divider />
          <div className = {classes.timer}>
            <Typography>
              {days} days {hours} hours 
              <br />
              {minutes} minutes {seconds} seconds
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contest;
