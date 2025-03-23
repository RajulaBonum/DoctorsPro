/**
 * appointmentModel.js
 * ----------------------
 * This file defines the Mongoose schema and model for an Appointment.
 * An appointment typically stores references to the user and doctor,
 * along with the scheduled slot date, time, payment details, and status flags.
 */

import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  // Reference to the user booking the appointment (can be populated)
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  // Reference to the doctor for the appointment (can be populated)
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'doctor', required: true },
  // Links to the user schema
  userData: { type: Object, required: true },
  // Links to the doctors schema for the doctors data.
  docData: { type: Object, required: true },
  // Date of the appointment stored as a string (e.g., "12_5_2025")
  slotDate: { type: String, required: true },
  // Time of the appointment (e.g., "10:30 AM")
  slotTime: { type: String, required: true },
  // Payment amount for the appointment
  amount: { type: Number, required: true },
  // Payment method flag: true if paid online, false if cash
  payment: { type: Boolean, default: false },
  // Flags for appointment status
  cancelled: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
  // Timestamp for when the appointment was created
  createdAt: { type: Date, default: Date.now }
});

// Use existing model if it exists or create a new one.
const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema);

export default appointmentModel;
