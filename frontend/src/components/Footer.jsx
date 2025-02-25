import React from 'react'
import { images } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

            {/* ----- Left section -----*/}
            <div>
                <img className='w-16 mb-5' src={images.doc1} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
            </div>

            {/* ----- Center section -----*/}
            <div>
               <p className='text-xl font-medium mb-5'>Company</p>
               <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                </ul> 
            </div>

            {/* ----- Right section -----*/}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+254 7132 8264</li>
                    <li>rajulabonum@gmail.com</li>
                </ul>
            </div>
        </div>

        {/* Copy rights */}
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>CopyRight 2025@ DoctorsPro - All Rights Reserverd</p>
        </div>
    </div>
  )
}

export default Footer