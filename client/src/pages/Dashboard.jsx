import React, { useState, useEffect } from 'react'

import CTA from '../components/CTA'
import InfoCard from '../Cards/InfoCard'
// import ChartCard from '../components/Chart/ChartCard'
// import { Doughnut, Line } from 'react-chartjs-2'
// import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import response from '../utils/demo/tableData'
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
} from '@windmill/react-ui'
import axios from 'axios'


function Dashboard() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [folders , setFolders] = useState([]);
  const [spin , setSpin] = useState(true);
  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length
  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  const fetchFolders = async () => {
    setSpin(true);

    try{
      const res = await axios.get('/api/user/folders' , {
        withCredentials: true
      });

      const dT = res.data.payload[0];
      setFolders(dT);
      console.log(dT);
      setSpin(false);
    }catch(error){
      console.error(error.response.data.message);
      setSpin(false);
    }
  }
  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    console.log("home triggered");
    fetchFolders();
  }, [page])

  return (
    <>
    
      <PageTitle>MyDocuments</PageTitle>

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        
        <InfoCard title="umair.hassan" value="DSA Stuff">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="OOP" value="Object Pillars">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="OOS" value="Synchronization">
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="DB" value="DML">
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

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

export default Dashboard
