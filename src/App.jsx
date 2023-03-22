import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateContest from "./pages/CreateContest";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-contest" element={<CreateContest />} />
    </Routes>
  );
}
