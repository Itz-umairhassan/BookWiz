import React, { useEffect} from 'react'
import { SideBar } from '../components/SideBar/SideBar'
import Main from '../components/Main/Main.jsx'
import './Home.css'
import axios from 'axios'
import { BrowserRouter , Routes, Route, useResolvedPath} from 'react-router-dom'
import { Files } from '../components/Files/Files.jsx'

const Home = () => {
  const pp = useResolvedPath("/");
  console.log(pp);
  return (
    <div className='container' >
      <SideBar/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path = "files/:folderId" element={<Files/>}/>
      </Routes>
    </div>
  )
}

export default Home