import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import AboutPage from './pages/About'
import PrototypeExperiencePage from './pages/Prototype'
import Report from './pages/Report'
import Login from './pages/Login'
import Signup from './pages/Register'
function App() {
  return (
      <div className='overflow-hidden'>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/prototype' element={<PrototypeExperiencePage/>}/>
        <Route path='/report' element={<Report/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
      {/* <Home></Home> */}
    </div>
    
  )
}

export default App
