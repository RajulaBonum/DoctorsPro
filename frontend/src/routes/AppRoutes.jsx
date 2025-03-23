/**
 * AppRoutes.jsx
 * ---------------
 * This component defines the main routing structure for the application.
 * It wraps the navigation bar (Navbar) and footer (Footer) around the main routes.
 * Routes include pages such as Home, About, Contact, Doctors (with optional speciality filtering),
 * Login, MyProfile, MyAppointments, and Appointment booking.
 */

import React from "react";
import { Route, Routes } from "react-router-dom";

// Importing pages
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Doctors from "../pages/Doctors";
import Login from "../pages/Login";
import MyProfile from "../pages/MyProfile";
import MyAppointments from "../pages/MyAppointments";
import Appointment from "../pages/Appointment";

// Importing common components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AppRoutes = () => {
  return (
    // Using a responsive container with auto margins and padding for better responsiveness.
    <div className="container mx-auto px-4">
      {/* Navigation bar is always displayed at the top */}
      <Navbar />

      {/* Define the application's routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
      </Routes>

      {/* Footer is displayed at the bottom of every page */}
      <Footer />
    </div>
  );
};

export default AppRoutes;
