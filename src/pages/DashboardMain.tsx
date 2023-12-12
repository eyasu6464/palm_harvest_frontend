import Navbar from "./Navbar"
import AllImages from "./AllImages"
import Branches from "./Branches"
import Profile from "./Profile"
import Users from "./Users"
import Home from "./Home"
import ImageDetailed from "./ImageDetailed"
import ImageEditor from "./ImageEditor"
import PageNotfound from "./PageNotfound"
import { Routes, Route, HashRouter } from 'react-router-dom'
import ChangePassword from "./ChangePassword"

const DashboardMain = () => {
    // const userType = useSelector((state:any) => state.userInformation.user_type);
    const Main = [
        {path:'/allimages', element:<AllImages/>, auth:"Manager"},
        {path:'/branches', element:<Branches/>, auth:'Manager'},
        {path:'/image/:id', element:<ImageDetailed/>, auth:'Manager'},
        {path:'/profile', element:<Profile/>, auth:'All'},
        {path:'/users', element:<Users/>, auth:'Manager'},
        {path:'/imageeditor/:id', element:<ImageEditor/>, auth:'Manager'},
        {path:'/changepassword', element:<ChangePassword/>, auth:'All'},
      ]
  return (
    <div>
        <HashRouter>
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
        </HashRouter>
    </div>
  )
}

export default DashboardMain
