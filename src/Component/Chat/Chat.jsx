import React, { useContext, useEffect } from 'react'
import { io } from 'socket.io-client'
import '../../App.css'
import { ChatContext } from '../../Context/ChatContext'
import Contact from '../Contact/Contact'
import Message from '../Message/Message'
import Profile from '../Profile/Profile'

const Chat = () => {
  const { userName, setId, setTyperUser, setChatArr, server, setisTyping, requests } = useContext(ChatContext);
  const { setOnline } = useContext(ChatContext);



  useEffect(() => {

    const setUserOnline = () => {
      // console.log("you are online");
    }

    server.on('connect', () => {
      // set user to online
      server.on('online', (payload) => {
        // console.log(payload.status);
        // chang user name
        setOnline("user1", payload.status)
      })
      setUserOnline();
    })

    server.on('offline' , (payload)=>{
      setOnline('user1' , payload.status)
    })

    return () => {
    }
  }, [])

  return (
    <>
      <div className="main">
        <div className="Chats">
          <Contact />
          <Profile />
          <Message />
        </div>
      </div>
    </>
  )
}

export default Chat