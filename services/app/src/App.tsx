import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { incremented } from './features/counter/counterSlice'
import CountViewer from './components/CountViewer'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Debug from './components/Debug'
import { AuthProvider } from './providers/AuthProvider'


function App() {
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div className="bg-dark-primary w-screen h-screen relative" id="app" data-testid="app">
      <Header />
      <Outlet />
      {/* <Debug /> */}
    </div>
  )
}

export default App
