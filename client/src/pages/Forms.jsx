import React, { useState, useRef, useEffect } from 'react'
import { Button, Input, Badge, Card, CardBody } from '@windmill/react-ui'
import { ChatIcon, BellIcon, EditIcon, TrashIcon } from '../icons'
import PageTitle from '../Typography/PageTitle'
import NoteCard from '../Cards/NoteCard'
import RoundIcon from '../components/RoundIcon'
import CreateFolderModal from '../Modals/CreateFolderModal'
import AddNotesModal from '../Modals/AddNotesModal'
import axios from 'axios'

function Forms() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [allNotes , setAllNotes] = useState([]);
  const [page,setPage] = useState(2);

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal(newFolder) {
    setIsModalOpen(false)
  }

  function onPageChange(p) {
    setPage(p)
  }

  // to fetch updated note on "Notes" page without fecthing from db directly
  const handleNoteUpdate = (updatedNote) => {
    console.log({"new note":updatedNote})
    const index = allNotes.findIndex(note => note._id === updatedNote._id);

    // Create a new array where the old note is replaced with the updated note
    const newNotes = [...allNotes];
    newNotes[index] = updatedNote;
    console.log("handled gracefuly");
    // Update the state
    setAllNotes(newNotes);
  };

  async function fetchNotes(){
    try{
      const res = await axios.post("/api/notes/fecthAll",{withCredentials:true});
      console.log(res);
      setAllNotes(res.data.payload);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchNotes();
  },[])

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <PageTitle>My Notes</PageTitle>
    </div>

    <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
      { allNotes.length > 0 ? allNotes.map((note) => (
          <NoteCard _Note={note} NoteUpdateCallBack={handleNoteUpdate}>
                <RoundIcon
                  icon={ChatIcon}
                  iconColorClass="text-teal-500 dark:text-teal-100"
                  bgColorClass="bg-teal-100 dark:bg-teal-500"
                  className="mr-4"
                />
          </NoteCard>
      )) : <></>}

    </div>

    </>
  )
}

export default Forms