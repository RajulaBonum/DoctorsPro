/**
 * AuthContext.jsx
 * ----------------
 * Provides a global context for authentication and common data across the app.
 * Manages doctor lists, user profile data, authentication token, and related API calls.
 */

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  // Currency symbol used in the app
  const currencySymbol = "$";

  // State for storing list of doctors, user profile data, and authentication token.
  const [doctors, setDoctors] = useState([]);
  const [userData, setUserData] = useState(false);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );

  // Backend URL is loaded from environment variables.
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  /**
   * Fetch the list of doctors from the backend.
   */
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      console.log(data)
      if (data.success) {
        setDoctors(data.doctors);
        //console.log(data.doctors);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  /**
   * Load the authenticated user's profile data.
   */
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Fetch doctors data on initial load.
  useEffect(() => {
    getDoctorsData();
  }, []);

  // Load user profile data when the token changes.
  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  // Global context value that is passed to children.
  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
