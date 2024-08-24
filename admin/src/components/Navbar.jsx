import React from "react";
import { assets } from "../assets/assets";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-5 px-16 shadow-md custom-navbar">
      <div className="text-center">
        <img className="h-[70px] w-[180px] object-cover" src={assets.logo} />
        <h1 className="mt-2 font-semibold tracking-wider"> Admin Panel </h1>
      </div>
      <div>
        <img className="" src={assets.profile_image} />
      </div>
    </div>
  );
};

export default Navbar;
