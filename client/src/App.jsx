import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

import Header from './components/Header'
import SignUp from './pages/SignUp'
import SignInSide from './pages/SignInSide'

export default function App() {
  return (
    <BrowserRouter className=' text-3xl text-red-400' >
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/signin' element={<SignInSide/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
      </BrowserRouter>
  )
}
