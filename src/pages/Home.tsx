import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="min-h-screen flex flex-col bg-gray-50"
      style={{
        backgroundImage:
          "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2720%27 height=%2720%27 viewBox=%270 0 20 20%27%3E%3Ccircle cx=%2710%27 cy=%2710%27 r=%270.7%27 fill=%27gray%27 fill-opacity=%270.5%27 /%3E%3C/svg%3E')",
      }}
    >
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold"> Virtual Contest Maker </h2>
          <p className="text-xl max-w-2xl mx-auto">
            Create Contests by combining Problems from different Online Judges
            and track your performance!
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild>
              <Link to="/create-contest"> Create Contest </Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link to="/signup"> Sign Up </Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
