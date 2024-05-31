import React, { useState } from 'react'
import { Card, CardBody } from '@windmill/react-ui'
import { Navigate, redirect , useNavigate} from 'react-router-dom'
import AddNotesModal from '../Modals/AddNotesModal'

function NoteCard({_Note,NoteUpdateCallBack,children : icon}) {
    const [isModalOpen, setIsModalOpen] = useState(false)
  
    function openModal() {
      setIsModalOpen(true)
    }
  
    function closeModal(newFolder) {
      setIsModalOpen(false)
    }

   function handleClick(){
     console.log("clicked in notes");
     openModal();
   }

  return (
    <Card onClick = {handleClick}>
      <AddNotesModal _Note={_Note} NoteUpdateCallBack={NoteUpdateCallBack} isModelOpen={isModalOpen} closeModal={closeModal}/>
      <CardBody className="flex items-center">
        {icon}
        <div>
          <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">{_Note.name}</p>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{_Note.name}</p>
        </div>
      </CardBody>
    </Card>
  )
}

export default NoteCard
