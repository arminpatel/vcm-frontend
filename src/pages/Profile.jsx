import { Navbar } from "../components/Navbar";
import {useState} from 'react'
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  header: {
    width: '40vw',
    backgroundColor: '#D4F1F4',
    borderRadius: '1rem',
    padding: '0 1rem 0.5rem 1rem',
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overview: {
    width: '40vw',
    backgroundColor: '#D4F1F4',
    borderRadius: '1rem',
    padding: '1rem 1rem 0.5rem 1rem',
    marginTop: '1.5rem',
  },
  contest: {
    width: '40vw',
    backgroundColor: '#D4F1F4',
    borderRadius: '1rem',
    padding: '1rem 1rem 0.5rem 1rem',
    marginTop: '1.5rem',
  },
}))

const data = {
  username: '0xarmin',
  name: 'Armin Patel',
  cf_id: '0xarmin',
  cc_id: 'ccoder5',
  atc_id: 'arminp',
  constests: [
    {
      name: 'Codeforces Round #744 (Div. 3)',
      start: '2021-10-10T07:35:00+05:30',
      duration: 120,
    },
    {
      name: 'Codeforces Round #743 (Div. 2)',
      start: '2021-10-09T07:35:00+05:30',
      duration: 120,
    },
    {
      name: 'Codeforces Round #742 (Div. 2)',
      start: '2021-10-08T07:35:00+05:30',
      duration: 120,
    },
    {
      name: 'Codeforces Round #741 (Div. 2)',
      start: '2021-10-07T07:35:00+05:30',
      duration: 120,
    },
    {
      name: 'Codeforces Round #740 (Div. 2)',
      start: '2021-10-06T07:35:00+05:30',
      duration: 120,
    },
  ]
}
export function Profile() {
  var [tabValue, setTabValue] = useState("overview")
  const classes = useStyles()
  return (
    <>
      <Navbar />
      <div className={classes.header}>
        <div>
          <Typography variant="h4">{data.username}</Typography>
          <Typography>{data.name}</Typography>
        </div>
        <div>
          <Button variant="contained">Edit Profile</Button> 
        </div>
      </div>

      <Tabs value={tabValue} onChange={(e, val)=> {setTabValue(val)}}>
        <Tab value = "overview" label="Overview" />
        <Tab value = "contests" label="Contests" />
      </Tabs>

      {tabValue === "overview" && (
        <div className={classes.overview}>
          <Typography>Codeforces: <Link href={`https://codeforces.com/profile/${data.cf_id}`}> {data.cf_id} </Link> </Typography>
          <Typography>Atcoder: <Link href={`https://atcoder.jp/users/${data.atc_id}`}>{data.atc_id} </Link> </Typography>
          <Typography>CodeChef: <Link href={`https://codechef.com/users/${data.cc_id}`}> {data.cc_id} </Link> </Typography>
        </div>
      )}

      {tabValue === "contests" && (
        <div className={classes.contestsContainer}>
          {data.constests.map((contest, index) => {
          const dt = new Date(Date.parse(contest.start))
          return (
            <div key={index} className={classes.contest}>
              <Typography>{contest.name}</Typography>
              <div>
                <Typography> Start Time: {dt.toString()}</Typography>
                <Typography>Duration: {contest.duration}</Typography>
              </div>
            </div>
          )}
        )}
        </div>
        )}
    </>
  )
}
