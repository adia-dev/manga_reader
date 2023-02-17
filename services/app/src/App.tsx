import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import HelpBox from './components/HelpBox'


function App() {

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
