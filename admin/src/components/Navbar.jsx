/**
 * Navbar.jsx
 * -------------
 * This component renders the top navigation bar for the Admins App.
 * It displays the logo and a label indicating whether the current user is an Admin or a Doctor.
 * It also provides a Logout button that clears the relevant tokens and navigates back to the home page.
 */

import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  // Retrieve admin and doctor tokens and their setters from context.
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  /**
   * Handles logout by clearing tokens from state and localStorage,
   * then navigates to the homepage.
   */
  const logout = () => {
    navigate("/");
    // If admin token exists, clear it and remove it from localStorage.
    if (aToken) {
      setAToken("");
      localStorage.removeItem("aToken");
    }
    // If doctor token exists, clear it and remove it from localStorage.
    if (dToken) {
      setDToken("");
      localStorage.removeItem("dToken");
    }
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      {/* Logo and user type display */}
      <div className="flex items-center gap-2 text-xs">
        <img
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.admin_logo}
          alt="Admin Logo"
        />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-primary text-white text-sm px-10 py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
