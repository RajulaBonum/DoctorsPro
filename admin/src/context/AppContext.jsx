/**
 * AppContext.jsx
 * --------------
 * Provides a global context for general utility functions and constants
 * used across the application, such as currency formatting, age calculation,
 * and slot date formatting.
 */

import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  // Currency symbol used throughout the app.
  const currency = "$";

  /**
   * Calculates the age based on a given date of birth.
   * @param {string | Date} dob - Date of birth.
   * @returns {number} - Calculated age.
   */
  const calculateAge = (dob) => {
    const today = new Date();
    const birthdate = new Date(dob);
    let age = today.getFullYear() - birthdate.getFullYear();
    // (Optional) Adjust for month/day differences.
    return age;
  };

  // Array of month abbreviations for date formatting.
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  /**
   * Formats a slot date string from "day_month_year" to a readable format.
   * @param {string} slotDate - Date string in "day_month_year" format.
   * @returns {string} - Formatted date string.
   */
  const sloDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  // Value to be provided by the context.
  const value = {
    calculateAge,
    sloDateFormat,
    currency,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
