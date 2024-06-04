import React, { useState,useContext, useEffect } from 'react'
import InfoCard from '../Cards/InfoCard'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import PageTitle from '../Typography/PageTitle'
import ChatCard from '../Cards/chatCard'
import axios from 'axios'

function ChatHistory() {

  const [chats , setChats] = useState([]);

  const loadChatHistory =async ()=>{
    try{
      const response = await axios.post("/api/chat/fetchAll" ,{},{
        withCredentials: true
      });

      let allChats = [];
      if(response.data.payload){
        allChats = response.data.payload[0];
      }

      console.log(allChats);
      setChats(allChats);
    }catch(error){
      console.log(error);
    }
  }
  useEffect(() => {
   // setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    console.log("chat history triggered");
    loadChatHistory();
  }, [])

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <PageTitle>Previous Chats</PageTitle>
    </div>

    <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
      {
        chats.map((chat) =>{
          return (
            <ChatCard _chat = {chat}>
                <RoundIcon
                  icon={ChatIcon}
                  iconColorClass="text-teal-500 dark:text-teal-100"
                  bgColorClass="bg-teal-100 dark:bg-teal-500"
                  className="mr-4"
                />
            </ChatCard>
          )
        })
    
    }
    </div>

    </>
  )
}

export default ChatHistory
