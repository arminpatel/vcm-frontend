import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import Home from "@/pages/Home";
import CreateContest from "./pages/CreateContest";
import Contest from "@/pages/Contest";
import Login from "@/pages/Login";
import Logout from "@/pages/Logout";
import { Signup } from "@/pages/Signup";
import { Profile } from "@/pages/Profile";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/errors/NotFound";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContext from "@/utils/UserContext";

const queryClient = new QueryClient();

interface User {
  loggedIn: boolean;
  user: Record<string, any> | null;
}

export function App() {
  const storedUser = localStorage.getItem("user");
  let parsedUser: User["user"] = null;

  if (storedUser) {
    try {
      parsedUser = JSON.parse(storedUser) as User["user"];
    } catch (error) {
      console.error("Failed to parse user:", error);
    }
  }

  const [user, setUser] = useState<User>({
    loggedIn: !!Cookies.get("refresh"),
    user: parsedUser,
  });
  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-contest" element={<CreateContest />} />
          <Route path="/contest/:contestId" element={<Contest />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </UserContext.Provider>
    </QueryClientProvider>
  );
}
