import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { incremented } from './features/counter/counterSlice'
import CountViewer from './components/CountViewer'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'


function App() {
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div className="bg-dark-primary w-screen h-screen" id="app" data-testid="app">
      <Header />
      <Outlet />
    </div>
  )
}

export default App
