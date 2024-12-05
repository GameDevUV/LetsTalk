import React, { useContext, useEffect, useState } from 'react'
import { FaVideo, FaPhone, FaShare } from 'react-icons/fa'
import { BiSend } from 'react-icons/bi'
import { ChatContext } from '../../Context/ChatContext'

const Message = () => {
  const { message, setMessage, userName, chatArr, setChatArr, server, isTyping, typerUser, setTyperUser, setOpenprofile } = useContext(ChatContext);
  const { toTalk } = useContext(ChatContext);


  // send message function
  const send = (e) => {
    e.preventDefault();
    setMessage('');
  }

  useEffect(()=>{
    console.log("length is : ", toTalk.length);
  })
  // upating chats Array
  useEffect(() => {
  }, [send])

  // for typing effect
  useEffect(() => {
    setTimeout(() => {
    }, 5000)
  }, [message])


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
              <form className='msg-form' onSubmit={send} style={{display: 'none'}}>
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
                  chatArr.map((payload, index) => {
                    return (
                      (payload.userName === userName) ?
                        <div id='user' className="message-chat" key={index}>
                          <p id='user-msg' className='user' style={{ backgroundColor: 'Black' }} >
                            <span className="user-name">You</span>
                            <span className="member-chat" style={{ color: 'white' }} >{payload.message}</span>
                          </p>
                        </div> :
                        <div id='member-msg' className="message-chat" key={index}>
                          <span className="user-profile">
                            {/* {"payload.userName image"} */}
                          </span>
                          <p className="member" style={{ backgroundColor: 'white' }} >
                            <span className="user-name">{payload.userName || "Admin"}</span>
                            <span className="member-chat">{payload.message}</span></p>
                        </div>
                    )
                  })
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