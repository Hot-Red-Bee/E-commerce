import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
   
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be at least 1"]
      },
      priceAtAdd: {
        type: Number,
        required: true
      }
    }
  ],
  totalPrice: {
    type: Number,
    default: 0,
    min: [0, "Total price must be positive"]
  },
  status: {
    type: String,
    enum: ["active", "ordered", "abandoned", "wishlist"],
    default: "active"
  }
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
