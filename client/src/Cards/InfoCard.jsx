import React from 'react'
import { Card, CardBody } from '@windmill/react-ui'
import { Navigate, redirect , useNavigate} from 'react-router-dom'
function InfoCard({ _folder , children : icon}) {
  const navigate = useNavigate();
  
  function handleClick(folderId){
    navigate(`/app/files/${folderId}` , {replace:true});
  }

  return (
    <Card onClick = {()=>{console.log("fine");
      handleClick(_folder._id); 
    }}>
      <CardBody className="flex items-center">
        {icon}
        <div>
          <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">{_folder._id}</p>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{_folder.folderName}</p>
        </div>
      </CardBody>
    </Card>
  )
}

export default InfoCard
