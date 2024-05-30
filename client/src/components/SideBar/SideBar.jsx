import React from 'react'
import { useState,useEffect } from 'react'
import './sidebar.css'
import { assets } from '../../assets/assets.js'
import axios from 'axios'
import {Folders} from "../SideBar/Folders.jsx"
import Spinner from './Spinner.jsx'

export const SideBar = () => {
    const [extended, setExtended] = useState(true);
    const [folders , setFolders] = useState([]);
    const [spin , setSpin] = useState(true);

    // fecth folders and load them in sidebar....

    useEffect(() => {
        const fetchData = async () => {
            console.log("fetching data");
            setSpin(true);
            try {
              const res = await axios.get('/api/user/folders',{
                withCredentials: true
              });

              const dT = res.data.payload[0];
              setFolders(dT);
              console.log(dT);
              setSpin(false);

            } catch (error) {
              console.error('Failed to fetch data:', error.response.data.message);
              setSpin(false);
            }
          };
      
          console.log("side bar triggered");
          fetchData();
      },[]); // add dependencies if needed

    return (
        <div className='sidebar'>
            <div className="top">
                <img className='menu' src={assets.menu_icon} alt="" onClick={()=>setExtended(prev=>!prev)} />
                <div className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>Add New Folder</p> : null}
                </div>
               
                {
                   true ? <Spinner /> : folders.map((folder) => <Folders isExtended={extended} folderObj={folder} />)
                }
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended?<p>Notes</p>:null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                   {extended?<p>Activity</p>:null } 
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.send_icon} alt="" />
                    {extended ?<p>Logout</p>:null}
                </div>
            </div>
        </div>
    )
}
