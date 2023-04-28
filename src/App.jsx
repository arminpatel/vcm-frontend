import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateContest from "./pages/CreateContest";
import Contest from "./pages/Contest";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Signup } from "./pages/Signup";

export function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-contest" element={<CreateContest />} />
        <Route path="/contest" element={<Contest />} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
    </LocalizationProvider>
  );
}
