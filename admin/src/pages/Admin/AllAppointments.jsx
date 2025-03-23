/**
 * AllAppointments.jsx
 * ---------------------
 * This component displays all appointments fetched from the backend.
 * It uses data from AdminContext and AppContext for formatting details such as age,
 * slot date, and currency. Appointments are listed in a responsive grid layout.
 * Admins can also cancel appointments directly from this view.
 */

import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  // Retrieve necessary values and functions from AdminContext and AppContext.
  const { aToken, appointments, getAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, sloDateFormat, currency } = useContext(AppContext);

  // Fetch appointments when an admin token is available.
  useEffect(() => {
    if (aToken) {
      getAppointments();
    }
  }, [aToken, getAppointments]);

  console.log(appointments)
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">
        {/* Grid header for larger screens */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient:</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions:</p>
        </div>

        {/* List of appointments */}
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={item.userData.image}
                alt={`${item.userData.name} Profile`}
              />
              <p>{item.userData.name}</p>
            </div>
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
            <p>
              {sloDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full bg-gray-200"
                src={item.docData.image}
                alt={`${item.docData.name} Profile`}
              />
              <p>{item.docData.name}</p>
            </div>
            <p>
              {currency} {item.amount}
            </p>
            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
            ) : (
              <img
                onClick={() => cancelAppointment(item._id)}
                className="w-[72px] cursor-pointer"
                src={assets.cancel_icon}
                alt="Cancel Appointment"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
