import { useState } from 'react'
import React from 'react'
import NavBar from './components/NavBar.tsx'
import Header from './components/Header.tsx'
import MovingBanner from './components/MovingBanner.tsx'
import backgroundImg from "./assets/sky.png"
import './App.css'

function App() {
  

  return (
    <div style={{backgroundImage: `url(${backgroundImg})`}}>
     <NavBar />
     <Header />
     <MovingBanner />
    </div>
  )
}

export default App
