import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  placeOrder,
  userOrder,
  verifyOrder,
} from "../controllers/order.controlller.js";

const router = express.Router();

router.post("/place", protectRoute, placeOrder);
router.post("/verify", verifyOrder);
router.post("/userOrder", protectRoute, userOrder);

export default router;
