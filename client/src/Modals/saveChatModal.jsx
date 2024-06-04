import React, { useContext, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input} from '@windmill/react-ui'
import axios from 'axios'
import { Context } from '../context/Context'

function SaveChatModal({ isModelOpen,closeModal,handleSaveChat,chat_name}) {
    const {user}=useContext(Context)
    const [chatName , setChatName] = useState(chat_name);
    const handleChange = (e) => {
        setChatName(e.target.value);
        console.log("called");
    }

  return (
    <>
      <Modal isOpen={isModelOpen} onClose={closeModal}>
        <ModalHeader>Enter Chat Name</ModalHeader>
        <ModalBody>
        <Input valid onChange={handleChange} value = {chatName}/>
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button onClick={()=>{handleSaveChat(chatName)}}>Save Chat</Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default SaveChatModal
