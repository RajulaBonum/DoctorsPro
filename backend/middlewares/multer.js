/**
 * multer.js
 * -----------
 * This file sets up and exports the Multer middleware for handling file uploads.
 * The configuration here uses disk storage and retains the original filename.
 * You can further customize the storage options (like setting a destination folder) as needed.
 */

import multer from "multer";

// Configure storage settings for Multer
const storage = multer.diskStorage({
  // Retain the original filename
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

// Create and export the Multer upload middleware with the defined storage configuration
const upload = multer({ storage });

export default upload;
