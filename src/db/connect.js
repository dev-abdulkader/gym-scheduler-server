import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";

const connectDB = async (url) => {
  if (!url) {
    throw new Error("MongoDB connection URL is undefined");
  }

  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};

export default connectDB;
