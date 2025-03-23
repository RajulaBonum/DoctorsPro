/**
 * DoctorContext.jsx
 * ------------------
 * Provides a global context for the Doctor App.
 * Manages doctor token, appointments, dashboard data, and profile data.
 * Contains functions for fetching and updating doctor-related data.
 */

import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  // Get backend URL from environment variables.
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Initialize doctor token from localStorage (empty string if not present)
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const [appointments, setAppointments] = useState([]);
  //const [dashData, setDashData] = useState(false);
  const [dashData, setDashData] = useState({
    earnings: 0,
    appointments: 0,
    patients: 0,
    latestAppointments: []
  });

  const [profileData, setProfileData] = useState(false);

  /**
   * Fetches doctor's appointments.
   */
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/appointments`, {
        headers: { dToken },
      });
      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  /**
   * Marks an appointment as complete.
   * @param {string} appointmentId - The ID of the appointment.
   */
  const completeAppointment = async (appointmentId) => {
    console.log(appointmentId)
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/complete-appointment`,
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
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
        `${backendUrl}/api/doctor/cancel-appointment`,
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  /**
   * Retrieves dashboard data for the doctor.
   */
  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, {
        headers: { dToken },
      });
      console.log(data)
      if (data.success) {
        toast.success(data.message);
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        // In case of error, using error.message may be undefined here.
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  /**
   * Retrieves the doctor's profile data.
   */
  const getProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/profile`, {
        headers: { dToken },
      });
      if (data.success) {
        toast.success(data.message);
        setProfileData(data.profileData);
        console.log(data.profileData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Value to be provided by the context.
  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashData,
    setDashData,
    getDashData,
    profileData,
    setProfileData,
    getProfileData,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
