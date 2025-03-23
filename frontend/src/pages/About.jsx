/**
 * About.jsx
 * -----------
 * This component renders the About Us page, which provides information about
 * the company, its vision, and reasons why patients should choose the service.
 * (Note: Text content here serves as placeholder and may be updated later.)
 */

import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="p-4">
      {/* Page Title */}
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>

      {/* About Content */}
      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img className="w-64 rounded-lg" src={assets.about_image} alt="About Us" />
        <div className="flex flex-col justify-center gap-6 md:w-1/2 text-sm text-gray-600">
          <p>
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration by injected humour or randomised words that don’t look even slightly believable.
          </p>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-colors duration-300 text-gray-600 cursor-pointer">
          <b>Efficiency</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-colors duration-300 text-gray-600 cursor-pointer">
          <b>Convenience</b>
          <p>Access to trusted doctors and hassle-free booking at your fingertips.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-colors duration-300 text-gray-600 cursor-pointer">
          <b>Personalization</b>
          <p>Tailored recommendations and care that address your unique needs.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
