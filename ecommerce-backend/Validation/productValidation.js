import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().required(), // 🔓 any value allowed now
  stock: Joi.number().min(0).required(),
  images: Joi.array().items(Joi.string().uri()).min(1).required(),
  isFeatured: Joi.boolean(),
  isActive: Joi.boolean()
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  description: Joi.string().min(10).max(500),
  price: Joi.number().min(0),
  category: Joi.string(),
  stock: Joi.number().min(0),
  images: Joi.array().items(Joi.string().uri()),
  isFeatured: Joi.boolean(),
  isActive: Joi.boolean()
});

