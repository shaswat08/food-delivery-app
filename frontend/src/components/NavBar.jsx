import React, { useState } from "react";
import { assets } from "../assets/assets";

const NavBar = () => {
  const [menu, setMenu] = useState("home");

  return (
    <div className="py-7 px-15 flex justify-between items-center">
      <img className="h-[100px] w-[200px] object-cover" src={assets.logo} />
      <ul className="flex items-center gap-4 font-poppins text-md text-slate-500">
        <li
          onClick={() => setMenu("home")}
          className={`cursor-pointer ${
            menu === "home" ? "pb-[1px] border-b-[2px] border-red-500" : ""
          } `}
        >
          Home
        </li>
        <li
          onClick={() => setMenu("menu")}
          className={`cursor-pointer ${
            menu === "menu" ? "pb-[1px] border-b-[2px] border-red-500" : ""
          } `}
        >
          Menu
        </li>
        <li
          onClick={() => setMenu("mobile-app")}
          className={`cursor-pointer ${
            menu === "mobile-app"
              ? "pb-[1px] border-b-[2px] border-red-500"
              : ""
          } `}
        >
          Mobile App
        </li>
        <li
          onClick={() => setMenu("contact-us")}
          className={`cursor-pointer ${
            menu === "contact-us"
              ? "pb-[1px] border-b-[2px] border-red-500"
              : ""
          } `}
        >
          Contact Us
        </li>
      </ul>
      <div className="flex gap-6 items-center">
        <img className="cursor-pointer" src={assets.search_icon} />
        <div className="relative">
          <img className="cursor-pointer" src={assets.basket_icon} />
          <div className="absolute bg-red-400 size-[10px] -right-2 -top-1 rounded-full" />
        </div>
        <button className="bg-transparent border-[1px] border-red-300 rounded-lg px-4 py-2 hover:bg-red-400 transition duration-100 ease-in">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default NavBar;
