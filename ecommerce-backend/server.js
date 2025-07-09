const express = require("express");
// import dotenv from "dotenv";
import connectDB from "./config/db.js";
const dotenv = require("dotenv"); //Changed import to require, syntax conflit resolved

// Import routes
import cartRoute from "./routes/cartRoutes.js"; //Fixed cartRoutes spelling to cartRoute
app.use("/api/cart", cartRoute);

import orderRoute from "./routes/orderRoutes.js";
app.use("/api/orders", orderRoute);

import productRoute from "./routes/productRoute.js";

import userRoute from "./routes/userRoute.js";
app.use("/api/auth", userRoute);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoute);

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
