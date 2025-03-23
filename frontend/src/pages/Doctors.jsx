/**
 * Doctors.jsx
 * -------------
 * This component renders a list of doctors and provides filtering options
 * based on their speciality. Users can click on a filter option to narrow down the list,
 * and clicking on a doctor card navigates to the appointment booking page.
 */

import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AuthContext";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  // Define filter options for the available specialities.
  const filterOptions = [
    "General Physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  /**
   * Applies filtering based on the URL parameter.
   */
  const applyFilter = () => {
    if (speciality) {
      setFilteredDocs(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilteredDocs(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
      <div>
        <p className="text-gray-600">Browse through the doctors specialists.</p>
        <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
          {/* Toggle button for mobile filter visibility */}
          <button
            className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-primary text-white" : ""
              }`}
            onClick={() => setShowFilter((prev) => !prev)}
          >
            Filters
          </button>
          {/* Filter Options */}
          <div
            className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex" : "hidden sm:flex"
              }`}
          >
            {filterOptions.map((option) => (
              <p
                key={option}
                onClick={() =>
                  speciality === option
                    ? navigate("/doctors")
                    : navigate(`/doctors/${option}`)
                }
                className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === option ? "bg-indigo-50 text-black" : ""
                  }`}
              >
                {option}
              </p>
            ))}
          </div>
        </div>
      </div>
      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 mt-5">
        {filteredDocs.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-500"
          >
            <img
              className="bg-blue-50 w-full h-40 object-contain"
              src={item.image}
              alt={item.name}
            />
            <div className="p-4">
              <div
                className={`flex items-center gap-2 text-sm text-center ${item.available ? "text-green-500" : "text-gray-500"
                  }`}
              >
                <p
                  className={`w-2 h-2 ${item.available ? "bg-green-500" : "bg-gray-500"
                    } rounded-full`}
                ></p>
                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
