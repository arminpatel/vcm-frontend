import Menu from "@mui/material/Menu";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

const menuData = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Create Contest",
    href: "/create-contest",
  },
  {
    label: "Sign Up",
    href: "/sign-up",
  },
];

export function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {" "}
          Virtual Contest Maker{" "}
        </Typography>
        {menuData.map(({ label, href }) => {
          return (
            <Button
              key={label}
              {...{
                key: label,
                color: "inherit",
                component: Link,
                to: href,
              }}
            >
              {label}
            </Button>
          );
        })}
      </Toolbar>
    </AppBar>
  );
}
