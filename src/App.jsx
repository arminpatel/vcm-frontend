import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateContest from "./pages/CreateContest";
import Contest from "./pages/Contest";
import Login from "./pages/Login";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Signup } from "./pages/Signup";
import { Profile } from "./pages/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-contest" element={<CreateContest />} />
        <Route path="/contest/:contestId" element={<Contest />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
      </QueryClientProvider>
    </LocalizationProvider>
  );
}
