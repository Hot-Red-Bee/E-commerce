import Joi from "joi";

// Place Order – no body fields required; just make sure cart exists
export const placeOrderSchema = Joi.object({}); 

// Update Status – only allow valid status values
export const updateOrderStatusSchema = Joi.object({
  status: Joi.string()
    .valid("pending", "shipped", "delivered", "cancelled")
    .required()
    .messages({
      "any.required": "Status is required",
      "any.only": "Invalid status value"
    })
    
});
// was not in the features given
 export const cancelOrderSchema = Joi.object({
  reason: Joi.string()
    .min(3)
    .max(200)
    .required()
    .messages({
      "string.min": "Cancellation reason must be at least 3 characters",
      "string.max": "Cancellation reason must be under 200 characters"
    })
});