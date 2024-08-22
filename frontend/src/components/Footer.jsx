import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="mt-5 m-auto bg-slate-700 text-slate-300">
      <div className="p-12 flex justify-between items-start gap-28">
        <div className="flex flex-col gap-5 ">
          <img className="w-52 h-20 object-cover" src={assets.logo} />
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas,
            fugit at iure aut soluta voluptatem illo animi praesentium veniam
            cupiditate suscipit facere officia rem quo, atque beatae dicta,
            fugiat explicabo?
          </p>
          <div className="flex gap-3">
            <img src={assets.facebook_icon} />
            <img src={assets.twitter_icon} />
            <img src={assets.linkedin_icon} />
          </div>
        </div>
        <div className="flex flex-col gap-5 items-center">
          <h2 className="text-3xl font-bold">COMPANY</h2>
          <ul className="flex flex-col">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold"> GET IN TOUCH </h2>
          <p className="mt-5"> +1-212-456-7890 </p>
          <p> contact@pineapple.com </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
