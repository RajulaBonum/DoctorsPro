/**
 * Sidebar.jsx
 * -------------
 * This component renders a sidebar with navigation links for the Admins App.
 * It conditionally displays different navigation options based on whether the current user is an Admin or a Doctor.
 */

import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  // Define common styling for the navigation links.
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-[180px] cursor-pointer ${
      isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
    }`;

  return (
    <div className="min-h-screen bg-white border">
      {/* Admin Sidebar */}
      {aToken && (
        <ul className="text-[#515151]">
          <NavLink className={navLinkClasses} to={"/admin-dashboard"}>
            <img src={assets.home_icon} alt="Dashboard" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink className={navLinkClasses} to={"/all-appointments"}>
            <img src={assets.appointment_icon} alt="Appointments" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          <NavLink className={navLinkClasses} to={"/add-doctor"}>
            <img src={assets.add_icon} alt="Add Doctor" />
            <p className="hidden md:block">Add Doctor</p>
          </NavLink>
          <NavLink className={navLinkClasses} to={"/doctors-list"}>
            <img src={assets.people_icon} alt="Doctors List" />
            <p className="hidden md:block">Doctors List</p>
          </NavLink>
        </ul>
      )}

      {/* Doctor Sidebar */}
      {dToken && (
        <ul className="text-[#515151]">
          <NavLink className={navLinkClasses} to={"/doctor-dashboard"}>
            <img src={assets.home_icon} alt="Dashboard" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink className={navLinkClasses} to={"/doctor-appointments"}>
            <img src={assets.appointment_icon} alt="Appointments" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          <NavLink className={navLinkClasses} to={"/doctor-profile"}>
            <img src={assets.people_icon} alt="Profile" />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
