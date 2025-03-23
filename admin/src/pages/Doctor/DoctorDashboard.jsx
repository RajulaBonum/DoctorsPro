/**
 * DoctorDashboard.jsx
 * ---------------------
 * This component displays the doctor's dashboard view.
 * It shows key statistics (earnings, appointments, patients) and a list of the latest bookings.
 * For each latest booking, the admin can cancel or mark the appointment as completed.
 */

import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  // Destructure necessary values and functions from DoctorContext and AppContext.
  const { dashData, getDashData, dToken, completeAppointments, cancelAppointments } = useContext(DoctorContext);
  const { currency, sloDateFormat } = useContext(AppContext);

  // Fetch dashboard data when the doctor token is available.
  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  console.log(dashData)

  return (
    <div className="m-5">
      {/* Statistics Cards */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white p-4 min-w-[13rem] rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-transform">
          <img className="w-14" src={assets.earning_icon} alt="Earnings Icon" />
          <div>
            {/* Corrected typo "earinings" to "earnings" */}
            <p className="text-xl font-semibold text-gray-600">
              {currency} {dashData.earnings}
            </p>
            <p className="text-gray-400">Earnings</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-[13rem] rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-transform">
          <img className="w-14" src={assets.appointment_icon} alt="Appointments Icon" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashData.appointments}</p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-[13rem] rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-transform">
          <img className="w-14" src={assets.patients_icon} alt="Patients Icon" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashData.patients}</p>
            <p className="text-gray-400">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className="bg-white mt-8">
        <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
          <img src={assets.list_icon} alt="List Icon" />
          <p className="font-semibold">Latest Bookings</p>
        </div>
        <div className="pt-4 border border-t-0">
          {dashData.latestAppointments.map((item, index) => (
            <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100" key={index}>
              <img className="rounded-full w-10" src={item.userData.image} alt={`${item.userData.name} Profile`} />
              <div className="flex-1 text-sm">
                <p className="text-gray-800 font-medium">{item.userData.name}</p>
                <p className="text-gray-600">{sloDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Completed</p>
              ) : (
                <div className="flex gap-2">
                  <img
                    onClick={() => cancelAppointments(item._id)}
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt="Cancel Appointment"
                  />
                  <img
                    onClick={() => completeAppointments(item._id)}
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
    </div>
  );
};

export default DoctorDashboard;
