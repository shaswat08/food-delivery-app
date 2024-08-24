import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
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

  const { getCartTotal } = useContext(GlobalContext);

  useEffect(() => {
    console.log(location);
  }, [location]);
  return (
    <div className="flex justify-between gap-10">
      <div className="flex flex-col items-start gap-4 max-w-[400px] min-h-[300px]">
        <div>
          <h1 className="text-3xl font-semibold tracking-wider">
            {" "}
            Delivery Information{" "}
          </h1>
        </div>
        <form className="grid grid-cols-2 gap-2 h-full">
          <DeliveryInput icon={FaUser} type="text" placeholder="First Name" />
          <DeliveryInput
            icon={FaRoad}
            type="text"
            placeholder="Street Address"
          />
          <DeliveryInput icon={FaUser} type="text" placeholder="Last Name" />
          <DeliveryInput icon={FaCity} type="text" placeholder="City" />
          <DeliveryInput
            icon={FaEnvelope}
            type="email"
            placeholder="Email Address"
          />
          <DeliveryInput
            icon={FaMapMarkerAlt}
            type="text"
            placeholder="State"
          />
          <DeliveryInput icon={FaPhone} type="tel" placeholder="Phone Number" />
          <DeliveryInput
            icon={FaEnvelopeOpenText}
            type="text"
            placeholder="Post code"
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
              onClick={() => navigate("/order")}
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
