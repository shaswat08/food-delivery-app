import React from "react";
import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axiosInstance.get("/api/order/list");

      if (response?.data?.success) {
        setOrders(response?.data?.data);
      }
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error?.response?.message);
      }
      console.log(error);
    }
  };

  const handleStatus = async (e, id) => {
    try {
      const response = await axiosInstance.post("/api/order/update", {
        id,
        status: e.target.value,
      });

      if (response?.data?.success) {
        console.log(response);
        fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="ml-16 mt-12 flex-1">
      <div className="p-5">
        <h1 className="text-3xl font-bold tracking-wider mb-6">
          List of Food Items
        </h1>
      </div>
      <div className="flex flex-col gap-5">
        {orders.map((order, index) => (
          <div
            key={index}
            className="p-5 grid grid-cols-6 gap-6 items-center text-center border-[1px] border-gray-200"
          >
            <img src={assets.parcel_icon} />
            <div>
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return `${item.name} x ${item.quantity}`;
                  } else {
                    return `${item.name} x ${item.quantity}, `;
                  }
                })}
              </p>
            </div>
            <div className="flex flex-col gap-3 p-2">
              <p className="text-sm ">
                <span className="font-bold tracking-wide italic text-md text-red-600">
                  Name:{" "}
                </span>
                {`${order.address.firstName} ${order.address.lastName}`}
              </p>
              <p className="text-sm text-black">
                <span className="font-bold tracking-wide italic text-md text-red-600">
                  Street:{" "}
                </span>
                {order.address.street}
              </p>
              <p className="text-sm text-black">
                <span className="font-bold tracking-wide italic text-md text-red-600">
                  City:{" "}
                </span>
                {order.address.city}
              </p>
              <p className="text-sm text-black">
                <span className="font-bold tracking-wide italic text-md text-red-600">
                  Post Code:{" "}
                </span>
                {order.address.postcode}
              </p>
              <p className="text-sm text-black">
                <span className="font-bold tracking-wide italic text-md text-red-600">
                  Phone:{" "}
                </span>
                {order.address.phone}
              </p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}.00</p>
            <select
              value={order.status}
              onChange={(e) => handleStatus(e, order._id)}
              className="p-2 bg-red-200 rounded-md text-center"
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Food Delivered">Food Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
