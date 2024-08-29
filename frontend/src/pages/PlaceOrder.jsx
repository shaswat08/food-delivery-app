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

const PlaceOrder = () => {
  const location = useLocation();

  const { getCartTotal, token, food_list, cart } = useContext(GlobalContext);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="flex justify-between gap-10">
      <div className="flex flex-col items-start gap-4 max-w-[400px] min-h-[300px]">
        <div>
          <h1 className="text-3xl font-semibold tracking-wider">
            {" "}
            Delivery Information{" "}
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2 h-full">
          <DeliveryInput
            icon={FaUser}
            name="firstName"
            type="text"
            placeholder="First Name"
            value={data.firstName}
            onChange={handleChange}
          />
          <DeliveryInput
            icon={FaRoad}
            name="street"
            type="text"
            placeholder="Street Address"
            value={data.street}
            onChange={handleChange}
          />
          <DeliveryInput
            icon={FaUser}
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={data.lastName}
            onChange={handleChange}
          />
          <DeliveryInput
            icon={FaCity}
            name="city"
            type="text"
            placeholder="City"
            value={data.city}
            onChange={handleChange}
          />
          <DeliveryInput
            icon={FaEnvelope}
            name="email"
            type="email"
            placeholder="Email Address"
            value={data.email}
            onChange={handleChange}
          />
          <DeliveryInput
            icon={FaMapMarkerAlt}
            name="state"
            type="text"
            placeholder="State"
            value={data.state}
            onChange={handleChange}
          />
          <DeliveryInput
            icon={FaPhone}
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={data.phone}
            onChange={handleChange}
          />
          <DeliveryInput
            icon={FaEnvelopeOpenText}
            name="postcode"
            type="text"
            placeholder="Post code"
            value={data.postcode}
            onChange={handleChange}
          />
        </form>
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
            <button
              onClick={() => Navigate("/order")}
              className="w-[50%] p-2 rounded-md bg-red-500 text-gray-100 tracking-wider"
            >
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
