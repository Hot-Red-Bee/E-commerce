import mongoose, {Schema} from "mongoose";

const orderSchema = new Schema({
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
        priceAtOrder: {
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
        enum: ["pending", "shipped", "delivered", "cancelled"],
        default: "pending"
    },
     paymentStatus: {
    type: String,
    enum: ["unpaid", "paid", "refunded"],
    default: "unpaid"
  },
  shippingInfo: {
    address: { type: String },
    city: { type: String },
    postalCode: { type: String },
    country: { type: String }
  },
  cancellationReason: {
  type: String,
  maxlength: 200
},
}, { timestamps: true });
const Order = mongoose.model("Order", orderSchema);
export default Order;