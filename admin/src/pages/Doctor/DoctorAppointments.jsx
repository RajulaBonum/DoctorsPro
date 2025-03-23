/**
 * DoctorAppointments.jsx
 * -------------------------
 * This component displays all appointments for a doctor.
 * It fetches the appointments using the DoctorContext and formats details such as:
 * - Patient information and age,
 * - Payment method,
 * - Slot date & time,
 * - Fees, and
 * - Action buttons to cancel or mark appointments as completed.
 *
 * Note: To avoid mutating state, appointments are reversed by creating a copy.
 */

import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  // Retrieve necessary values and functions from DoctorContext and AppContext.
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { calculateAge, sloDateFormat, currency } = useContext(AppContext);

  // Fetch appointments when the doctor token (dToken) changes.
  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        {/* Header row for larger screens */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {/* List of appointments (reverse copy to show latest first) */}
        {[...appointments].reverse().map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between gap-1 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
          >
            <p className="hidden sm:block">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img className="w-8 rounded-full" src={item.userData.image} alt={`${item.userData.name} Profile`} />
              <p>{item.userData.name}</p>
            </div>
            <div>
              <p className="text-xs inline border border-primary px-2 rounded-full">
                {item.payment ? "Online" : "CASH"}
              </p>
            </div>
            <p className="hidden sm:block">{calculateAge(item.userData.dob)}</p>
            <p>
              {sloDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <p>
              {currency}{item.amount}
            </p>
            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
            ) : (
              <div className="flex gap-2">
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt="Cancel Appointment"
                />
                <img
                  onClick={() => completeAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.tick_icon}
                  alt="Complete Appointment"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
