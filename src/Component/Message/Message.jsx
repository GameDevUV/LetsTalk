import React, { useContext, useEffect, useState } from 'react'
import { FaVideo, FaPhone, FaShare } from 'react-icons/fa'
import { BiMenu, BiSend } from 'react-icons/bi'
import { ChatContext } from '../../Context/ChatContext'
import { Socket } from 'socket.io-client'
import axios from 'axios'
import { FaLeftLong } from 'react-icons/fa6'
import './Message.css'

const Message = () => {
  const { message, setMessage, userName, chatArr, setChatArr, server, isTyping, typerUser, setTyperUser, setOpenprofile } = useContext(ChatContext);
  const { toTalk, selectedChatId, setSelectedChatId, selectTOTalk, createChat , toggleContact , toggle2 , setToggleContact , chatType } = useContext(ChatContext);

  const [toTraverse, setToTraverse] = useState(false)
  const [refrestToggle, setRefrestToggle] = useState(false)
  const [openOptions , setOpenOptions] = useState(false);



  const fetchMeaage = (chatId) => {
    axios.get(`http://localhost:5000/chat/getmessage?chatid=${chatId}`).then((resp) => {
      setChatArr(resp.data.messages);
    }).catch((e) => {
    }).finally(() => {
      if (Array.isArray(chatArr) && chatArr.length === 0) {
        setToTraverse(false);
      } else {
        setToTraverse(true);
      }
    })
  }
  // send message function
  const send = (e) => {
    setRefrestToggle(!refrestToggle)
    console.log("sending data :", "Chat ID: ", selectedChatId)
    e.preventDefault();
    server.emit('sendMessage', {
      userName,
      chatId: selectedChatId,
      message,
      toUserName: toTalk.userName
    })

    setMessage('');
  }


  useEffect(() => {
    fetchMeaage(selectedChatId);
  }, [selectedChatId])

  useEffect(()=>{
    server.on('newMessage' , (payload)=>{
      if(payload.chatId === selectedChatId){
        console.log("messgae is coming")
        setChatArr((prev)=>[...prev , payload])
      }
    })

    return()=>{
      server.off('newMessage')
    }
  }, [])

  return (
    <>
      {
        toTalk.length === 0 ?
          <div  className="chtame">
            <div className="chat-details">

            </div>
            <div className="message-box">
              <div className="message-sub-box">
                <div id='user' className="message-chat">

                </div>
              </div>
            </div>
            <div className="input-box" >
              <form className='msg-form' onSubmit={send} style={{ display: 'none' }}>
                <input
                  type="text"
                  className="message-input"
                  placeholder='type something here...'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button className='send-button' type="submit" > <BiSend /> </button>
              </form>
            </div>
          </div>
          :
          <div className='chatme'>
            <div className="chat-details">
              <div className="left-name">
                <div className="back-div">
                  <span className="back-button"
                  onClick={()=>setToggleContact(!toggleContact)}
                  >
                    <FaLeftLong />
                  </span>
                </div>
                <div className="image-dp">
                  <span className="dp"></span>
                </div>
                <p className="name-det">{toTalk.userName}</p>
              </div>
              <div className="right-call-options">
                <div className="opt-call">
                  {/* <span className="call"><FaVideo /></span>
                  <span className="call"><FaPhone /></span> */}
                  {chatType === 'groups' ?<span className="call" onClick={()=>setOpenOptions(true)}><BiMenu /></span> : ""}
                  {/* <span className="call"> </span> */}
                </div>
                <div className="chat-options" style={{display: openOptions ? 'flex' : 'none'}}>
                  <ul className="chat-ul">
                    <li className="chaat-li" onClick={()=>setOpenOptions(false)}>Close</li>
                    <li className="chaat-li">Add User</li>
                    <li className="chaat-li">Remove User</li>
                    <li className="chaat-li">Create Admin</li>
                    <li className="chaat-li">Leave Group</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="message-box">
              <div className="message-sub-box">
                {
                  // toTraverse ?
                  chatArr && chatArr.map((payload, index) => {
                    return (
                      (payload.senderId === userName) ?
                        <div id='user' className="message-chat" key={index}>
                          <p id='user-msg' className='user' style={{ backgroundColor: 'Black' }} >
                            <span className="user-name">You</span>
                            <span className="member-chat" style={{ color: 'white' }} >{payload.content}</span>
                          </p>
                        </div> :
                        <div id='member-msg' className="message-chat" key={index}>
                          <span className="user-profile">
                            {/* {"payload.userName image"} */}
                          </span>
                          <p className="member" style={{ backgroundColor: 'white' }} >
                            <span className="user-name">{payload.senderId}</span>
                            <span className="member-chat">{payload.content}</span></p>
                        </div>
                    )
                  })
                  // : <h1>Start Chatting here</h1>
                }

                {
                  (isTyping && userName !== typerUser) ?
                    <div id='member' className="message-chat">
                      <span className="user-profile"></span>
                      <p className="member" style={{ backgroundColor: 'white' }} >
                        <span className="user-name">{typerUser}</span>
                        <span className="member-chat">....typing....</span></p>
                    </div>
                    :
                    null
                }
              </div>
            </div>
            <div className="input-box">
              <form className='msg-form' onSubmit={send}>
                <input
                  type="text"
                  className="message-input"
                  placeholder='type something here...'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button className='send-button' type="submit" > <BiSend /> </button>
              </form>
            </div>
          </div >
      }

    </>
  )
}

export default Message