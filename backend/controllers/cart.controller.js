//add items to the cart

import User from "../models/user.model.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user;
    const { itemId } = req.body;
    const user = await User.findById(userId).select("-password");
    let cart = await user.cartData;

    if (!cart[itemId]) {
      cart[itemId] = 1;
    } else {
      cart[itemId] += 1;
    }

    await User.findByIdAndUpdate(userId, { cartData: cart });
    res.status(200).json({
      success: true,
      data: user,
      message: "Added to the cart successfully",
    });
  } catch (error) {
    console.log("Error in the addToCart controller: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//remove items from cart

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user;
    const { itemId } = req.body;

    const user = await User.findById(userId).select("-password");
    let cart = user.cartData;

    if (cart[itemId] > 0) {
      cart[itemId] -= 1;
    }

    await User.findByIdAndUpdate(userId, { cartData: cart });

    res.status(200).json({
      success: true,
      data: user,
      message: "Removed from the cart successfully",
    });
  } catch (error) {
    console.log("Error in the removeFromCart controller: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//get all cart items

export const getCartItems = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in the getCartItems controller: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
