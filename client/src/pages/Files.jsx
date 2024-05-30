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
import { HeartIcon } from '../icons';

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
import { useParams } from 'react-router-dom';


function Files() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [isUploading, setIsUploading] = useState(false);
 
  // get folderId from url
  const {folderId} = useParams();

  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  }, [page]);

  // code for uploading files
  const onDrop = useCallback((acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        setIsUploading(true);

        const formData = new FormData();
        formData.append('file' , file);
        formData.append("folderId" , folderId);
        for(let pair of formData){
          console.log(pair[0], pair[1])
        }
        axios.post('/api/file/upload', formData, {
          'Content-Type': 'multipart/form-data',
          withCredentials: true
        }).then(response => {

          console.log(response);
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
      <PageTitle>Files</PageTitle>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Button iconLeft={HeartIcon}>Icon left</Button>
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
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User image" />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">$ {user.amount}</span>
                </TableCell>
                <TableCell>
                  <Badge type={user.status}>{user.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span>
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
