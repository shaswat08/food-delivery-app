import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { axiosInstance } from "../utils/axiosInstance";

export const GlobalContext = createContext(null);

export const GlobalState = ({ children }) => {
  const [cart, setCart] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");

  const handleAddToCart = async (id) => {
    if (!cart[id]) {
      setCart((prev) => ({ ...prev, [id]: 1 }));
    } else {
      setCart((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    }
    if (token) {
      try {
        await axiosInstance.post("/api/cart/add", { itemId: id });
      } catch (error) {
        if (error?.response?.data?.error) {
          console.log(error?.response?.data?.message);
        }
      }
    }
  };
  const handleRemoveFromCart = async (id) => {
    setCart((prev) => ({ ...prev, [id]: prev[id] - 1 }));

    if (token) {
      try {
        await axiosInstance.post("/api/cart/remove", { itemId: id });
      } catch (error) {
        if (error?.response?.data?.error) {
          console.log(error?.response?.data?.message);
        }
      }
    }
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadCartData = async () => {
    if (token) {
      try {
        const response = await axiosInstance.post("/api/cart/get");
        setCart(response?.data?.cartData || {});
      } catch (error) {}
    } else {
      setCart({});
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      const storedToken = Cookies.get("jcookie");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData();
      } else {
        setToken("");
        setCart({});
      }
    };
    loadData();
  }, [token]);

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
