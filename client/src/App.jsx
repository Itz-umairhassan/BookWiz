// import React from 'react'

// import {BrowserRouter,Routes,Route} from 'react-router-dom'


import React, { lazy } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'

import Layout from './containers/Layout'
//const Login = lazy(() => import('./pages/Login'))
import Login from './pages/Login'
//const CreateAccount = lazy(() => import('./pages/CreateAccount'))
import CreateAccount from './pages/CreateAccount'
 //const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages1/Home'
import { SearchProvider } from './context/SearchContext'


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
      <SearchProvider>
      {/* Your application */}
   
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/chat" element={<Home />} />
    
        <Route path="/app/*" element={<Layout />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
      </SearchProvider>
    </Router>
  </>
  )
}
