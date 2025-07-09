import joi from 'joi';
import Joi from "joi";

export const addToCartSchema = Joi.object({
  productId: Joi.string().required().messages({
    "any.required": "Product ID is required",
    "string.empty": "Product ID cannot be empty"
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    "any.required": "Quantity is required",
    "number.min": "Quantity must be at least 1"
  })
});

export const updateCartSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(0).required() // 0 means remove
});
