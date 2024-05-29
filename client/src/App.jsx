// import React from 'react'

// import {BrowserRouter,Routes,Route} from 'react-router-dom'


import React, { lazy } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
//import Home from './pages/Home'
//import About from './pages/About'
// import Header from './components/Header'
// import SignUp from './pages/SignUp'
// import SignInSide from './pages/SignInSide'
//const Layout = lazy(() => import('./containers/Layout'))
import Layout from './containers/Layout'
//const Login = lazy(() => import('./pages/Login'))
import Login from './pages/Login'
//const CreateAccount = lazy(() => import('./pages/CreateAccount'))
import CreateAccount from './pages/CreateAccount'
 //const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
import ForgotPassword from './pages/ForgotPassword'
// const Forms = lazy(() => import('./pages/Forms'))
// const Cards = lazy(() => import('./pages/Cards'))


export default function App() {
  return (
    
    // <BrowserRouter   className='  text-3xl text-red-400' >
    //   {/* <Header/> */}
    //   <Routes>
    //     <Route path='/' element={<Home/>}/>
    //     {/* <Route path='/about' element={<About/>}/>
    //     <Route path='/signin' element={<SignInSide/>}/>
    //     <Route path='/signup' element={<SignUp/>}/> */}
    //   </Routes>
    //   </BrowserRouter>
<>
  <Router>
      <AccessibleNavigationAnnouncer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
    
        <Route path="/app/*" element={<Layout />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  </>
  )
}
