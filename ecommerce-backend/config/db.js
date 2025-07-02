const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Direct connection string instead of process.env
    const conn = await mongoose.connect(
      "mongodb://localhost:27017/", // Replace with your DB URL
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("DB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
