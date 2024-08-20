import React, { useContext } from "react";
import { GlobalContext } from "../context/StoreContext";
import FoodDisplayList from "./FoodDisplayList";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(GlobalContext);
  return (
    <div className="flex flex-col justify-start gap-5">
      <div className="mt-10 ">
        <h1 className="text-3xl font-bold tracking-wider">
          Top Dishes near you
        </h1>
      </div>
      <div className="grid grid-cols-4 gap-7">
        {food_list.map((item) => (
          <FoodDisplayList item={item} />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
