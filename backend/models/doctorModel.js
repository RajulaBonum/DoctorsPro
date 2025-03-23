/**
 * doctorModel.js
 * ----------------
 * This file defines the Mongoose schema and model for a Doctor.
 * It includes fields for personal details, professional information,
 * and other related data such as appointment slots booked.
 */

import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  speciality: { type: String, required: true },
  degree: { type: String, required: true },
  experience: { type: String, required: true },
  about: { type: String, required: true },
  available: { type: Boolean, default: true },
  fees: { type: Number, required: true },
  address: { type: Object, required: true },
  date: { type: Number, required: true },
  // Holds booked slots data (e.g., { "12_5_2025": ["10:30 AM", "11:00 AM"] })
  slots_booked: { type: Object, default: {} },
}, { minimize: false });

// Use existing model if it exists or create a new one.
const doctorModel = mongoose.models.doctor || mongoose.model('doctor', doctorSchema);

export default doctorModel;
