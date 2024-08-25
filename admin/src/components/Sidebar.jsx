import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-2/12 min-h-screen border-[1.5px] border-slate-300 border-t-0 custom-sidebar">
      <div className="pt-4 pl-8 flex flex-col gap-5">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 border-[1px] border-gray-300 border-r-0 p-1.5 rounded-sm rounded-tr-none rounded-br cursor-pointer ${
              isActive && "bg-red-100 focus:ring-1 focus:ring-gray-600"
            }`
          }
        >
          <img src={assets.add_icon} />
          <p>Add Items</p>
        </NavLink>
        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 border-[1px] border-gray-300 border-r-0 p-1.5 rounded-sm rounded-tr-none rounded-br cursor-pointer ${
              isActive && "bg-red-100 focus:ring-1 focus:ring-gray-600"
            }`
          }
        >
          <img src={assets.order_icon} />
          <p>List Items</p>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 border-[1px] border-gray-300 border-r-0 p-1.5 rounded-sm rounded-tr-none rounded-br cursor-pointer ${
              isActive && "bg-red-100 focus:ring-1 focus:ring-gray-600"
            }`
          }
        >
          <img src={assets.order_icon} />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
