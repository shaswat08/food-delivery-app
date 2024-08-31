import React, { useContext, useState } from "react";
import Cookies from "js-cookie";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import Input from "./Input";
import { assets } from "../assets/assets";
import { axiosInstance } from "../utils/axiosInstance";
import { GlobalContext } from "../context/StoreContext";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
  const [error, setError] = useState("");
  const { token, setToken } = useContext(GlobalContext);
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Login") {
        const response = await axiosInstance.post("/api/user/login", {
          username: data.username,
          password: data.password,
        });
        if (response?.data?.success) {
          setError("");
          setData({
            username: "",
            password: "",
          });
          setToken(Cookies.get("jcookie"));
          setShowLogin(false);
          toast.success(`Welcome ${data.username}`);
        }
      } else {
        const response = await axiosInstance.post("/api/user/register", {
          username: data.username,
          email: data.email,
          password: data.password,
        });
        if (response?.data?.success) {
          setError("");
          setData({
            username: "",
            email: "",
            password: "",
          });
          setShowLogin(false);
        }
      }
    } catch (error) {
      if (error?.response?.data) {
        setError(error?.response?.data?.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      <div className="relative bg-slate-200 p-5 rounded-lg shadow-lg z-10">
        <div className="flex justify-between items-center gap-3">
          <h1 className="text-2xl flex-1 text-center tracking-widest bg-gradient-to-r from-blue-400 to-teal-400 text-transparent bg-clip-text font-bold">
            {currentState}
          </h1>
          <img
            onClick={() => setShowLogin(false)}
            className="cursor-pointer mt-[6px]"
            src={assets.cross_icon}
          />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
          {currentState === "Login" ? (
            <>
              <Input
                icon={FaUser}
                type="text"
                name="username"
                placeholder="Username"
                value={data.username}
                onChange={handleChange}
              />
              <Input
                icon={FaLock}
                type="password"
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <Input
                icon={FaUser}
                type="text"
                name="username"
                placeholder="Username"
                value={data.username}
                onChange={handleChange}
              />
              <Input
                icon={FaEnvelope}
                type="email"
                name="email"
                placeholder="Email"
                value={data.email}
                onChange={handleChange}
              />
              <Input
                icon={FaLock}
                type="password"
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={handleChange}
              />
            </>
          )}

          <button
            type="submit"
            className="p-1 w-[80%] mx-auto rounded-lg bg-red-400 hover:bg-slate-300 mt-2"
          >
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
                Login
              </span>
            </p>
          )}
        </div>
        <div className="mt-2 mr-1 text-center">
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
