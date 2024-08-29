import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { placeOrder, verifyOrder } from "../controllers/order.controlller.js";

const router = express.Router();

router.post("/place", protectRoute, placeOrder);
router.post("/verify", verifyOrder);

export default router;
