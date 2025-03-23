/**
 * DoctorsList.jsx
 * -----------------
 * This component displays a list of all doctors in the system.
 * It retrieves the doctors data using the AdminContext functions and
 * allows toggling a doctor's availability using a checkbox.
 */

import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  // Destructure necessary values and functions from AdminContext.
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  // Fetch all doctors when an admin token is available.
  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
    // It's recommended to add getAllDoctors to dependency array if it's stable.
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="border border-indigo-200 rounded-xl max-w-[14rem] overflow-hidden cursor-pointer group"
          >
            <img
              className="bg-indigo-50 group-hover:bg-primary transition-all duration-500 w-full h-auto"
              src={item.image}
              alt={`${item.name} Profile`}
            />
            <div className="p-4">
              <p className="text-neutral-800 text-lg font-medium">{item.name}</p>
              <p className="text-zinc-600 text-sm">{item.speciality}</p>
              <div className="mt-2 flex items-center gap-1 text-sm">
                <input
                  onChange={() => changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
