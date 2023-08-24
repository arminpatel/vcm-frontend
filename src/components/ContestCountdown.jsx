import { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import Footer from "./Footer";

const ContestCountDown = ({ start_time, contest_name }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(1);

  const getTime = () => {
    const endtime = Date.parse(start_time);
    const time = endtime - Date.now();
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0)
      window.location.reload();
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className="h-screen">
      <Navbar />
      <div className="h-2/3 mt-20">
        <div className="text-center text-6xl">{contest_name}</div>
        <div className="text-center mt-20 text-2xl">
          The contest is starting in
        </div>
        <div className="text-center mt-5 text-5xl">
          {days} Days {hours} Hours {minutes} Minutes {seconds} Seconds
        </div>
        <div className="flex flex-row justify-center mt-10">
          <button className="text-center px-10 py-2 bg-blue-800 text-xl text-white hover:bg-blue-600 rounded-md shadow-md">
            Register
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContestCountDown;
