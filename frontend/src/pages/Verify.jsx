import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import { axiosInstance } from "../utils/axiosInstance";
import { toast } from "react-toastify";

const Verify = () => {
  const navigate = useNavigate();
  const [searchParms, setSearchParams] = useSearchParams();

  const success = searchParms.get("success");
  const orderId = searchParms.get("orderId");

  const verifyPayment = async () => {
    try {
      const response = await axiosInstance.post("/api/order/verify", {
        orderId,
        success,
      });
      if (response?.data?.success) {
        navigate("/userorders");
        toast.success("Order placed successfully");
      } else {
        navigate("/");
        toast.error("Payment failed - Order could not be added");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.log("Response data:", error.response.data);
      }
    }
  };

  useEffect(() => {
    console.log("verifying payment");
    verifyPayment();
  }, []);
  return (
    <div>
      <div>
        <Circles />
      </div>
    </div>
  );
};

export default Verify;
