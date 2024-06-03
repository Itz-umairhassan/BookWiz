import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input,Label, Textarea} from '@windmill/react-ui'
import axios from 'axios';

function AddNotesModal({ NoteAddCallBack, isModelOpen, closeModal }) {
  
  const initialFormData = {
    name: '',
    user_content: '',
    user_content: ''
  };
  const [formData, setFormData] = useState(initialFormData)
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value })
    }
  
    const handleNoteAddition = async () => {
      try {
        const resp = await axios.post("/api/notes/create", formData, {
          withCredentials: true
        })
  
        NoteAddCallBack(resp.data.payload[0])
        setFormData(initialFormData);
        closeModal()
      } catch (error) {
        console.error(error)
      }
    }
  
    return (
      <>
        <Modal isOpen={isModelOpen} onClose={closeModal}>
          <ModalHeader>Enter Note details</ModalHeader>
          <ModalBody>
            <Label>
              <span>Name:</span>
              <Input value={formData.name} id="name" onChange={handleChange} />
            </Label>
       
            <Label>
              <span>Message</span>
              <Textarea value={formData.user_content} id="user_content" className="mt-1" rows="3" placeholder="Enter some long form content." onChange={handleChange} />
            </Label>

            <Label>
              <span>Message</span>
              <Textarea value={formData.model_content} id="model_content" className="mt-1" rows="3" placeholder="Enter some long form content." onChange={handleChange} />
            </Label>
          </ModalBody>
          <ModalFooter>
            <div className="hidden sm:block">
              <Button layout="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
            <div className="hidden sm:block">
              <Button onClick={handleNoteAddition}>Add Note</Button>
            </div>
            <div className="block w-full sm:hidden">
              <Button block size="large" layout="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
            <div className="block w-full sm:hidden">
              <Button block size="large">
                Accept
              </Button>
            </div>
          </ModalFooter>
        </Modal>
      </>
    )
  }
  
  export default AddNotesModal