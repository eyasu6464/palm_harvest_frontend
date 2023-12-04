import Navbar from "./Navbar"
import { useSelector } from "react-redux"
import AllImages from "./AllImages"
import Branches from "./Branches"
import ForgetPassword from "./ForgetPassword"
import Images from "./Images"
import Profile from "./Profile"
import UploadImage from "./UploadImage"
import Users from "./Users"
import Home from "./Home"
import PageNotfound from "./PageNotfound"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ResetPassword from "./ResetPassword"

const DashboardMain = () => {
    const userType = useSelector((state:any) => state.userInformation.user_type);
    const Main = [
        {path:'/allimages', element:<AllImages/>, auth:"Manager"},
        {path:'/branches', element:<Branches/>, auth:'Manager'},
        {path:'/images', element:<Images/>, auth:'Harvester'},
        {path:'/profile', element:<Profile/>, auth:'All'},
        {path:'/uploadimage', element:<UploadImage/>, auth:'Harvester'},
        {path:'/users', element:<Users/>, auth:'Manager'},
        {path:'/forgetpassword', element:<ForgetPassword/>, auth:'All'},
      ]
  return (
    <div>
        <BrowserRouter>
        <Navbar/>
            <Routes>
                <Route path='/' element={<Home />} />
                {
                  Main.filter((items:any) => items.auth === userType || items.auth === "All").map((items:any) => (
                    <Route path={items.path} element={items.element} />
                  ))
                }
                <Route path="*" element={<PageNotfound/>} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default DashboardMain
