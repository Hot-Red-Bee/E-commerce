const express = require("express");
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Import routes
import cartRoutes from "./routes/cartRoutes.js";
app.use("/api/cart", cartRoutes);

import orderRoutes from "./routes/orderRoutes.js";
app.use("/api/orders", orderRoutes);

import productRoutes from "./routes/productRoutes.js";

app.use("/api/products", productRoutes);


const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
dotenv.config();
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("E-Commerce Backend API is Running 🚀");
});

// Server listen
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
