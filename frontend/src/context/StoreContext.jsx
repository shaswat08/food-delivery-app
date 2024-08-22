import { createContext, useState } from "react";
import { food_list } from "../assets/assets";

export const GlobalContext = createContext(null);

export const GlobalState = ({ children }) => {
  const [cart, setCart] = useState({});

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
  return (
    <GlobalContext.Provider
      value={{
        food_list,
        cart,
        setCart,
        handleAddToCart,
        handleRemoveFromCart,
        getCartTotal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
