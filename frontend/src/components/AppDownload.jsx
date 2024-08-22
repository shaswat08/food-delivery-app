import React from "react";
import { assets } from "../assets/assets";

const AppDownload = () => {
  return (
    <div className="flex flex-col items-center justify-center p-20 gap-10">
      <div className="mt-5 text-center">
        <p className="text-4xl italic font-semibold text-slate-600">
          For better experience, download the Pineapple App
        </p>
      </div>
      <div className="flex gap-5 items-center mr-5">
        <img
          className="w-[140px] h-[50px] cursor-pointer transform hover:scale-110 duration-100"
          src={assets.play_store}
        />
        <img
          className="w-[140px] h-[50px] cursor-pointer transform hover:scale-110 duration-100"
          src={assets.app_store}
        />
      </div>
    </div>
  );
};

export default AppDownload;
