import React from "react";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CodingIllustration } from "../../assets/landingpageillustrationblue.svg";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="container flex lg:flex-row flex-col-reverse items-center gap-6 ">
        <div className="flex flex-1 flex-col items-center">
          <h2 className="text-white text-5xl lg:text-6xl text-center lg:ml-10 mb-6">
            Virtual Contest Maker
          </h2>
          <p className="text-gray-300 text-lg lg:text-2xl lg:ml-8 text-center mb-10">
            Create Contests by combining Problems <br />
            from different Online Judges and track your performance!
          </p>
          <div className="flex justify-center flex-wrap gap-10 mt-2">
            <button
              className="shadow-md py-3 px-6 text-white rounded-md bg-orange-500 hover:bg-orange-600"
              onClick={() => navigate("create-contest")}
            >
              Create Contest
            </button>
            <button
              className="shadow-md py-3 px-6 text-white rounded-md bg-red-500 hover:bg-red-600"
              onClick={() => navigate("login")}
            >
              Sign In
            </button>
          </div>
        </div>
        <div className="flex justify-center flex-1 mb-10 md:mb-16 lg:mb-0 ">
          <CodingIllustration className="h-full w-full "/>
        </div>
      </div>
    </>
  );
};

export default Home;
