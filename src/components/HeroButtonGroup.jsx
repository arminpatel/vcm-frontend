import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HeroButtonGroup = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        marginTop: "40px",
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/sign-up")}
      >
        Login / SignUp
      </Button>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/create-contest")}
      >
        Create Contest
      </Button>
    </div>
  );
};

export default HeroButtonGroup;
