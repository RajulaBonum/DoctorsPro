import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoute from './routes/AppRoutes';
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



function App() {
  return (
    <Router>
      <ToastContainer />
      <AppRoute />
    </Router>
  )
}

export default App
