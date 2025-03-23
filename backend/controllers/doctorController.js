/**
 * doctorController.js
 * ---------------------
 * This controller defines API functions for doctor-related operations.
 * These include changing availability, listing doctors, login, handling appointments,
 * managing the doctor's dashboard, and updating profile information.
 */

import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

// API to toggle a doctor's availability status.
const changeAvailability = async (req, res) => {
  try {
    // Destructure docId from the request body.
    const { docId } = req.body;
    if (!docId) {
      return res.json({ success: false, message: "Missing doctor ID" });
    }

    // Find the doctor data.
    const docData = await doctorModel.findById(docId);
    if (!docData) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    // Toggle availability.
    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
    res.json({ success: true, message: "Availability changed" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to list doctors (excludes password and email)
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password -email");
    res.json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API for doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get a doctor's appointments for the doctor panel.
const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    if (!docId) {
      return res.json({ success: false, message: "Missing doctor ID" });
    }
    const appointments = await appointmentModel.find({ doctor: docId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to mark an appointment as completed in the doctor panel.
const appointmentComplete = async (req, res) => {
  try {
    // Use consistent naming: expecting docId and appointmentId in req.body.
    const { docId, appointmentId } = req.body;
    console.log(docId)
    if (!docId || !appointmentId) {
      return res.json({ success: false, message: "Missing required fields" });
    }
    const appointmentData = await appointmentModel.findById(appointmentId);
    console.log(appointmentData)
    // Verify that the appointment belongs to the doctor.
    if (appointmentData && appointmentData.doctor.toString() === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
      return res.json({ success: true, message: "Appointment Completed" });
    } else {
      return res.json({ success: false, message: "Mark Failed: Appointment not found or mismatched doctor" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel an appointment in the doctor panel.
const appointmentCancel = async (req, res) => {
  try {
    // Use consistent naming: expecting docId and appointmentId.
    const { docId, appointmentId } = req.body;
    if (!docId || !appointmentId) {
      return res.json({ success: false, message: "Missing required fields" });
    }
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.doctor.toString() === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
      return res.json({ success: true, message: "Appointment Cancelled" });
    } else {
      return res.json({ success: false, message: "Cancellation Failed: Appointment not found or mismatched doctor" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get dashboard data for the doctor panel.
const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;
    if (!docId) {
      return res.json({ success: false, message: "Missing doctor ID" });
    }
    const appointments = await appointmentModel.find({ doctor: docId });
    let earnings = 0;
    // Calculate total earnings from completed appointments or paid online.
    appointments.forEach((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    // Gather unique patient IDs from appointments.
    let patients = [];
    appointments.forEach((item) => {
      if (item.user && !patients.includes(item.user.toString())) {
        patients.push(item.user.toString());
      }
    });

    // Get the 5 most recent appointments (use a copy to avoid mutating original array).
    const latestAppointments = [...appointments].reverse().slice(0, 5);

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments,
    };

    console.log(dashData)

    res.json({ success: true, dashData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get the doctor's profile for the doctor panel.
const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;
    if (!docId) {
      return res.json({ success: false, message: "Missing doctor ID" });
    }
    const profileData = await doctorModel.findById(docId).select("-password");
    res.json({ success: true, profileData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update the doctor's profile.
const updateDoctorProfile = async (req, res) => {
  try {
    console.log(req.body)
    const { docId, updateData } = req.body;
    const { fees, address, available } = updateData;
    if (!docId) {
      return res.json({ success: false, message: "Missing doctor ID" });
    }
    await doctorModel.findByIdAndUpdate(docId, { fees, address, available });
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
