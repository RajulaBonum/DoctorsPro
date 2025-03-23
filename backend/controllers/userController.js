/**
 * userController.js
 * --------------------
 * This controller provides API functions for user operations including registration, login,
 * profile retrieval and update, booking appointments, listing appointments, and cancelling appointments.
 *
 * Note: Ensure that environment variables (e.g., JWT_SECRET) and Cloudinary configurations are properly set.
 */

import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

// API to register users
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check for missing details
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Validate the email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid Email" });
    }

    // Validate password strength (minimum 8 characters)
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    // Save user in the database
    const newUser = new userModel(userData);
    const user = await newUser.save();

    // Generate a JWT token using the user's _id
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to login users
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.json({ success: false, message: "Missing user ID" });
    }
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update user profile
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    // Validate required fields
    if (!name || !phone || !address || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    // Update basic fields
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    // If an image file is provided, upload to Cloudinary and update image URL
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
      const imageURL = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to book an appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    // Find doctor data (excluding password)
    const docData = await doctorModel.findById(docId).select("-password");

    // Check if the doctor is available
    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not Available" });
    }

    // Retrieve and update booked slots
    let slots_booked = docData.slots_booked;

    // Check if the slot is already booked
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [slotTime];
    }

    // Get user data (excluding password)
    const userData = await userModel.findById(userId).select("-password");

    // Remove slots_booked from doctor data before storing in appointment to avoid extra data
    const { slots_booked: _, ...docDataForAppointment } = docData.toObject();

    const appointmentData = {
      user: userId,
      doctor: docId,
      userData,
      docData: docDataForAppointment,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    // Save the new appointment
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // Update doctor's booked slots in the database
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment booked" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user appointments (for "My Appointments" page)
// Corrected to use find query (not findById)
const listAppointments = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(userId)
    if (!userId) {
      return res.json({ success: false, message: "Missing user ID" });
    }
    const appointments = await appointmentModel.find({ user: userId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel an appointment
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    if (!userId || !appointmentId) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const appointmentData = await appointmentModel.findById(appointmentId);

    // Verify that the appointment belongs to the user
    if (appointmentData.user.toString() !== userId) {
      return res.json({ success: false, message: "Unauthorized: Cannot cancel this appointment" });
    }

    // Update appointment as cancelled
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    // Release doctor's booked slot
    const { doctor, slotDate, slotTime } = appointmentData;
    const docId = doctor
    const doctorData = await doctorModel.findById(docId);
    console.log(doctorData)
    let slots_booked = doctorData.slots_booked;
    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter((e) => e !== slotTime);
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    }

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointments, cancelAppointment };
