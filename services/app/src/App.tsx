import { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
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
      {/* <Debug /> */}
    </div>
  )
}

export default App
