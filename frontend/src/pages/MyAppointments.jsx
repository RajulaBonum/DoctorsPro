/**
 * MyAppointments.jsx
 * -------------------
 * This component displays the list of the current user's appointments.
 * It fetches the appointments from the backend and provides options to cancel appointments
 * or proceed with online payment.
 */

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  // Array of month abbreviations for formatting the slot date.
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  /**
   * Formats the slot date from the stored format ("day_month_year") into a readable format.
   * @param {string} slotDate - The slot date string.
   * @returns {string} - Formatted date string.
   */
  const formatSlotDate = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  /**
   * Fetches the user's appointments from the backend.
   */
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });

      if (data.success) {
        // Reverse the appointments list to show the latest first.
        setAppointments(data.appointments.reverse());
        toast.success(data.message)
        console.log(data);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  /**
   * Cancels an appointment and refreshes the appointments list.
   * @param {string} appointmentId - The ID of the appointment to cancel.
   */
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
      console.log(appointmentId);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Fetch the user's appointments when the token is available.
  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My Appointments</p>
      <div>
        {appointments.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            {/* Doctor's Image */}
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={item.docData.image}
                alt={item.docData.name}
              />
            </div>
            {/* Appointment Details */}
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>{" "}
                {formatSlotDate(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && !item.isCompleted && (
                <button className="text-sm text-stone-500 text-center sm:min-w-[12rem] py-2 border rounded hover:bg-primary hover:text-white transition-all duration-500">
                  Pay Online
                </button>
              )}
              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-[12rem] py-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-500"
                >
                  Cancel Appointment
                </button>
              )}
              {item.cancelled && !item.isCompleted && (
                <button className="sm:min-w-[12rem] py-2 border border-red-500 text-red-500">
                  Appointment Cancelled
                </button>
              )}
              {item.isCompleted && (
                <button className="sm:min-w-[10rem] py-2 border border-green-500 rounded text-green-500">
                  Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
