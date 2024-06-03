import React, { useState,useContext, useRef, useEffect } from 'react'
import { Button, Input, Badge, Card, CardBody } from '@windmill/react-ui'
import { ChatIcon, BellIcon, EditIcon, TrashIcon, ModalsIcon, FormsIcon } from '../icons'
import PageTitle from '../Typography/PageTitle'
import NoteCard from '../Cards/NoteCard'
import RoundIcon from '../components/RoundIcon'
import CreateFolderModal from '../Modals/CreateFolderModal'
import UpdateNotesModal from '../Modals/UpdateNotesModal'
import AddNotesModal from '../Modals/AddNotesModal'
import axios from 'axios'
import { SearchContext } from '../context/SearchContext'

function Notes() {

  const { searchTerm } = useContext(SearchContext)
  const [allNotes, setAllNotes] = useState([]) // Assuming you have a state for all notes
  const [filteredNotes, setFilteredNotes] = useState([])

  console.log("term  "+searchTerm)


  const [isModalOpen, setIsModalOpen] = useState(false)
 
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
    setAllNotes(newNotes);
  
  };

  const handleAddNote = (newNote) => {
    // setAllNotes(prevNotes => [...prevNotes, newNote])
    fetchNotes();
  }

  async function fetchNotes(){
    try{
      const res = await axios.post("/api/notes/fecthAll",{withCredentials:true});
console.log("setting notes")
      setAllNotes(res.data.payload);
      console.log(allNotes)
    }catch(error){
      console.log(error);
    }
  }
  console.log(allNotes)

  const handleDeleteNote = async (noteId) => {
    try {
      const res = await axios.delete(`/api/notes/${noteId}`, { withCredentials: true });
      console.log(res);
      // After deleting the note, fetch the updated list of notes
      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  }
    // Use searchTerm to filter the notes before rendering them
    // const filteredNotes = allNotes.filter(note => note.title.includes(searchTerm))

    useEffect(() => {
      fetchNotes();
    }, [])
    
    useEffect(() => {
      if (searchTerm) {
        const newFilteredNotes = allNotes.filter(note => 
          note.name && note.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredNotes(newFilteredNotes)
      } else {
        setFilteredNotes(allNotes)
      }
    }, [searchTerm, allNotes])

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <PageTitle>My Notes</PageTitle>
      <Button onClick={openModal} size="large">
        Create Note
      </Button>
      <AddNotesModal isModelOpen={isModalOpen} closeModal={closeModal} NoteAddCallBack={handleAddNote}/>
    
    </div>
     
    <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
      { allNotes.length > 0 ? filteredNotes.map((note) => (
          <NoteCard _Note={note} NoteUpdateCallBack={handleNoteUpdate}  NoteDeleteCallBack={handleDeleteNote} >
                <RoundIcon
                  icon={FormsIcon}
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

export default Notes