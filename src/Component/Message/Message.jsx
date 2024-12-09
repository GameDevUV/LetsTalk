import React, { useContext, useEffect, useState } from 'react'
import { FaVideo, FaPhone, FaShare } from 'react-icons/fa'
import { BiSend } from 'react-icons/bi'
import { ChatContext } from '../../Context/ChatContext'
import { Socket } from 'socket.io-client'
import axios from 'axios'
import { FaLeftLong } from 'react-icons/fa6'

const Message = () => {
  const { message, setMessage, userName, chatArr, setChatArr, server, isTyping, typerUser, setTyperUser, setOpenprofile } = useContext(ChatContext);
  const { toTalk, selectedChatId, setSelectedChatId, selectTOTalk, createChat } = useContext(ChatContext);

  const [toTraverse, setToTraverse] = useState(false)
  const [refrestToggle, setRefrestToggle] = useState(false)



  const fetchMeaage = (chatId) => {
    // console.log("Called fetch messages");
    axios.get(`http://localhost:5000/chat/getmessage?chatid=${chatId}`).then((resp) => {
      setChatArr(resp.data.messages);
      // console.log("response here: ", resp)
    }).catch((e) => {
      // console.log("error in fec=tching contacts: ", e);
    }).finally(() => {
      // console.log("finally called")
      if (Array.isArray(chatArr) && chatArr.length === 0) {
        setToTraverse(false);
        // console.log(true)
      } else {
        setToTraverse(true);
        // console.log(true)
      }
    })
  }
  // send message function
  const send = (e) => {
    setRefrestToggle(!refrestToggle)
    console.log("sending data :", "Chat ID: ", selectedChatId)
    e.preventDefault();
    server.emit('haveMessage', {
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

  useEffect(() => {

    server.on("getMessage", (payload) => {
      console.log("new message is coming");
    });
  
    return () => {
      server.off("newMessage");
    };
  }, []);




  return (
    <>
      {
        toTalk.length === 0 ?
          <div className="chtame">
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
                  <span className="back-button">
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
                  <span className="call"><FaVideo /></span>
                  <span className="call"><FaPhone /></span>
                  {/* <span className="call"> </span> */}
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