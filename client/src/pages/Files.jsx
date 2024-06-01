import React, { useState, useContext,useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone';

import { SearchContext } from '../context/SearchContext'

import response from '../utils/demo/tableData'
import axios from 'axios';
import { HeartIcon, EditIcon, TrashIcon,fileIcon } from '../icons';
import { FaSpinner, FaCircleNotch } from 'react-icons/fa';
//import { Dropdown, DropdownItem } from '@windmill/react-ui'

import Dropdown from '../components/DropDown';

import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
  Button
} from '@windmill/react-ui'
import { useNavigate, useParams } from 'react-router-dom';


function Files() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [isUploading, setIsUploading] = useState(false);
  const [allFiles, setAllFiles] = useState([]);

  const { searchTerm } = useContext(SearchContext)
  const [filteredFiles, setFilteredFiles] = useState([])
  

  // get folderId from url
  const { folderId } = useParams();
  const navigate = useNavigate();
  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  const handleFileLoading = async () => {
    try {
      console.log("send request");
      const res = await axios.get(`/api/folder/getFiles/${folderId}`, {
        withCredentials: true
      });

      console.log(res);
      setAllFiles(res.data.payload);
    } catch (error) {
      console.log(error);
    }
  }

  // navigate to chat module for particular file
  const handleChatNavigation = (fileId) => {
    navigate(`/app/chat/${fileId}`, { replace: true })
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    console.log("Loading files triggered");
    handleFileLoading();

  }, [page]);

  useEffect(() => {
    if (searchTerm) {
      const newFilteredFiles = allFiles.filter(file =>
        file.fileName && file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredFiles(newFilteredFiles)
    } else {
      setFilteredFiles(allFiles)
    }
  }, [searchTerm, allFiles])

  // Rest of your component
  // Replace allFiles with filteredFiles in your rendering code




  const renderFileTypeBadge = (fileType) => {
    const fileTypeLowerCase = fileType.toLowerCase(); // Convert to lowercase
    
    if (fileTypeLowerCase === 'pdf') {
      return <Badge type="danger">PDF</Badge>;
    } else if (fileTypeLowerCase === 'docs') {
      return <Badge type="primary">Docs</Badge>;
    } else {
      return <Badge>{fileType}</Badge>; // Default badge for other file types
    }
  };

  // code for uploading files
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      setIsUploading(true);

        const formData = new FormData();
        formData.append('file' , file);
        formData.append("folderId" , folderId);
       
        axios.post('/api/file/upload', formData, {
          'Content-Type': 'multipart/form-data',
          withCredentials: true
        }).then(response => {

          console.log(response);
          setAllFiles(previousFiles => [...previousFiles, response.data.payload[0]]);
          setIsUploading(false);

      }).catch(error => {

        console.error(error);
        setIsUploading(false);

      });
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onDelete = async (fileId) => {
    try {
      const res = await axios.delete(`/api/file/delete/${fileId}`, {
        withCredentials: true
      });

      console.log(res);
      setAllFiles(allFiles.filter(file => file._id !== fileId));
    } catch (error) {
      console.log(error);
    }
  
  }
  
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <i class="fa-solid fa-upload"></i>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {/* <i class="fa-solid fa-upload">Files</i> */}
          {isUploading ? <Button className='mt-3 mb-3' iconLeft={FaCircleNotch}>Uploading file...</Button> : 
          <Button  className=' mt-3 mb-3' iconLeft={fileIcon}>Upload File</Button>
          }
          
          
          
        </div>
      </div>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Title</TableCell>
              <TableCell>type</TableCell>
              {/* <TableCell>S</TableCell> */}
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {filteredFiles.map((file, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                  <Avatar className="hidden mr-3 md:block rounded-full" src={'https://png.pngtree.com/png-vector/20190129/ourmid/pngtree-document-vector-icon-png-image_355823.jpg'} alt="User image" />


                    <div>
                      <p  className="font-semibold">{file.fileName}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{"nice nice"}</p>
                    </div>
                  </div>
                </TableCell>
              
                  <TableCell>
                  {renderFileTypeBadge(file.fileType)}
                  </TableCell>
                {/* </TableCell> */}
                <TableCell>
                  <span className="text-sm">{new Date(file.createdAt).toLocaleDateString()}</span>
                </TableCell>
                <TableCell>
            
                  
                  <Dropdown fileId={file._id} handleChatNavigation={handleChatNavigation} onDelete={onDelete} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>
      <div>
 
      </div>

    </>
  )
}

export default Files
