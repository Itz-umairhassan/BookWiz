import React, { useState, useRef, useEffect } from 'react'
import { Button, Input, Badge, Card, CardBody } from '@windmill/react-ui'
import { ChatIcon, BellIcon } from '../icons'
import PageTitle from '../Typography/PageTitle'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import SaveChatModal from '../Modals/saveChatModal'

function Chat() {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const [loading, setLoading] = useState(false);
  const [cname,setCname] = useState("");
  const [page,setPage] = useState(10);
  const messagesEndRef = useRef(null)

  const {fileId} = useParams();
  const location = useLocation();

  // handle the save chat modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  function openModal() {
    console.log("open this modal");
    setIsModalOpen(true)
  }
  function closeModal() {
    console.log("close the modal");
    setIsModalOpen(false)
    console.log("modal is " + isModalOpen);
  }

  /////////////////////////////////////////////////////
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // load chat message from backend and store in current array to display on frontend
  const loadChat = async (chat_id)=>{
    console.log("loading chat with id " + chat_id);
    try{
      const payload = {
        "chatId" : chat_id
      }
      const response = await axios.post("/api/chat/fetchChat" ,payload,{
        withCredentials: true
      })

      let chatMessages = response.data.payload[0].messages;

      for(let index in chatMessages){
        chatMessages[index] = JSON.parse(chatMessages[index]);
      }
      console.log(response);
      setChat(chatMessages);
      const nname = response.data.payload[0].chatName;
      console.log(nname);
      setCname(nname);
      console.log(`chat name is ${cname}`);
            
    }catch(error){
      console.log(error);
    }
  }


  // upload the chat to backend to retrieve later...
  const hanleSaveChat = async (chatName)=>{
    const {chatId} = location.state || {};

    try{
      if(chatId){
        const payload = {
          "chatName" : chatName,
          "chatMessages" : chat,
          "chatId" : chatId
        }

        const response = await axios.post("/api/chat/updateChat" , payload,{
          withCredentials: true
        });

        console.log(response);
        closeModal();

      }else{
        console.log("save the chat with name " + chatName);
        const payload = {
          "chatName" : chatName,
          "fileId" : fileId,
          "chatMessages" : chat
        }

        const response = await axios.post("/api/chat/saveChat",payload,{
          withCredentials: true
        })

        console.log(response);

        closeModal();
      }
    }catch(error){
      console.log(error);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  useEffect(()=>{
    scrollToBottom();
  }, [chat]);

  useEffect(()=>{
    console.log("loading chat from backend");
    const {chatId} = location.state || {};
    loadChat(chatId);
  },[page])
  
  // handle mesages.....................
  async function sendMessage() {
    if (message.trim() !== '') {
      const newMessage = { message, sender: 'user' };
      setChat([...chat, newMessage, { sender: 'server', loading: true }]);
      setMessage('');
  
      // Send the message to the server
      try {
        const payload = {
            "documentId" : fileId,
            "query" : message
        }
  
        const response = await axios.post("/api/file/query",payload,{
            withCredentials: true
        })

        console.log(response);
        const reply = response.data.payload[0]["model response"].output_text;
  
        // Update the loading state of the server's message and add the server's response to the chat
        if (response.data && response.data.message) {
          setChat(prevChat => {
            const updatedChat = [...prevChat];
            updatedChat[updatedChat.length - 1] = { message: reply, sender: 'server' };  // Update the server's message
            return updatedChat;
          });
        }
      } catch (error) {
        console.log(error);
        console.error('Failed to send message:', error)
        setChat(prevChat => {
          const updatedChat = [...prevChat];
          updatedChat.pop();  // Remove the loading message
          return updatedChat;
        });
      }
    }
  }



  return (
    <div className="p-6 flex flex-col h-full">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <PageTitle>Chat</PageTitle>
      <Button onClick={openModal} size="large">
        Save Chat
      </Button>
      <SaveChatModal isModelOpen={isModalOpen} closeModal={closeModal} handleSaveChat={hanleSaveChat} chat_name={cname}/>
    </div>



  <div className="flex flex-col space-y-4 p-3 bg-white dark:bg-gray-800 rounded shadow overflow-y-auto custom-scrollbar flex-grow" style={{ maxHeight: '70vh' }}>
  {chat.map((msg, index) => (
  <div key={index} className={`flex items-start ${msg.sender === 'user' ? 'justify-end' : ''}`}>
    <Card colored className={msg.sender === 'user' ? "bg-gray-700" : "bg-gray-900"}>
      <CardBody className="flex-shrink min-w-0">
        {msg.loading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            <span>Loading...</span>
          </div>
        ) : (
          <>
            <p className="text-white overflow-auto whitespace-normal" style={{ fontSize: '15px' }}>{msg.message}</p>
            <div className="flex justify-end mt-2">
              <Button layout="link" size="icon" aria-label="Edit">
                <ChatIcon className="w-5 h-5" />
              </Button>
              <Button layout="link" size="icon" aria-label="Edit">
                <ChatIcon className="w-5 h-5" />
              </Button>
        </div>
      </>
    )}
  </CardBody>
</Card>
</div>
))}
<div ref={messagesEndRef} />
</div>
      <div className="flex mt-4 sticky bottom-0 bg-white dark:bg-gray-800 p-6">
        <Input
          className="mr-2"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button onClick={sendMessage}>
          <ChatIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}

export default Chat