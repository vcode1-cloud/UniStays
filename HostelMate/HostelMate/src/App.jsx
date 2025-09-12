import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import About from './pages/About'
import Team from './pages/Team'
import Pune from './explore/Pune'
import Banglore from './explore/Banglore'
import Delhi from './explore/Delhi'

function App() {

  return (
    <>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/team' element={<Team/>}/>
        <Route path='/pune' element={<Pune/>}/>
        <Route path='/banglore' element={<Banglore/>}/>
        <Route path='/delhi' element={<Delhi/>}/>
      </Routes>
    </>
  )
}

export default App