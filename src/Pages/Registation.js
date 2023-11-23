import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setmyemail,
  setFirstName,
  setEmails,
  setToken,
  setLogIn,
} from "../slice.js";

const RegistrationPage = () => {
  const [firstName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  const dispatch = useDispatch();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setPassword("");

    const user = {
      firstName: firstName,
      email: email,
      password: password,
    };
    try {
      const res = await fetch("https://mailchecks.onrender.com/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(setLogIn());
        dispatch(setToken(data.token));
        dispatch(setmyemail(data?.user?.myemail));

        dispatch(setFirstName(data?.user?.setfirstName));
        dispatch(setEmails(data?.user?.emails));

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
      className="bg-gray-100 min-h-screen flex items-center justify-center"
      style={{ height: "100vh" }}
    >
      <div
        className="bg-neutral-600 rounded shadow-lg flex flex-col"
        style={{
          height: "30rem",
          width: "auto",
          padding: "4em",
          boxShadow: "0 8px 10px rgba(1, 1, 2, 0.3)",
          gap: "1rem",
        }}
      >
        <h1
          className="text-4xl font-semibold mb-4"
          style={{ position: "relative", left: "4.4rem", top: "-2rem" }}
        >
          Sign Up
        </h1>

        <form className="flex flex-col align-middle justify-center">
          <div className="my-4 flex flex-col">
            <label htmlFor="firstName" className="block text-gray-600">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div className="mb-4 my-2 flex flex-col">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div className=" my-4 flex flex-col">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <button
            className="bg-blue-700 hover:bg-black text-white font-semibold py-2 px-4 rounded w-5/6 transition-colors duration-300 my-2"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          Already registered?{" "}
          <a href="/login" style={{ color: "blue" }}>
            Click here to log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
