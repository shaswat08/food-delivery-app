import React, { useContext } from "react";
import { GlobalContext } from "../context/StoreContext";

const Cart = () => {
  const { food_list, cart, handleRemoveFromCart, getCartTotal } =
    useContext(GlobalContext);

  return (
    <div className="mt-24">
      <div>
        <div className="grid grid-cols-6 text-center text-2xl">
          <p> Items </p>
          <p> Title </p>
          <p> Price </p>
          <p> Quantity </p>
          <p> Total </p>
          <p> Remove </p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cart[item._id] > 0) {
            return (
              <div>
                <div className="grid grid-cols-6 text-center items-center mt-2 mr-2">
                  <img className="w-[70px] mx-auto" src={item.image} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cart[item._id]}</p>
                  <p>${item.price * cart[item._id]}</p>
                  <p
                    className="cursor-pointer"
                    onClick={() => handleRemoveFromCart(item._id)}
                  >
                    {" "}
                    {cart[item._id] > 1 ? "-" : "X"}{" "}
                  </p>
                </div>
                <hr className="h-[1px] bg-slate-50" />
              </div>
            );
          }
        })}
      </div>
      <div className="p-7">
        <div className="max-w-[500px]">
          <h1 className="mb-5 text-2xl font-bold"> Cart Total </h1>
          <div className="flex flex-col gap-4 ">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>${getCartTotal()}</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <p>Delivery Fee</p>
              <p>$10</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <p className="font-bold">Total</p>
              <p>${getCartTotal() + 10}</p>
            </div>
            <button className="w-[50%] p-2 rounded-md bg-red-500 text-gray-100">
              {" "}
              Proceed to Checkout{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
