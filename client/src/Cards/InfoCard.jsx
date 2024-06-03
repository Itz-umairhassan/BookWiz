import React, { useState } from 'react'
import { Card, CardBody } from '@windmill/react-ui'
import { Navigate, redirect , useNavigate} from 'react-router-dom'
import DropDownFolders from '../components/DropDownFolders'



function InfoCard({ _Folder , children : icon, FolderUpdateCallBack, FolderDeleteCallBack}) {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false)
  
  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal(newFolder) {
    setIsModalOpen(false)
  }

 function handleClick(){
   console.log("clicked in folders");
   openModal();
 }
  
  function handleClick(folderId){
    navigate(`/app/folders/files/${folderId}` , {replace:true});
  }

  return (
    <Card style={{ position: 'relative', overflow:'visible'}} onClick = {()=>{console.log("fine");
      handleClick(_Folder._id); 
    }}>
      <CardBody className="flex items-center">
        {icon}
        <div>
          <div className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">{_Folder._id}
     <span style={{  position: 'absolute', top: 0, right: 30  }} >
     <DropDownFolders 
   
   _Folder={_Folder} 
   FolderUpdateCallBack={FolderUpdateCallBack}
   FolderDeleteCallBack={FolderDeleteCallBack}
 />

      </span>     


          
          </div>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{_Folder.folderName}</p>
        </div>
      </CardBody>
    </Card>
  //          <span   style={{ position: 'absolute', top: 0, right: 30  }} >  
  //          <DropDownFolders 
   
  //   _Folder={_Folder} 
  //   FolderUpdateCallBack={FolderUpdateCallBack}
  //   FolderDeleteCallBack={FolderDeleteCallBack}
  // />
  // </span>
          
  )
}

export default InfoCard
