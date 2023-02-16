import { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import HelpBox from './components/HelpBox'
import { AuthContext } from './context/AuthContext'


function App() {
  const user = useContext(AuthContext)
  const navigate = useNavigate()

  if (!user) {
    navigate('/login')
  }

  return (
    <div className="bg-dark-primary w-screen relative overflow-hidden" id="app" data-testid="app">
      <Header />
      <Outlet />
      <HelpBox />
      {/* <Debug /> */}
    </div>
  )
}

export default App
