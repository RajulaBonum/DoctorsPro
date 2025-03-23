/**
 * Server.jsx
 * -----------
 * This file creates and configures an Express app.
 * It connects to MongoDB and Cloudinary, applies middleware, and sets up API routes.
 * The app listens on a specified port (default 4000).
 */

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

// App configuration
const app = express();
const port = process.env.PORT || 4000;

// Connect to database and cloud services
connectDB();
connectCloudinary();

// Middleware configuration
app.use(express.json());
app.use(cors());

// API endpoints
app.use('/api/admin', adminRouter);   // e.g., http://localhost:4000/api/admin
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

// Basic route to verify API is working
app.get('/', (req, res) => {
  res.send('API WORKING - Love express (It\'s fun)');
});

// Start the server
app.listen(port, () => console.log("Server started on port", port));
