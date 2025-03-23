/**
 * Appointment.jsx
 * -----------------
 * This component displays detailed information for a specific doctor and provides
 * functionality for users to book an appointment. It also shows available time slots,
 * handles booking, and displays related doctors.
 */

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AuthContext";
import RelatedDoctors from "../components/RelatedDoctors";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  // Fixed destructuring: using "backendUrl" as defined in context.
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

  const navigate = useNavigate();

  /**
   * Retrieves the doctor's information from the list using the docId.
   */
  const fetchDocInfo = () => {
    const info = doctors.find((doc) => doc._id === docId);
    setDocInfo(info);
    console.log(info);
  };

  /**
   * Generates available time slots for the next 7 days based on the doctor's booking status.
   */
  const getAvailableSlots = () => {
    const slots = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Set the end time for the day to 9:00 PM.
      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      // For the current day, adjust the start time based on the current time.
      if (i === 0) {
        if (currentDate.getHours() < 10) {
          currentDate.setHours(10, 0, 0, 0);
        } else {
          // Round to the next half hour if current time is past 10:00 AM.
          const minutes = currentDate.getMinutes();
          const additionalMinutes = minutes < 30 ? 30 - minutes : 60 - minutes;
          currentDate = new Date(currentDate.getTime() + additionalMinutes * 60000);
        }
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      const timeSlots = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const day = currentDate.getDate();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;

        // Check slot availability using doctor's booked slots.
        const isSlotAvailable =
          docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(formattedTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        // Increment time by 30 minutes.
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      slots.push(timeSlots);
    }
    setDocSlots(slots);
  };

  /**
   * Handles the appointment booking process.
   */
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    try {
      // Get the date from the selected day's first available slot.
      const date = docSlots[slotIndex][0].datetime;
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;
      console.log(slotDate);

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Fetch doctor info once doctors are loaded and docId is available.
  useEffect(() => {
    if (doctors && docId) {
      fetchDocInfo();
    }
  }, [doctors, docId]);

  // Generate available slots whenever doctor info is available.
  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  // Debug: Log the generated slots.
  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  // Show a loading state until doctor info is available.
  if (!docInfo) return <div>Loading...</div>;

  return (
    <div className="p-4">
      {/* Doctor's Information */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img className="w-64 rounded-lg" src={docInfo.image} alt={docInfo.name} />
        </div>

        <div className="flex-1 border border-gray-400 rounded-lg p-8 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo.name}{" "}
            <img className="w-5" src={assets.verified_icon} alt="Verified" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience}
            </button>
          </div>

          <div className="mt-3">
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900">
              About <img className="w-5" src={assets.info_icon} alt="Info" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
          </div>
          <p className="text-gray-500 font-medium mt-4">
            Appointment fee:{" "}
            <span className="text-gray-600">
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking Slots</p>
        {/* Display available days */}
        <div className="flex gap-3 items-center w-full overflow-x-auto mt-4">
          {docSlots.length > 0 &&
            docSlots.map((slots, index) => (
              <div
                onClick={() => setSlotIndex(index)}
                className={`text-center py-6 min-w-[4rem] rounded-full cursor-pointer ${
                  slotIndex === index ? "bg-primary text-white" : "border border-gray-200"
                }`}
                key={index}
              >
                <p>{slots[0] && dayOfWeek[slots[0].datetime.getDay()]}</p>
                <p>{slots[0] && slots[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>

        {/* Display available time slots for the selected day */}
        <div className="flex items-center gap-3 w-full overflow-x-auto mt-4">
          {docSlots.length > 0 &&
            docSlots[slotIndex]?.map((slot, index) => (
              <p
                onClick={() => setSlotTime(slot.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                  slot.time === slotTime
                    ? "bg-primary text-white"
                    : "text-gray-400 border border-gray-300"
                }`}
                key={index}
              >
                {slot.time.toLowerCase()}
              </p>
            ))}
        </div>

        <button
          onClick={bookAppointment}
          className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
        >
          Book an appointment
        </button>
      </div>

      {/* Related Doctors Section */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;
