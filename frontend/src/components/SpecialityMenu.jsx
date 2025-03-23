/**
 * SpecialityMenu.jsx
 * -------------------
 * This component displays a horizontal menu of doctor specialities.
 * Each item is clickable and navigates to a filtered list of doctors.
 */
import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-gray-800" id="speciality">
      <h1 className="text-3xl font-medium">Find by Speciality</h1>
      <p className="sm:w-1/3 text-center text-sm mb-5">
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-x-auto">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => window.scrollTo(0, 0)}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:-translate-y-2 transition-transform duration-500"
            key={index}
            to={`/doctors/${item.speciality}`}
          >
            {/* Render the emoji with a larger font size */}
            <span style={{ fontSize: "40px" }}>{item.icon}</span>
            <br />
            <p className="mt-5">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
