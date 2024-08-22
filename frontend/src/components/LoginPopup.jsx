import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import Input from "./Input";
import { assets } from "../assets/assets";

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Login");
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      <div className="relative bg-slate-200 p-5 rounded-lg shadow-lg z-10">
        <div className="flex justify-between items-center gap-3">
          <h1 className="text-2xl flex-1 text-center tracking-widest bg-gradient-to-r from-blue-400 to-teal-400 text-transparent bg-clip-text font-bold">
            {" "}
            {currentState}{" "}
          </h1>
          <img
            onClick={() => setShowLogin(false)}
            className="cursor-pointer mt-[6px]"
            src={assets.cross_icon}
          />
        </div>
        <form className="flex flex-col gap-3 mt-4">
          {currentState === "Login" ? (
            <>
              <Input icon={FaUser} type="text" placeholder="Username" />
              <Input icon={FaEnvelope} type="email" placeholder="Email" />
              <Input icon={FaLock} type="password" placeholder="Password" />
            </>
          ) : (
            <>
              <Input icon={FaUser} type="text" placeholder="Username" />
              <Input icon={FaLock} type="password" placeholder="Password" />
            </>
          )}

          <button className="p-1 w-[80%] mx-auto rounded-lg bg-red-400 hover:bg-slate-300 mt-2">
            {currentState === "Login" ? "Login" : "Register"}
          </button>
        </form>
        <div className="mt-2">
          {currentState === "Login" ? (
            <p className="text-sm text-slate-500 font-poppins font-semibold">
              Don't have an account?{" "}
              <span
                onClick={() => setCurrentState("Register")}
                className="underline cursor-pointer text-blue-500"
              >
                {" "}
                Register
              </span>
            </p>
          ) : (
            <p className="text-sm text-slate-500 font-poppins font-semibold">
              Already have an account?{" "}
              <span
                onClick={() => setCurrentState("Login")}
                className="underline cursor-pointer text-blue-500"
              >
                {" "}
                Login
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
