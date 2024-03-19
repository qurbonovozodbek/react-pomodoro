import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import ShortBreak from './page/shortBreak'
import Home from './page/home'

function App() {
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shortBreak' element={<ShortBreak />} />
      </Routes>
    </div>
  )
}

export default App
