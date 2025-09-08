import React from 'react'
import {Route, Routes} from 'react-router'
import Home from './pages/Home'
import About from './pages/About'
import Mess from './pages/Mess'
import Nav from './components/Nav'

const App = () => {
  return (
    <div>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/mess' element={<Mess/>}></Route>
      </Routes>
    </div>
  )
}

export default App
