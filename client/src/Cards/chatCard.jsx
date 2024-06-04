import React, { useState } from 'react'
import { Card, CardBody } from '@windmill/react-ui'
import { Navigate, redirect , useNavigate} from 'react-router-dom'
import AddNotesModal from '../Modals/UpdateNotesModal'
import DropDownNotes from '../components/DropDownNotes'

function ChatCard({_chat , children : icon }) {
    const navigate = useNavigate();
    const handleNavigation = ()=>{
        navigate(`/app/chat/${_chat.fileId}` , {state: {chatId : _chat._id}});
    }
  return (
    
<>
    <Card style={{ position: 'relative', overflow:'visible'}}>
   

      <CardBody onClick = {handleNavigation} className="flex items-center">
        {icon}
        <div>
        
        <p className="text-lg  font-semibold text-gray-700 dark:text-gray-200" style={{ display: 'flex', justifyContent: 'space-between',
         overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
         width: '100px' 
         }}>
          
          {_chat.chatName}  
          <span   style={{ position: 'absolute', top: 0, right: 30  }} > 
        </span>
        </p>
        

        </div>
      </CardBody>
    </Card> 
     </>



  )
}

export default ChatCard
