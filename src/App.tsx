import './App.css'
import { useEffect } from 'react'
import DashboardMain from './pages/DashboardMain'
import DashboardFirst from './pages/DashboardFirst'
import { getCookie } from 'typescript-cookie'
import { useSelector, useDispatch } from 'react-redux'
import { is_user_logged } from './redux/Actions'

function App() {
  const dispatch = useDispatch()
  const userLogged = useSelector((state:any) => state.userLogged)
  useEffect(() => {
    if(getCookie("userAccessKey")){
      dispatch(is_user_logged(false))

    }
  }, [])
  return (
    <>
      {
        userLogged? (
        <>
          <DashboardFirst/>
        </>
        ):(
        <>
          <DashboardMain/>
        </>
        )
      }
    </>
  )
}

export default App
