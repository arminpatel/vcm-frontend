import React from "react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import CreateContestForm from "@/components/CreateContestForm";
import { Navigate } from "react-router-dom";
import UserContext from "@/utils/UserContext";
import { useContext } from "react";

const CreateContest = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CreateContestForm />
      <Footer />
    </div>
  );
};

export default CreateContest;
