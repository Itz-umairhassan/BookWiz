import React, { useState } from 'react'
import { Card, CardBody } from '@windmill/react-ui'
import { Navigate, redirect , useNavigate} from 'react-router-dom'
import AddNotesModal from '../Modals/UpdateNotesModal'
import DropDownNotes from '../components/DropDownNotes'


function NoteCard({_Note, NoteUpdateCallBack ,children : icon, NoteDeleteCallBack}) {
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
   function truncateContent(content, wordLimit) {
    return content.split(" ").slice(0, wordLimit).join(" ");
  }

  return (
    
<>
    <Card style={{ position: 'relative', overflow:'visible'}}>
   

      <CardBody className="flex items-center">
        {icon}
        <div>
        
        <p className="text-lg  font-semibold text-gray-700 dark:text-gray-200" style={{ display: 'flex', justifyContent: 'space-between',
         overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
         width: '100px' 
         }}>
          
          {_Note.name}  <span   style={{ position: 'absolute', top: 0, right: 30  }} > 
    
             <DropDownNotes  _Note={_Note} 
              NoteUpdateCallBack={NoteUpdateCallBack}
              NoteDeleteCallBack={NoteDeleteCallBack} />
    </span>
        </p>
        <p className="mb-2 text-sm font-regular text-gray-600 dark:text-gray-400" style={{  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
         width: '300px' }}>{truncateContent(_Note.user_content, 10)}</p>

        </div>
      </CardBody>
    </Card> 
     </>



  )
}

export default NoteCard
