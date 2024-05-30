import React, { useState } from 'react'

import PageTitle from '../Typography/PageTitle'
import SectionTitle from '../Typography/SectionTitle'
import CTA from '../components/CTA'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input} from '@windmill/react-ui'
import axios from 'axios'

function CreateFolderModal({ isModelOpen,closeModal }) {
    const [folderName , setFolderName] = useState("");
    const handleChange = (e) => {
        setFolderName(e.target.value);
    }

    const handleFolderCreation = async ()=>{
        try{
            const payloadData = {
                "folderName":folderName,
                "status":"private"
            }
            const res = await axios.post('/api/folder/create', payloadData,{
                withCredentials: true
            });

            console.log(res);
            closeModal(res.data.payload[0]);
        }catch(error){
            console.log(error);
            closeModal(null);
        }
    }

  return (
    <>
      <Modal isOpen={isModelOpen} onClose={closeModal}>
        <ModalHeader>Enter Folder Name</ModalHeader>
        <ModalBody>
        <Input valid onChange={handleChange}/>
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button onClick={handleFolderCreation}>Add Folder</Button>
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

export default CreateFolderModal
