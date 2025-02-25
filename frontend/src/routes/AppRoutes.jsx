import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Doctors from '../pages/Doctors'
import Login from '../pages/Login'
import MyProfile from '../pages/MyProfile'
import MyAppointments from '../pages/MyAppointments'
import Appointement from '../pages/Appointement'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const AppRoutes = () => {
  return (
    <div className='mx-28'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointements' element={<MyAppointments />} />
        <Route path='/appointment/:docId' element={<Appointement />} />
      </Routes>
      <Footer />
    </div>
    
  )
}

export default AppRoutes