import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input,Label, Textarea} from '@windmill/react-ui'
import axios from 'axios';

function AddNotesModal({ _Note,NoteUpdateCallBack, isModelOpen,closeModal }) {
    const [folderName , setFolderName] = useState("");
    const [changeDetected , setChangeDetected] = useState(false);
    const [formData,setFormData]=useState(_Note);

    const handleChange = (e) => {
        console.log("changing");
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleNotesUpdation = async ()=>{
        try{
        console.log("notes updated");
        setFormData({ ...formData, ["noteId"]: _Note._id });
        
        const resp = await axios.post("/api/notes/update",formData,{
            withCredentials:true
        });

        console.log(resp);
        NoteUpdateCallBack(resp.data.payload[0]);
        closeModal();
    }catch(error){
        console.log(error);
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
            <Textarea value={formData["model_content"]} id="model_content" className="mt-1" rows="3" placeholder="Enter some long form content." onChange={handleChange} />
        </Label>
        <Label>
        <span>Message</span>
        <Textarea value = {formData["user_content"]} id="user_content" className="mt-1" rows="3" placeholder="Enter some long form content." onChange={handleChange} />
        </Label>

        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button onClick={handleNotesUpdation}>Add Note</Button>
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