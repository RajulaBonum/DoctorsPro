/**
 * adminController.js
 * --------------------
 * This controller contains API functions used by the admin routes.
 * It provides endpoints for adding a doctor, logging in the admin,
 * fetching all doctors, retrieving appointments, cancelling appointments,
 * and getting dashboard data.
 */

import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

// API for adding a doctor
const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const imageFile = req.file;

    // Check if any required field is missing (Note: using !address instead of address)
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password (minimum 8 characters)" });
    }

    // Hash doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const imageUrl = imageUpload.secure_url; // Cloudinary image URL

    // Prepare doctor data for insertion
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address), // Parse the address JSON string
      date: Date.now(),
    };

    // Save the new doctor to the database
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor added" });
    console.log({ name, email, password, speciality, degree, experience, about, fees, address }, imageFile);
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if credentials match the admin's credentials stored in environment variables
    if (email === process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
      // Generate a JWT token (consider signing an object payload for more flexibility)
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all doctors list for the admin panel
const allDoctors = async (req, res) => {
  try {
    // Exclude passwords from the results
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all appointments list for the admin panel
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel an appointment from the admin panel
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    // Find the appointment to cancel
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // Update appointment status to cancelled
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    // Release the doctor's booked slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;
    // Remove the cancelled slot from the booked slots array for the specified date
    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter((e) => e !== slotTime);
    }
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get dashboard data for the admin panel
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}); // All doctors
    const users = await userModel.find({});       // All users (patients)
    const appointments = await appointmentModel.find({});

    // Prepare dashboard data with counts and latest appointments
    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      // Get the 5 most recent appointments
      latestAppointments: [...appointments].reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard };
