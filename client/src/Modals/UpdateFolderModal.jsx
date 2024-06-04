import React, { useState, useEffect } from 'react'

import PageTitle from '../Typography/PageTitle'
import SectionTitle from '../Typography/SectionTitle'
import CTA from '../components/CTA'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input} from '@windmill/react-ui'
import axios from 'axios'

function UpdateFolderModal({_Folder, FolderUpdateCallBack, isModelOpen,closeModal }) {
    const [folderName , setFolderName] = useState("");

    useEffect(() => {
        setFolderName(_Folder.folderName);
    }, [_Folder]);
    console.log("iN UPDATED",_Folder)
    const handleChange = (e) => {
        setFolderName(e.target.value);
    }

    const handleFolderUpdate = async ()=>{
        try{
            const payloadData = {
                "folderId":_Folder._id,
                "folderName":folderName,
                "_status":"private"
            }
            console.log("FOLDERNAME",folderName)
            console.log("payload",_Folder)
            const res = await axios.post(`/api/folder/editFolder`, payloadData,{
                withCredentials: true
            });

            if(res.status===200)
                {
                    console.log("updated")
                    FolderUpdateCallBack(res.data.payload[0])
                   // folderUpdateCallBack();
                    closeModal();
                }
          
        }catch(err){
            console.log(err);
        }
    }

    return (
    <>
      <Modal isOpen={isModelOpen} onClose={closeModal}>
        <ModalHeader>Update Folder Name</ModalHeader>
        <ModalBody>
        <Input value={folderName} valid onChange={handleChange}/>
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button onClick={handleFolderUpdate}>Edit Folder</Button>
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

export default UpdateFolderModal
