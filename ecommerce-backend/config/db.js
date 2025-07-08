import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Optional: you can add options here if needed
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("DB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
