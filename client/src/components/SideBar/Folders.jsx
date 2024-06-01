import React from "react";
import { useState,useEffect } from 'react'
import './sidebar.css'
import { assets } from '../../assets/assets.js'
import { Link } from "react-router-dom";

export const Folders = ({folderObj,isExtended})=>{

    return (
        <Link to={`folders/files/${folderObj._id}`} className="recent">
        <div className="recent">
            <div className="recent-entry">
            <img src={assets.message_icon} alt="" />
            {isExtended ? <p>{folderObj.folderName}</p>:""}
            </div>
        </div>
        </Link>
    )
}