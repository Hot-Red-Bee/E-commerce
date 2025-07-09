import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import {
  placeOrderSchema,
  updateOrderStatusSchema,
  cancelOrderSchema
} from "../validations/orderValidation.js";

// Place Order
export const placeOrder = async (req, res) => {
  try {
    const { error } = placeOrderSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const userId = req.user._id;
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalPrice = 0;
    const orderedProducts = [];

    for (const item of cart.products) {
      const product = await Product.findById(item.productId._id);

      if (!product || product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for product: ${product.name}`
        });
      }

      product.stock -= item.quantity;
      await product.save();

      orderedProducts.push({
        productId: product._id,
        quantity: item.quantity,
        priceAtOrder: product.price
      });

      totalPrice += product.price * item.quantity;
    }

    const order = await Order.create({
      userId,
      products: orderedProducts,
      totalPrice
    });

    cart.products = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(201).json({ message: "Order placed", order });

  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
};

//  Get Order History
export const getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order history", error });
  }
};

//  Get Order Details
export const getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate("products.productId");
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order details", error });
  }
};

//  Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const { error } = updateOrderStatusSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { status } = req.body;
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", order });

  } catch (error) {
    res.status(500).json({ message: "Error updating status", error });
  }
};


// cancel order
export const cancelOrder = async (req, res) => {
  try {
    const { error } = cancelOrderSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const userId = req.user._id;
    const orderId = req.params.orderId;

    const order = await Order.findOne({ _id: orderId, userId });
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status !== "pending") {
      return res.status(400).json({ message: "Only pending orders can be cancelled" });
    }

    // OPTIONAL: Restore stock
    for (const item of order.products) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: item.quantity }
      });
    }

    order.status = "cancelled";

    // Optionally store the reason if you add it to your Order model later
    order.cancellationReason = req.body.reason;

    await order.save();

    res.status(200).json({ message: "Order cancelled successfully", order });

  } catch (error) {
    res.status(500).json({ message: "Error cancelling order", error });
  }
};

