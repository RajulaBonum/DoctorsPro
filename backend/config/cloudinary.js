/**
 * cloudinary.js
 * ---------------
 * This file sets up and configures Cloudinary using the Cloudinary v2 API.
 * It reads configuration values from environment variables.
 * Call the connectCloudinary function during server initialization.
 */

import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  // Configure Cloudinary with credentials from environment variables
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, // Corrected key from "cloude_name" to "cloud_name"
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });
};

export default connectCloudinary;
