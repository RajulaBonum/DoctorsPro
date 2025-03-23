/**
 * adminRoute.js
 * ---------------
 * This file sets up the admin-specific routes for the application.
 * It uses authentication middleware to protect routes and assigns appropriate controller functions.
 */

import express from "express";
import { 
  addDoctor, 
  adminDashboard, 
  allDoctors, 
  appointmentCancel, 
  appointmentsAdmin, 
  loginAdmin 
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
// Importing changeAvailability from doctorController for admin use.
import { changeAvailability } from "../controllers/doctorController.js";

const adminRouter = express.Router();

// Route to add a doctor (protected route, expects an image upload)
adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);

// Admin login route
adminRouter.post("/login", loginAdmin);

// Route to get all doctors (protected route)
adminRouter.post("/all-doctors", authAdmin, allDoctors);

// Route to change a doctor's availability (protected route)
adminRouter.post("/change-availability", authAdmin, changeAvailability);

// Route to get all appointments (protected route)
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);

// Route to cancel an appointment (protected route)
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel);

// Route to get dashboard data (protected route)
adminRouter.get("/dashboard", authAdmin, adminDashboard);

export default adminRouter;
