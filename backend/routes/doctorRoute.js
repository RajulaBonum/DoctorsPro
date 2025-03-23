/**
 * doctorRoute.js
 * ----------------
 * This file sets up the routes for doctor-related API endpoints.
 * It applies authentication middleware for protected routes and maps endpoints to controller functions.
 */

import express from "express";
import {
  appointmentCancel,
  appointmentComplete,
  appointmentsDoctor,
  doctorDashboard,
  doctorList,
  doctorProfile,
  loginDoctor,
  updateDoctorProfile,
  changeAvailability,
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = express.Router();

// Public route to list doctors.
doctorRouter.get("/list", doctorList);

// Doctor login route.
doctorRouter.post("/login", loginDoctor);

// Protected routes for doctor operations.
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);
doctorRouter.get("/profile", authDoctor, doctorProfile);
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);

// (Optional) Route for changing availability if needed on doctor side.
doctorRouter.post("/change-availability", authDoctor, changeAvailability);

export default doctorRouter;
