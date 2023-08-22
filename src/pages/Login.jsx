import { useState } from "react";
import { ReactComponent as LoginIllustration } from "../../assets/login-illustration.svg";
import { Link, Navigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { Navbar } from "../components/Navbar";
import  Footer  from "../components/Footer";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [rememberMe, setRememberMe] = useState(false);

  const loginMutation = useMutation(
    (data) => {
      return axios.post("/api/token/", data);
    },
    {
      onSuccess: (data) => {
        Cookies.set("access", data.data.access);
        Cookies.set("refresh", data.data.refresh);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, rememberMe);
    loginMutation.mutate({ username: username, password: password });

  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-around">
        <div className="w-[40vw] flex flex-col items-center bg-neutral-focus p-8 rounded-xl">
          <div className="text-3xl">Log In</div>
          <form className="flex flex-col items-center justify-center">
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered m-2 mt-6"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered m-2"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="form-control">
              <label className="cursor-pointer label">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="label-text m-2">Remember me</span>
              </label>
            </div>
            {/* eslint-disable-next-line */}
            <div className="btn btn-primary min-w-full" onClick={handleSubmit}>
              {loginMutation.isLoading ? "Logging you in..." : "Log In"}
              {loginMutation.isSuccess && <Navigate to="/create-contest/" />}
            </div>
          </form>

          <Link to="/signup" className="text-sm mt-4">
            {"Don't have an account? Sign Up"}
          </Link>

          {loginMutation.isError && (
            <div className="alert alert-error mt-4">
              <div className="flex-1">
                <div className="label">Error</div>{" "}
                <p className="text-sm">
                  {loginMutation.error.response.data.detail}
                </p>
              </div>
            </div>
          )}
        </div>
        <LoginIllustration className="w-[40vw] h-[90vh]" />
      </div>
      <Footer />
    </>
  );
}
