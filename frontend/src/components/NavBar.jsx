import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/StoreContext";
import { axiosInstance } from "../utils/axiosInstance";
import { toast } from "react-toastify";

const NavBar = ({ showLogin, setShowLogin }) => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("home");
  const { getCartTotal, setToken, token } = useContext(GlobalContext);

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/api/user/logout");
      if (response?.data?.success) {
        setToken("");
        navigate("/");
        toast.success("Logged Out");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-7 px-15 flex justify-between items-center">
      <Link to="/">
        <img className="h-[100px] w-[200px] object-cover" src={assets.logo} />
      </Link>
      <ul className="flex items-center gap-4 font-poppins text-md text-slate-500">
        <li
          onClick={() => setMenu("home")}
          className={`cursor-pointer ${
            menu === "home" ? "pb-[1px] border-b-[2px] border-red-500" : ""
          } `}
        >
          <Link to="/">Home</Link>
        </li>
        <li
          onClick={() => setMenu("menu")}
          className={`cursor-pointer ${
            menu === "menu" ? "pb-[1px] border-b-[2px] border-red-500" : ""
          } `}
        >
          <a href="#menu" className="scroll-smooth">
            Menu
          </a>
        </li>
        <li
          onClick={() => setMenu("mobile-app")}
          className={`cursor-pointer ${
            menu === "mobile-app"
              ? "pb-[1px] border-b-[2px] border-red-500"
              : ""
          } `}
        >
          <a href="#app"> Mobile App </a>
        </li>
        <li
          onClick={() => setMenu("contact-us")}
          className={`cursor-pointer ${
            menu === "contact-us"
              ? "pb-[1px] border-b-[2px] border-red-500"
              : ""
          } `}
        >
          <a href="#contact">Contact Us </a>
        </li>
      </ul>
      <div className="flex gap-6 items-center">
        <div className="relative">
          <Link to="/cart">
            <img
              onClick={() => setMenu("cart")}
              className="cursor-pointer"
              src={assets.basket_icon}
            />
          </Link>
          {getCartTotal() > 0 && (
            <div className="absolute bg-red-400 size-[10px] -right-2 -top-1 rounded-full" />
          )}
        </div>
        {!token ? (
          <button
            onClick={() => setShowLogin(true)}
            className="bg-transparent border-[1px] border-red-300 rounded-lg px-4 py-2 hover:bg-red-400 transition duration-100 ease-in"
          >
            Sign In
          </button>
        ) : (
          <div className="relative group cursor-pointer">
            <img src={assets.profile_icon} />
            <ul className="absolute z-[1] right-0 hidden group-hover:flex flex-col bg-white min-w-[100px]">
              <Link to="/userorders">
                <li className="flex items-center gap-2 p-2 hover:bg-gray-200 cursor-pointer">
                  <img className="w-5" src={assets.bag_icon} />
                  <p className="text-sm">Orders</p>
                </li>
              </Link>
              <li
                onClick={handleLogout}
                className="flex items-center gap-2 p-2 hover:bg-gray-200 cursor-pointer"
              >
                <img className="w-5" src={assets.logout_icon} />
                <p className="text-sm">Sign Out</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
