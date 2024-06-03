import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input,Label, Textarea} from '@windmill/react-ui'
import axios from 'axios';


function UpdateNotesModal({ _Note, NoteUpdateCallBack, isModelOpen,closeModal }) {
    const [folderName , setFolderName] = useState("");
    const [changeDetected , setChangeDetected] = useState(false);
    const [formData,setFormData]=useState(_Note);

    useEffect(() => {
      setFormData(_Note)
    }, [_Note])

      const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
    setChangeDetected(true)
  }
  const handleNotesUpdation = async () => {
    try {
      const updatedNote = { ...formData, noteId: _Note._id }
      const resp = await axios.post("/api/notes/update", updatedNote, {
        withCredentials: true
      })
      NoteUpdateCallBack(resp.data.payload[0])
      
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
            <Input value = {formData["name"]} id="name" valid onChange={handleChange}/>
        </Label>
     
        <Label>
        <span>Message</span>
        <Textarea value = {formData["user_content"]} id="user_content" className="mt-1" rows="3" placeholder="Enter some long form content." onChange={handleChange} />
        </Label>

        <Label>
            <span>Message</span>
            <Textarea value={formData["model_content"]} id="model_content" className="mt-1" rows="3" placeholder="Enter some long form content." onChange={handleChange} />
        </Label>

        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button onClick={handleNotesUpdation}>Edit Note</Button>
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

export default UpdateNotesModal