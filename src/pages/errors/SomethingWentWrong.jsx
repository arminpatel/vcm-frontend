import React from "react";
import { Navbar } from "../../components/Navbar";
import { ReactComponent as ErrorSvg } from "../../../assets/errorpageillustration.svg";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const SomethingWentWrong = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="mt-20 w-screen h-screen flex flex-col items-center">
        <ErrorSvg className="w-2/5 h-2/5" />
        <h1 className="text-8xl"> ?? </h1>
        <h2 className="text-2xl">
          {" "}
          Something went wrong and we are not sure what, please report the issue
          if it persists!{" "}
        </h2>
        <div className="mt-10 flex flex-row gap-10">
          <button
            className="shadow-md py-3 px-6 text-white rounded-md bg-red-500 hover:bg-red-600"
            onClick={() => navigate("/")}
          >
            Go Back Home
          </button>
          <a href="https://github.com/arminpatel/vcm-backend">
            <button
              className="shadow-md py-3 px-6 text-white rounded-md bg-orange-500 hover:bg-orange-600"
              onClick={() => navigate("/")}
            >
              Report Issue
            </button>
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SomethingWentWrong;
