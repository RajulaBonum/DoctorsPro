/**
 * Home.jsx
 * -----------
 * This is the main homepage component. It composes the key sections:
 * - Header: Introductory banner with a call-to-action.
 * - SpecialityMenu: Browse doctors by speciality.
 * - TopDoctors: Show a selection of top doctors.
 * - Banner: Additional promotional banner.
 */

import React from 'react';
import Header from '../components/Header';
import SpecialityMenu from '../components/SpecialityMenu';
import TopDoctors from '../components/TopDoctors';
import Banner from '../components/Banner';

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </div>
  );
};

export default Home;
