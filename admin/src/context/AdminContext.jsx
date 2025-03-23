/**
 * AdminContext.jsx
 * -----------------
 * Provides a global context for the Admin App.
 * Manages admin token, doctors list, appointments, and dashboard data.
 * Contains functions to fetch and update admin-related data using API calls.
 */

import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  // Initialize admin token from localStorage (empty string if not present)
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);

  // Get backend URL from environment variables.
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  //console.log(backendUrl);

  /**
   * Fetches all doctors from the backend.
   * Note: Ensure the backend expects the token in the headers with the correct key.
   */
  const getAllDoctors = async () => {
    try {
      // It might be preferable to send the token in a specific header key (e.g., { aToken: aToken })
      const { data } = await axios.post(
        `${backendUrl}/api/admin/all-doctors`,
        {},
        { headers: { aToken } }
      );
      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  /**
   * Changes a doctor's availability status.
   * @param {string} docId - The ID of the doctor.
   */
  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/change-availability`,
        { docId },
        { headers: { aToken } }
      );
      if (data.sucess) {
        toast.success(data.message);
        getAllDoctors(); // Refresh doctors list after update.
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  /**
   * Fetches all appointments from the backend.
   */
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, {
        headers: { aToken },
      });
      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  /**
   * Cancels an appointment.
   * @param {string} appointmentId - The ID of the appointment.
   */
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/cancel-appointment`,
        { appointmentId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  /**
   * Retrieves dashboard data.
   */
  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, {
        headers: { aToken },
      });
      if (data.success) {
        setDashData(data.dashData);
        //console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Value to be provided by the context.
  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAppointments,
    cancelAppointment,
    dashData,
    getDashData,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
