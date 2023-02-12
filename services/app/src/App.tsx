import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { incremented } from './features/counter/counterSlice'
import CountViewer from './components/CountViewer'


function App() {
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div className="" id="app" data-testid="app">

    </div>
  )
}

export default App
