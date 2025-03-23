/**
 * App.jsx
 * -----------
 * This is the root component of the application.
 * It conditionally renders either the Admin/Doctor portal (complete with Navbar, Sidebar, and various routes)
 * when an admin token or doctor token is available, or the Login page if the user is not authenticated.
 *
 * The application uses react-toastify for notifications and react-router-dom for routing.
 */

import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";

// Contexts for authentication.
import { AdminContext } from "./context/AdminContext";
import { DoctorContext } from "./context/DoctorContext";

// Common components.
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// Admin pages.
import Dashboard from "./pages/Admin/Dashboard"; // Ensure this component is correctly named in your project.
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";

// Doctor pages.
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

// Login page.
import Login from "./pages/Login";

const App = () => {
  // Retrieve authentication tokens from Admin and Doctor contexts.
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  // If authenticated (either as Admin or Doctor), render the portal layout.
  if (aToken || dToken) {
    return (
      <div className="bg-[#F8F9FD] min-h-screen">
        <ToastContainer />
        <Navbar />
        <div className="flex items-start">
          <Sidebar />
          {/* Main content area */}
          <div className="flex-1">
            <Routes>
              {/** Admin Routes */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/admin-dashboard" element={<Dashboard />} />
              <Route path="/all-appointments" element={<AllAppointments />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/doctors-list" element={<DoctorsList />} />

              {/** Doctor Routes */}
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor-appointments" element={<DoctorAppointments />} />
              <Route path="/doctor-profile" element={<DoctorProfile />} />
            </Routes>
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated, render the Login page.
  return (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
