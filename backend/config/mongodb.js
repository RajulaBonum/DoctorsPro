/**
 * mongodb.js
 * -----------
 * This file establishes a connection to MongoDB using Mongoose.
 * It listens for the "connected" event to log a successful connection.
 * The MongoDB URI is read from environment variables.
 */

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Listen for successful connection and log a message
    mongoose.connection.on("connected", () =>
      console.log("Database Connected")
    );
    // Connect to MongoDB using the connection string from environment variables.
    // Ensure that the URI includes the database name (here "doctorspro")
    await mongoose.connect(`${process.env.MONGODB_URI}/doctorspro`);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit the process with failure code if connection fails
  }
};

export default connectDB;
