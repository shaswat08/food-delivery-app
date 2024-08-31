import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/StoreContext";
import { axiosInstance } from "../utils/axiosInstance";
import { assets } from "../assets/assets";

const UserOrder = () => {
  const [data, setData] = useState([]);
  const { token } = useContext(GlobalContext);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.post("/api/order/userOrder");
      console.log(response?.data?.data);

      if (response?.data?.success) {
        setData(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="p-5">
      <h2 className="text-4xl font-bold tracking-wider mb-7"> My Orders</h2>
      <div className="flex flex-col gap-8">
        {data.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-6 gap-5 items-center p-4 border-[1px] border-slate-300"
          >
            <img src={assets.parcel_icon} />
            <p>
              {order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return `${item.name} x ${item.quantity}`;
                } else {
                  return `${item.name} x ${item.quantity}, `;
                }
              })}
            </p>
            <p>${order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p className="font-semibold">
              <span className="text-xs">&#8226; </span>
              {order.status}
            </p>
            <button className="p-2 rounded-md bg-red-200 tracking-wider hover:bg-red-300">
              Track Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrder;
