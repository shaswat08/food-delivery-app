import React from "react";
import { menu_list } from "../assets/assets";
import "../index.css";

const ExploreMenu = ({ category, setCategory }) => {
  const handleClick = (name) => {
    setCategory((prev) => (prev === name ? "all" : name));
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl tracking-wider font-bold">Explore our menu</h1>
      <p className="max-w-[60%] break-words text-sm ">
        Choose from a diverse menu
      </p>
      <div className="flex gap-8 items-center justify-between text-center mt-5 overflow-x-scroll scrollbar-hidden">
        {menu_list.map((item, index) => (
          <div onClick={() => handleClick(item.menu_name)} key={index}>
            <img
              className={`w-[7.5vw] min-w-[80px] cursor-pointer ${
                category === item.menu_name &&
                "border-2 border-red-600 rounded-full p-[2px]"
              }`}
              src={item.menu_image}
            />
            <p className="mt-2 text-md font-semibold text-slate-500">
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>
      <hr className="mt-3 h-1 bg-slate-200 border-none" />
    </div>
  );
};

export default ExploreMenu;
