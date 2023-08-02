import React from "react";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import CreateContestForm from "../components/CreateContestForm";

const CreateContest = () => {
  return (
    <>
      <Navbar />
      <CreateContestForm />
      <div className="mb-20"></div>
      <Footer />
    </>
  );
};

export default CreateContest;
