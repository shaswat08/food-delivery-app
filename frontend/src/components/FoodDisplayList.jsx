import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";

const FoodDisplayList = ({ item }) => {
  const [itemCounter, setItemCounter] = useState(0);

  useEffect(() => {
    console.log(itemCounter);
  }, [itemCounter]);
  return (
    <div className="w-[100%] m-auto rounded-lg shadow-lg shadow-slate-200 animate-fadeIn">
      <div className="relative">
        <img src={item.image} className="w-[100%] rounded-t-lg" />
        {!itemCounter ? (
          <img
            src={assets.add_icon_white}
            className="absolute right-3 bottom-2 size-[30px] cursor-pointer"
            onClick={() => setItemCounter((prevCount) => prevCount + 1)}
          />
        ) : (
          <div className="absolute left-14 -bottom-9 size-[30px] cursor-pointer flex gap-2">
            <img
              onClick={() => setItemCounter((prevCount) => prevCount - 1)}
              src={assets.remove_icon_red}
            />
            <p> {itemCounter} </p>
            <img
              onClick={() => setItemCounter((prevCount) => prevCount + 1)}
              src={assets.add_icon_green}
            />
          </div>
        )}
      </div>
      <div className="p-4 mt-7">
        <div className="flex justify-between items-center mb-3">
          <p className="text-md font-semibold">{item.name}</p>
          <img className="w-16" src={assets.rating_starts} />
        </div>
        <p className="text-sm font-poppins italic ">{item.description}</p>
        <p className="my-2 text-red-500 text-lg font-bold">
          <span>$</span>
          {item.price}
        </p>
      </div>
    </div>
  );
};

export default FoodDisplayList;
