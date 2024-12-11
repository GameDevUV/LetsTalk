import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'
import '../../App.css'
import { ChatContext } from '../../Context/ChatContext'
import Contact from '../Contact/Contact'
import Message from '../Message/Message'
import Profile from '../Profile/Profile'

const Chat = () => {
  const { userName, setId, setTyperUser, setChatArr, server, setisTyping, requests, setFContacts, searching } = useContext(ChatContext);
  const { toggleContact, setToggleContact, toggle2, refresh , setRefresh } = useContext(ChatContext);



  useEffect(() => {
    // console.log("hii by selected")
    axios.get(`${process.env.API}user/selectedcontact?userName=${userName}`).then((resp) => {
      let letContact = resp.data.fullContacts;
      // console.log(letContact)
      setFContacts(letContact);

      // console.log(resp.data.fullContacts)
    }).catch((e) => {
      // console.log("error during fecthing get Contacts", e);
    })
  }, [searching])


  // Another useEffect for searching

  useEffect(() => {
    if (searching) {
      axios.get(`${process.env.API}user/selectedcontact?userName=${userName}`)
        .then((resp) => {
          setFContacts(resp.data.fContacts);
        })
        .catch((e) => console.error("Error searching contacts:", e));
    }
  }, [searching]);

  useEffect(() => {
    server.on('connect', () => {
      console.log("message emmited")
      server.emit('setOnline', { userName })
    });

    server.on('refresh' , (payload)=>{
      setRefresh(!refresh);
    })
    return () => {
      server.off("connect");
    };
  }, [])

  return (
    <>
      {
        !toggle2 ? <div className="main">
          <div className="Chats">
            <Contact />
            <Profile />
            <Message />
          </div>
        </div> : <div className="main">
          <div className="Chats">
            {
              !toggleContact ?
                <>
                  <Contact />
                  <Profile />
                </>
                :
                <Message />
            }
          </div>
        </div>
      }

    </>
  )
}

export default Chat