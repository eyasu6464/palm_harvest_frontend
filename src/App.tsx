import './App.css'
import { useState } from 'react'
import Login from './pages/Login'
import DashboardMain from './pages/DashboardMain'
import RegisterHarvesterModal from './components/RegisterHarvesterModal'

function App() {
  const [login, setLogin] = useState(true)
  const [createAccount, setCreateAccount] = useState(false)
  return (
    <>
      {
        login? (
        <>
        {
          createAccount? (
          <>
            <RegisterHarvesterModal setCreateAccount={setCreateAccount}/>
          </>
          ):(
          <>
            <Login setLogin={setLogin} setCreateAccount={setCreateAccount}/>
          </>
          )
        }
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
