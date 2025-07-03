import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { addToCartSchema, updateCartSchema } from "../validations/cartValidation.js";

// Add Product to Cart
export const addToCart = async (req, res) => {
  try {
    const { error } = addToCartSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { productId, quantity } = req.body;
    const userId = req.user._id;

    const product = await Product.findById(productId);
    if (!product || product.stock < quantity) {
      return res.status(400).json({ message: "Product not available or insufficient stock" });
    }

    let cart = await Cart.findOne({ userId });

    // If no cart exists, create one with the product
    if (!cart) {
      const newCart = await Cart.create({
        userId,
        products: [{ productId, quantity }],
        totalPrice: product.price * quantity
      });
      return res.status(201).json({ message: "Cart created", cart: newCart });
    }

    // If cart exists, check for product
    const index = cart.products.findIndex(p => p.productId.equals(productId));

    if (index > -1) {
      cart.products[index].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    // Recalculate total price
    let total = 0;
    for (const item of cart.products) {
      const prod = await Product.findById(item.productId);
      total += prod.price * item.quantity;
    }
    cart.totalPrice = total;

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });

  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

//  Get Cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate("products.productId");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

//  Update Cart (change quantity or remove)
export const updateCart = async (req, res) => {
  try {
    const { error } = updateCartSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { productId, quantity } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const index = cart.products.findIndex(p => p.productId.equals(productId));
    if (index === -1) return res.status(404).json({ message: "Product not in cart" });

    if (quantity <= 0) {
      cart.products.splice(index, 1); // Remove product
    } else {
      cart.products[index].quantity = quantity;
    }

    let total = 0;
    for (const item of cart.products) {
      const prod = await Product.findById(item.productId);
      total += prod.price * item.quantity;
    }
    cart.totalPrice = total;

    await cart.save();
    res.status(200).json({ message: "Cart updated", cart });

  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error });
  }
};

//  Clear Cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = [];
    cart.totalPrice = 0;

    await cart.save();
    res.status(200).json({ message: "Cart cleared", cart });

  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error });
  }
};

