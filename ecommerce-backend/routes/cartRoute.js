import express from "express";
import {
  addToCart,
  getCart,
  updateCart,
  clearCart
} from "../controllers/cartController.js";
import { protectUser } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import {
  addToCartSchema,
  updateCartSchema
} from "../validations/cartValidation.js";

const router = express.Router();

router.use(protectUser);

// Add product to cart with validation
router.post("/add", validate(addToCartSchema), addToCart);

// View cart
router.get("/", getCart);

// Update cart item
router.patch("/update", validate(updateCartSchema), updateCart);

// Clear cart
router.delete("/clear", clearCart);

export default router;
