import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setmyemail,
  setFirstName,
  setEmails,
  setToken,
  setLogIn,
} from "../slice.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmail("");
    setPassword("");

    const user = {
      email: email,
      password: password,
    };
    try {
      const res = await fetch("https://mailchecks.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (res.ok) {
        const data = await res.json();

        console.log(data.token);

        dispatch(setToken(data.token));

        dispatch(setLogIn());

        dispatch(setmyemail(data.user.myemail));

        dispatch(setFirstName(data.user.firstName));
        dispatch(setEmails(data.user.emails));

        const mainPage = () => Navigate("/home");
        mainPage();
      } else {
        console.log(res.status);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="bg-gray-100 min-h-screen flex items-center justify-center  "
      style={{ height: "100vh" }}
    >
      <div
        className="bg-neutral-600 rounded shadow-lg flex flex-col"
        style={{
          height: "25rem",
          width: "auto",
          padding: "4em",
          boxShadow: "0 8px 10px rgba(1, 1, 2, 0.3)",
          gap: "1rem",
        }}
      >
        <h1
          className="text-4xl font-semibold ml-4"
          style={{ position: "relative", left: "5rem ", top: "-2rem" }}
        >
          Login
        </h1>

        <form className="flex flex-col align-middle justify-center">
          <div className="mb-4 flex flex-col ">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 px-2 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div className="mb-4 my-4 flex flex-col ">
            <label htmlFor="password" className="block ">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300  rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <button
            className="bg-blue-700 hover:bg-black text-white font-semibold py-2 px-4 rounded w-5/6 transition-colors duration-300"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>

        <p
          className="text-sm text-gray-600 flex items-center p-5"
          style={{ gap: "0.5rem" }}
        >
          New user?{" "}
          <a href="/signUp" style={{ color: "blue" }}>
            Click here to Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
