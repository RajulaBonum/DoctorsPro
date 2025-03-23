/**
 * Dashboard.jsx
 * ---------------
 * This component renders the admin dashboard view.
 * It displays key statistics (number of doctors, appointments, patients)
 * as well as a list of the latest bookings.
 * Clicking the cancel icon on a booking will trigger the cancellation process.
 */

import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  // Retrieve necessary data and functions from AdminContext and AppContext.
  const { dashData, aToken, getDashData, cancelAppointment } = useContext(AdminContext);
  const { sloDateFormat } = useContext(AppContext); // Note: using "sloDateFormat" as defined in AppContext

  // Fetch dashboard data when the admin token is available.
  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken, getDashData]);

  // Render the dashboard if dashData is available.
  return (
    dashData && (
      <div className="m-5">
        {/* Dashboard Statistics Cards */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-[13rem] rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.doctor_icon} alt="Doctors Icon" />
            <div>
              <p className="text-xl font-semibold text-gray-600">{dashData.doctors}</p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-[13rem] rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointment_icon} alt="Appointments Icon" />
            <div>
              <p className="text-xl font-semibold text-gray-600">{dashData.appointments}</p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-[13rem] rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="Patients Icon" />
            <div>
              <p className="text-xl font-semibold text-gray-600">{dashData.patients}</p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings List */}
        <div className="bg-white mt-8">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="List Icon" />
            <p className="font-semibold">Latest Bookings</p>
          </div>
          <div className="pt-4 border border-t-0">
            {dashData.latestAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={index}
              >
                <img
                  className="rounded-full w-10"
                  src={item.docData.image}
                  alt={`${item.docData.name} Profile`}
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{item.docData.name}</p>
                  <p className="text-gray-600">{sloDateFormat(item.slotDate)}</p>
                </div>
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
      </div>
    )
  );
};

export default Dashboard;
