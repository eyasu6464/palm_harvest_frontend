import Login from './Login'
import ForgetPassword from './ForgetPassword'
import RegisterHarvesterModal from '../components/RegisterHarvesterModal'
import ResetPassword from './ResetPassword'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PageNotfound from './PageNotfound'


const DashboardFirst = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/register' element={<RegisterHarvesterModal/>} />
            <Route path='/forgetpassword' element={<ForgetPassword/>} />
            <Route path='/resetpassword/:uid/:token/' element={<ResetPassword/>} />
            <Route path="*" element={<PageNotfound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default DashboardFirst
