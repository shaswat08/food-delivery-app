import express from "express";
import {
  addToCart,
  getCartItems,
  removeFromCart,
} from "../controllers/cart.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/add", protectRoute, addToCart);
router.post("/remove", protectRoute, removeFromCart);
router.post("/get", protectRoute, getCartItems);

export default router;
