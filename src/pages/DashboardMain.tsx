import Navbar from "./Navbar"
import AllImages from "./AllImages"
import Branches from "./Branches"
import Profile from "./Profile"
import Users from "./Users"
import Home from "./Home"
import ImageDetailed from "./ImageDetailed"
import PageNotfound from "./PageNotfound"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChangePassword from "./ChangePassword"

const DashboardMain = () => {
    // const userType = useSelector((state:any) => state.userInformation.user_type);
    const Main = [
        {path:'/allimages', element:<AllImages/>, auth:"Manager"},
        {path:'/branches', element:<Branches/>, auth:'Manager'},
        {path:'/image/:id', element:<ImageDetailed/>, auth:'Manager'},
        {path:'/profile', element:<Profile/>, auth:'All'},
        {path:'/users', element:<Users/>, auth:'Manager'},
        {path:'/changepassword', element:<ChangePassword/>, auth:'All'},
      ]
  return (
    <div>
        <BrowserRouter>
        <Navbar/>
            <Routes>
                <Route path='/' element={<Home />} />
                {
                  Main.map((items:any) => (
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
