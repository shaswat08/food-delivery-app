import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { GlobalContext } from "../context/StoreContext";

const FoodDisplayList = ({ item }) => {
  const { cart, handleAddToCart, handleRemoveFromCart } =
    useContext(GlobalContext);

  return (
    <div className="w-[100%] max-w-sm m-auto rounded-lg shadow-lg shadow-slate-200 animate-fadeIn transition-transform transform duration-500 ease-in-out hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <img
          src={"http://localhost:4000/images/" + item.image}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        {!cart[item._id] ? (
          <img
            onClick={() => handleAddToCart(item._id)}
            className="cursor-pointer absolute bottom-2 right-3 size-9 hover:size-10"
            src={assets.add_icon_white}
          />
        ) : (
          <div className="flex  items-center rounded-md  gap-2 absolute -bottom-12 left-11 size-9">
            <img
              className="cursor-pointer hover:size-10"
              onClick={() => handleRemoveFromCart(item._id)}
              src={assets.remove_icon_red}
            />
            <p className="text-lg font-bold">{cart[item._id]}</p>
            <img
              className="cursor-pointer hover:size-10"
              onClick={() => handleAddToCart(item._id)}
              src={assets.add_icon_green}
            />
          </div>
        )}
      </div>
      <div className="p-4 mt-10">
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
