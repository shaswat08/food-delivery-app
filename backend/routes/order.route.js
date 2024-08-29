import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { placeOrder } from "../controllers/order.controlller.js";

const router = express.Router();

router.post("/place", protectRoute, placeOrder)

export default router;
