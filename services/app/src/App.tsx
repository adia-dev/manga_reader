import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import HelpBox from './components/HelpBox'
import Searchbar from './components/Searchbar'


function App() {

  return (

    <div className="bg-dark-primary w-screen relative overflow-hidden" id="app" data-testid="app">
      <Searchbar />
      <Header />
      <Outlet />
      <HelpBox />
      {/* <Debug /> */}
    </div>

  )
}

export default App
