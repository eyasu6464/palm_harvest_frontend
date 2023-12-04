import React from 'react'
import Login from './Login'
import ForgetPassword from './ForgetPassword'
import RegisterHarvesterModal from '../components/RegisterHarvesterModal'
import ResetPassword from './ResetPassword'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


const DashboardFirst = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/register' element={<RegisterHarvesterModal/>} />
            <Route path='/forgetpassword' element={<ForgetPassword/>} />
            <Route path='/resetpassword' element={<ResetPassword/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default DashboardFirst
