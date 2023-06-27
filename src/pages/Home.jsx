import React from "react";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import HeroButtonGroup from "../components/HeroButtonGroup";

const Home = () => {
  return (
    <>
      <Navbar />
      <Title />
      <Subtitle />
      <HeroButtonGroup />
      <Footer/>
    </>
  );
};

export default Home;
