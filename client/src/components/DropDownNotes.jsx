import React, { useState,useContext, useRef, useEffect } from 'react'

import { Dropdown, DropdownItem, Badge, Button } from '@windmill/react-ui'

import UpdateNotesModal from '../Modals/UpdateNotesModal'


function DropdownExample({ _Note, NoteDeleteCallBack,  NoteUpdateCallBack}) {
  const [isOpen, setIsOpen] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)
  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal(newFolder) {
    setIsModalOpen(false)
  }






  
const [isMenuOpen, setIsMenuOpen] = useState(false);
function handleClick() {
  setIsMenuOpen(!isMenuOpen);
}
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };
//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

const handleUpdate = (note) => {
    NoteUpdateCallBack(note);
    setDropdownOpen(false);
  };
  
  const handleDelete = (noteId) => {
    NoteDeleteCallBack(noteId);
    setDropdownOpen(false);
  };

  return (

    <>
     <div  style={{ display: 'flex', alignItems: 'center' }} ref={ref}>
          <button

            onClick={handleClick}
       
          >
            ...
          </button> 
 <Dropdown align="left" isOpen={isMenuOpen} style={{ width: '20px', height:'100px' }} >
            <DropdownItem tag="a" href="#" onClick={openModal}  className="justify-between">
             
              <span >Edit</span>
              <UpdateNotesModal _Note={_Note} isModelOpen={isModalOpen} closeModal={closeModal} NoteUpdateCallBack={NoteUpdateCallBack}/>
            </DropdownItem>
            <DropdownItem tag="a" href="#" onClick={() => NoteDeleteCallBack(_Note._id)}className="justify-between">

              <span>Delete
              </span>
            </DropdownItem>
       
          </Dropdown>
          </div>
        
    </>
  )
}
export default DropdownExample


    
         
