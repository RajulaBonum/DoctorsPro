/**
 * DoctorProfile.jsx
 * -------------------
 * This component renders the doctor's profile page.
 * It displays the doctor's image, personal details, education, and address.
 * An admin can toggle edit mode to update fields such as fees and address,
 * and then save changes via an API call.
 */

import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  // Retrieve doctor-specific data and functions from context.
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  /**
   * Updates the doctor's profile information.
   */
  const updateProfile = async () => {
    console.log(profileData)
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      // Make API call to update profile.
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        { updateData },
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Fetch profile data when the doctor token is available.
  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    profileData && (
      <div className="m-5">
        <div className="flex flex-col gap-4">
          {/* Profile Image */}
          <div>
            <img className="bg-primary/80 w-full sm:max-w-[16rem] rounded-lg" src={profileData.image} alt="Doctor Profile" />
          </div>

          {/* Profile Details */}
          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7">
            {/* Doctor's Name & Qualification */}
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">{profileData.name}</p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="py-0.5 px-2 border text-sm rounded-full">{profileData.experience}</button>
            </div>

            {/* About Section */}
            <div className="mt-3">
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-800">About:</p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">{profileData.about}</p>
            </div>

            {/* Appointment Fee */}
            <p className="text-gray-600 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-800">
                {currency}{" "}
                {isEdit ? (
                  <input
                    type="number"
                    onChange={(e) =>
                      setProfileData((prev) => ({ ...prev, fees: e.target.value }))
                    }
                    value={profileData.fees}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>

            {/* Address */}
            <div className="flex gap-2 py-2">
              <p>Address:</p>
              <p className="text-sm">
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={profileData.address.line1}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  profileData.address.line1
                )}
                <br />
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={profileData.address.line2}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  profileData.address.line2
                )}
              </p>
            </div>

            {/* Availability Toggle */}
            <div className="flex gap-1 pt-2">
              <input
                onChange={() => isEdit && setProfileData((prev) => ({ ...prev, available: !prev.available }))}
                checked={profileData.available}
                type="checkbox"
              />
              <label>Available</label>
            </div>

            {/* Edit / Save Button */}
            {isEdit ? (
              <button onClick={updateProfile} className="mt-4 px-4 py-1 border border-primary text-sm rounded-full hover:bg-primary hover:text-white">
                Save
              </button>
            ) : (
              <button onClick={() => setIsEdit(true)} className="mt-4 px-4 py-1 border border-primary text-sm rounded-full hover:bg-primary hover:text-white">
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
