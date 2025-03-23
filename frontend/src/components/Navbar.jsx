/**
 * Navbar.jsx
 * -----------
 * This component renders the responsive navigation bar for the marketplace website.
 * It displays the logo, navigation links, and account actions (profile dropdown or "Create account" button)
 * based on the user's authentication status. On mobile screens, a collapsible menu is provided.
 */

import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  // State to manage the visibility of the mobile menu.
  const [showMenu, setShowMenu] = useState(false);
  // Access authentication token and user data from the global context.
  const { token, setToken, userData } = useContext(AppContext);

  /**
   * Handles user logout action by clearing the authentication token.
   */
  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
    navigate('/'); // Optionally navigate to the home page after logout.
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      {/* Logo: Clicking the logo navigates to the homepage */}
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="Logo"
        className="rounded-full w-16 cursor-pointer"
      />

      {/* Desktop Navigation Links */}
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      {/* Account Actions & Mobile Menu Toggle */}
      <div className="flex items-center gap-4">
        {token ? (
          // If the user is logged in, display the profile image with a dropdown menu.
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={userData.image} alt="Profile" />
            <img className="w-7" src={assets.dropdown_icon} alt="Dropdown Icon" />
            <div className="absolute top-0 right-0 pt-20 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p onClick={() => navigate('/my-profile')} className="hover:text-black cursor-pointer">
                  My profile
                </p>
                <p onClick={() => navigate('/my-appointments')} className="hover:text-black cursor-pointer">
                  My appointments
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          // If the user is not logged in, show the "Create account" button.
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt="Menu Icon"
        />

        {/* Mobile Navigation Menu */}
        <div
          className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-16" src={assets.logo} alt="Logo" />
            <img
              className="w-7"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="Close Menu"
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-2 rounded inline-block">HOME</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 py-2 rounded inline-block">ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-4 py-2 rounded inline-block">CONTACT</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
