import React, { useState } from "react";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Footer from "./components/Footer";
import LoginPopup from "./components/LoginPopup";
import Verify from "./pages/Verify";
import UserOrder from "./pages/UserOrder";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
        <div className="flex-grow w-[80%] m-auto">
          <NavBar showLogin={showLogin} setShowLogin={setShowLogin} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/userorders" element={<UserOrder />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
