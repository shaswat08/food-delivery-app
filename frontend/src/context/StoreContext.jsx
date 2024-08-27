import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { axiosInstance } from "../utils/axiosInstance";

export const GlobalContext = createContext(null);

export const GlobalState = ({ children }) => {
  const [cart, setCart] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");

  const handleAddToCart = (id) => {
    !cart[id]
      ? setCart((prev) => ({ ...prev, [id]: 1 }))
      : setCart((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };
  const handleRemoveFromCart = (id) => {
    setCart((prev) => ({ ...prev, [id]: prev[id] - 1 }));
  };

  const getCartTotal = () => {
    let totalAmount = 0;

    for (const item in cart) {
      if (cart[item] > 0) {
        let info = food_list.find((product) => product._id === item);
        totalAmount += info.price * cart[item];
      }
    }

    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axiosInstance.get("/api/food/list");
      if (response?.data?.success) {
        setFoodList(response?.data?.data);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      const storedToken = Cookies.get("jcookie");
      if (storedToken) {
        setToken(storedToken);
      }
    };
    loadData();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        food_list,
        cart,
        setCart,
        handleAddToCart,
        handleRemoveFromCart,
        getCartTotal,
        token,
        setToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
