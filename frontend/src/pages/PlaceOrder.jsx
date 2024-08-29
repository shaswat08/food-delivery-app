import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {
  FaCity,
  FaEnvelope,
  FaEnvelopeOpenText,
  FaMapMarkerAlt,
  FaPhone,
  FaRoad,
  FaUser,
} from "react-icons/fa";
import DeliveryInput from "../components/DeliveryInput";
import { GlobalContext } from "../context/StoreContext";
import { axiosInstance } from "../utils/axiosInstance";

const PlaceOrder = () => {
  const location = useLocation();

  const { getCartTotal, token, food_list, cart } = useContext(GlobalContext);
  const [error, setError] = useState("");

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    postcode: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      food_list.map((item) => {
        if (cart[item._id] > 0) {
          let itemInfo = item;
          itemInfo["quantity"] = cart[item._id];
          orderItems.push(itemInfo);
        }
      });

      const orderData = {
        address: data,
        items: orderItems,
        amount: getCartTotal() + 10,
      };

      const response = await axiosInstance.post("/api/order/place", orderData);
      if (response?.data?.success) {
        const { session_url } = response?.data;
        window.location.replace(session_url);
      }
    } catch (error) {
      if (error.status === 401) {
        setError("Please sign-in to your account to proceed with the payment");
      }
    }
  };

  return (
    <div className="flex justify-between gap-10">
      <div className="flex flex-col items-start gap-4 max-w-[400px] min-h-[300px]">
        <div>
          <h1 className="text-3xl font-semibold tracking-wider">
            {" "}
            Delivery Information{" "}
          </h1>
        </div>
        <form onSubmit={placeOrder} className="grid grid-cols-2 gap-2 h-full">
          <DeliveryInput
            required
            icon={FaUser}
            name="firstName"
            type="text"
            placeholder="First Name"
            value={data.firstName}
            onChange={handleChange}
          />
          <DeliveryInput
            required
            icon={FaRoad}
            name="street"
            type="text"
            placeholder="Street Address"
            value={data.street}
            onChange={handleChange}
          />
          <DeliveryInput
            required
            icon={FaUser}
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={data.lastName}
            onChange={handleChange}
          />
          <DeliveryInput
            required
            icon={FaCity}
            name="city"
            type="text"
            placeholder="City"
            value={data.city}
            onChange={handleChange}
          />
          <DeliveryInput
            required
            icon={FaEnvelope}
            name="email"
            type="email"
            placeholder="Email Address"
            value={data.email}
            onChange={handleChange}
          />
          <DeliveryInput
            required
            icon={FaMapMarkerAlt}
            name="state"
            type="text"
            placeholder="State"
            value={data.state}
            onChange={handleChange}
          />
          <DeliveryInput
            required
            icon={FaPhone}
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={data.phone}
            onChange={handleChange}
          />
          <DeliveryInput
            required
            icon={FaEnvelopeOpenText}
            name="postcode"
            type="text"
            placeholder="Post code"
            value={data.postcode}
            onChange={handleChange}
          />
          <div className="w-full mt-4">
            <button
              type="submit"
              className="w-full p-2 rounded-md bg-red-500 text-gray-100 tracking-wider"
            >
              PROCEED TO PAYMENT
            </button>
          </div>
        </form>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
      <div className="w-[400px]">
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
              <p>${getCartTotal() === 0 ? 0 : 10}</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <p className="font-bold">Total</p>
              <p>${getCartTotal() === 0 ? 0 : getCartTotal() + 10}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
