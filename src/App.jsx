import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import Home from "./pages/Home";
import CreateContest from "./pages/CreateContest";
import Contest from "./pages/Contest";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Signup } from "./pages/Signup";
import { Profile } from "./pages/Profile";
import Submissions  from "./pages/Submissions";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContext from "./utils/UserContext";

const queryClient = new QueryClient();

export function App() {
  const [user, setUser] = useState({
    loggedIn: Cookies.get("refresh") ? true : false,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  });
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value = {{user, setUser}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-contest" element={<CreateContest />} />
            <Route path="/contest/:contestId" element={<Contest />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/contest/:contestId/submissions" element={<Submissions />} /> 
          </Routes>
        </UserContext.Provider>
      </QueryClientProvider>
    </LocalizationProvider>
  );
}
