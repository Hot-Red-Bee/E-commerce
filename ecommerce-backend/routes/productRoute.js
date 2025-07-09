import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

import { protectUser } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import {
  createProductSchema,
  updateProductSchema
} from "../validations/productValidation.js";

const router = express.Router();

//  Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

//  Protected (Admin Only)
router.post("/", protectUser, validate(createProductSchema), createProduct);
router.patch("/:id", protectUser, validate(updateProductSchema), updateProduct);
router.delete("/:id", protectUser, deleteProduct);

export default router;
