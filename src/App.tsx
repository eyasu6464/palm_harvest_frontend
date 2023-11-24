import './App.css'
import { useState } from 'react'
import Login from './pages/Login'
import DashboardMain from './pages/DashboardMain'

function App() {
  const [login, setLogin] = useState(true)
  return (
    <>
      {
        login? (
        <>
          <Login setLogin={setLogin}/>
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
