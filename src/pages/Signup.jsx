import { useState } from "react";
import { ReactComponent as SignupIllustration } from "../../assets/signup-illustration.svg";
import { Link, Navigate } from "react-router-dom";
import config from "../utils/envConfig";
import { useMutation } from "@tanstack/react-query";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [cf_handle, setCfHandle] = useState("");
  const [cc_handle, setCcHandle] = useState("");
  const [ac_handle, setAcHandle] = useState("");

  const signupMutation = useMutation((data) => {
    for (const [key, value] of Object.entries(data?.profile)) {
      if (value === "" || value === null || value === undefined) {
        delete data?.profile[key];
      }
    }

    if (Object.keys(data?.profile).length === 0) {
      delete data?.profile;
    }

    return fetch(`${config.apiUrl}/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (res.ok) return res.json();
      throw new Error(JSON.stringify(await res.json()));
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const profile = { cf_handle, cc_handle, ac_handle };
    signupMutation.mutate({ username, password, email, profile });
  };


  return (
    <>
      <Navbar />
      <div className="flex items-center justify-around">
        <div className="w-[40vw] flex flex-col items-center bg-neutral-focus p-8 rounded-xl mt-6">
          <div className="text-3xl mb-6">Sign Up</div>
          <form className="flex flex-col items-center justify-center">
            <div className="flex">
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  className="input input-bordered m-2 mt-6"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered m-2"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered m-2"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <div className="form-control">
                  <div className="label">
                    <span className="label-text"> CodeForces </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Username"
                    className="input input-bordered"
                    onChange={(e) => setCfHandle(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <div className="label">
                    <span className="label-text"> CodeChef </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Username"
                    className="input input-bordered"
                    onChange={(e) => setCcHandle(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <div className="label">
                    <span className="label-text"> Atcoder </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Username"
                    className="input input-bordered"
                    onChange={(e) => setAcHandle(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* eslint-disable-next-line */}
            <div
              className="btn btn-primary min-w-full mt-6"
              onClick={handleSubmit}
            >
              {signupMutation.isLoading ? "Signing you up..." : "Sign up"}
              {signupMutation.isSuccess && <Navigate to="/login/" />}
            </div>
          </form>

          <Link to="/login" className="text-sm mt-4">
            Already have an account? Log In
          </Link>

          {signupMutation.isError && (
            <div className="alert alert-error mt-4">
              <div className="flex-1">
                <div className="label">Error</div>{" "}
                <p className="text-sm">
                  {signupMutation.error.message}
                </p>
              </div>
            </div>
          )}
        </div>
        <SignupIllustration className="w-[40vw] h-[90vh]" />
      </div>
      <Footer />
    </>
  );
};
