import './App.css'
import { useEffect, useState } from 'react'
import Login from './pages/Login'
import DashboardMain from './pages/DashboardMain'
import RegisterHarvesterModal from './components/RegisterHarvesterModal'
import DashboardFirst from './pages/DashboardFirst'
import { getCookie } from 'typescript-cookie'
import { useSelector, useDispatch } from 'react-redux'
import { is_user_logged } from './redux/Actions'

function App() {
  const dispatch = useDispatch()
  const [login, setLogin] = useState(true)
  const [createAccount, setCreateAccount] = useState(false)
  const userLogged = useSelector((state:any) => state.userLogged)
  useEffect(() => {
    if(getCookie("userAccessKey")){
      setLogin(false)
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
