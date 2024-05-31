import React, { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone';
import CTA from '../components/CTA'
import InfoCard from '../Cards/InfoCard'
// import ChartCard from '../components/Chart/ChartCard'
// import { Doughnut, Line } from 'react-chartjs-2'
// import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import response from '../utils/demo/tableData'
import axios from 'axios';
import { HeartIcon, EditIcon, TrashIcon,fileIcon } from '../icons';
import { FaSpinner, FaCircleNotch } from 'react-icons/fa';


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

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <i class="fa-solid fa-upload"></i>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <i class="fa-solid fa-upload">Files</i>
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
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {allFiles.map((file, i) => (
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
                  <span className="text-sm">$ {200}</span>
                </TableCell>
                <TableCell>
                  <TableCell>
                  {renderFileTypeBadge(file.fileType)}
                  </TableCell>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(file.createdAt).toLocaleDateString()}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button onClick={() => handleChatNavigation(file._id)} layout="link" size="icon" aria-label="Edit">
                      <ChatIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete">
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
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

      {/* <PageTitle>Charts</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Revenue">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Traffic">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>
      </div> */}
    </>
  )
}

export default Files
