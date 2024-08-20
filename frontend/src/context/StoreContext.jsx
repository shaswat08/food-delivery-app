import { createContext } from "react";
import { food_list } from "../assets/assets";

export const GlobalContext = createContext(null);

export const GlobalState = ({ children }) => {

    const contextValue = {
        food_list
    }
  return <GlobalContext.Provider value={contextValue}> {children} </GlobalContext.Provider>;
};
