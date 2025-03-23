/**
 * userRoute.js
 * --------------
 * This file defines routes for user-related API endpoints.
 * It includes routes for user registration, login, profile retrieval and update,
 * booking appointments, listing appointments, and cancelling appointments.
 * Protected routes are guarded by the authUser middleware.
 */

import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointments,
  cancelAppointment,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

// User registration route
userRouter.post("/register", registerUser);

// User login route
userRouter.post("/login", loginUser);

// Get user profile (protected route)
userRouter.get("/get-profile", authUser, getProfile);

// Update user profile (supports image upload)
userRouter.post("/update-profile", upload.single("image"), authUser, updateProfile);

// Book an appointment (protected route)
userRouter.post("/book-appointment", authUser, bookAppointment);

// List user appointments (protected route)
userRouter.get("/appointments", authUser, listAppointments);

// Cancel an appointment (protected route)
userRouter.post("/cancel-appointment", authUser, cancelAppointment);

export default userRouter;
