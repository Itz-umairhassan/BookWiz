import React, { useState, useRef, useEffect } from 'react'
import { Button, Input, Badge, Card, CardBody } from '@windmill/react-ui'
import { ChatIcon, BellIcon } from '../icons'
import PageTitle from '../Typography/PageTitle'

function Chat() {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [chat]);

  function sendMessage() {
    if (message.trim() !== '') {
      setChat([...chat, { message, sender: 'user' }])
      setMessage('')

      // Send the message to the server
      try {
        const response = {
          "data": {
            "message": "Hello, how can I help you today? "
          }
        }

        // Add the server's response to the chat
        if (response.data && response.data.message) {
          setLoading(false);
          setChat(prevChat => [...prevChat, { message: response.data.message, sender: 'server' }])
        }
      } catch (error) {
        console.error('Failed to send message:', error)
        setLoading(false);
      }
    }
  }

  return (
    <div className="p-6 flex flex-col h-full">
      <PageTitle>Chat</PageTitle>
      <div className="flex flex-col space-y-4 p-3 bg-white dark:bg-gray-800 rounded shadow overflow-y-auto custom-scrollbar flex-grow" style={{ maxHeight: '70vh' }}>
        {chat.map((msg, index) => (
          <div key={index} className={`flex items-start ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            <Card colored className={msg.sender === 'user' ? "bg-gray-700" : "bg-gray-900"}>
              <CardBody className="flex-shrink min-w-0">
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    <span>Loading...</span>
                  </div>
                ) : (
                  <>
                    <div className="bg-gray-800 p-4 rounded-md shadow-md max-w-lg ">
                      <p className="text-white overflow-auto whitespace-normal " style={{ fontSize: '15px', maxHeight: 'auto' }}>
                        {msg.message}
                      </p>
                    </div>


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