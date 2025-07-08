import express from "express";
import {
  placeOrder,
  getOrderHistory,
  getOrderDetails,
  updateOrderStatus,
  cancelOrder
} from "../controllers/orderController.js";

import { protectUser } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import {
  placeOrderSchema,
  updateOrderStatusSchema,
  cancelOrderSchema
} from "../validations/orderValidation.js";

const router = express.Router();

//  All order routes require login
router.use(protectUser);

//  Place a new order
router.post("/place", validate(placeOrderSchema), placeOrder);

//  View user's order history
router.get("/history", getOrderHistory);

//  View a specific order by ID
router.get("/:orderId", getOrderDetails);

//  Cancel an order (user)
router.patch("/:orderId/cancel", validate(cancelOrderSchema), cancelOrder);

//  Update order status (admin)
router.patch("/:orderId/status", validate(updateOrderStatusSchema), updateOrderStatus);

export default router;
