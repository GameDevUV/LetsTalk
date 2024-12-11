import { useEffect, useState } from "react";
import { io, Socket } from 'socket.io-client'
import { ChatContext } from "./ChatContext";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";


const ChatProvider = ({ children }) => {
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();

  // connected to the server
  const server = io('http://localhost:4000', { transports: ['websocket'] });
  const [openprofile, setOpenprofile] = useState(false)

  // states for profile and authentication
  const [displayName, setDisplayName] = useState('')
  const [userName, setUserName] = useState('vsgamer9595');
  const [profilePic, setProfilePic] = useState('')
  const [mobileNum, setMobileNum] = useState('91')
  const [mail, setMail] = useState('')
  const [about, setAbout] = useState('Busy for now');
  const [loggedin, setLoggedin] = useState(false);
  const [isalready, setIsalready] = useState(false);
  const [authanticated2, setAuthanticated2] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState('');
  const [chatId, setChatId] = useState('');


 

  // const Login and authentication
  const genreateUserId = (userName) => {
    let userId = userName + "1l2e3t4s5talk"
    return userId;
  }

  const at = async () => {
    await loginWithRedirect();
  }

  const login = (e) => {
    e.preventDefault();
    if (!isalready) {
      let xId = genreateUserId(userName);
      axios.post('http://localhost:5000/user/adduser', {
        userId: xId,
        userName: userName,
        email: mail,
        displayName: displayName,
        MobileNumber: mobileNum,
        aboutme: about
      }).then((resp) => {
        // console.log("created resp: ", resp);
        setLoggedin(true);
        // console.log("done added user");
      })
    } else {
      // console.log("logged in")
      setLoggedin(true);
    }

  }

  // handling states for Chatting
  // unique identity for user
  const [id, setId] = useState('')
  // message which is being typing
  const [message, setMessage] = useState('');
  // array of messages
  const [chatArr, setChatArr] = useState([]);
  // typing effect indicator
  const [isTyping, setisTyping] = useState(false);
  const [typerUser, setTyperUser] = useState(''); //for who is typing
  const [toggleContact, setToggleContact] = useState(false)
  const [toggle2, setToggle2] = useState(false)


  useEffect(() => {
    if (window.innerWidth <= 1000) {
      setToggleContact(false);
      setToggle2(true)
      console.log(window.innerWidth);
    } else {
      setToggleContact(true);
      setToggle2(false)
      console.log("greater then called: ", window.innerWidth);
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      setUserName(user.nickname);
      setDisplayName(user.name);
      setProfilePic(user.picture);
      setMail(user.email);
      if (user.phone_number) {
        setMobileNum(user.phone_number);
      } else { }
    }
  }, [isAuthenticated])




  // socket methods

  const [searchResult, setSearchResult] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selectedUser, setSelectedUser] = useState([])
  const [contacts, setContacts] = useState([]);
  let [fContacts, setFContacts] = useState([]);
  const [tempFull, setTempFull] = useState([])
  const [toTalk, setToTalk] = useState([]);
  const [toggleS, setToggleS] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('');

  // group modal
  const [openGroup, setOpenGroup] = useState(false);
  const [groupName, setGroupName] = useState('');


  // setting localstorage
  useEffect(() => {
    // change valuse of user1
    axios.get(`http://localhost:5000/user/selfserve?username=${userName}`)
      .then((resp) => {
        setContacts(resp.data.user[0].contacts)
        let lsc = JSON.stringify(contacts)
        window.localStorage.setItem('localContacts', lsc)
      }).catch((e) => {
        // console.log("error :", e);
      })

  }, [toTalk])

  useEffect(() => {
    if (contacts === null) {
      for (let i = 0; i < contacts.length; i++) {
        axios.get(`http://localhost:5000/user/selfserve?username=${contacts[i]}`)
          .then((resp) => {
            setTempFull(resp.data.user);
          }).catch((e) => {
            // console.log("error :", e);
          })
      }
    } else {
      // console.log("contacts is null")
    }
  }, [selectedUser])




  // search user
  const findUser = (userName) => {
    axios.get(`http://localhost:5000/user/finduser?username=${searchKeyword}`).then((resp) => {
      // console.log('search result', resp.data.data);
      // console.log('search full result', resp.data);

      setSearchResult(resp.data.data);
    }).catch((e) => {
      // console.log('error in search users', e);
    });
  }

  // add user to contact
  const addToContact = (userName, selectedUser) => {
    axios.put('http://localhost:5000/user/newcontacts', {
      userName,
      contactName: selectedUser
    }).then((resp) => {
    }).catch((e) => {
      // console.log("error: ", e);
    })
  }

  // create new chat
  const createChat = (userName, contact) => {
    axios.post('http://localhost:5000/chat/newchat', {
      participants: [userName, contact.userName],
    }).then((resp) => {
      setSelectedChatId(resp.data.chatId);
      server.emit('joinRoom', { chatId: resp.data.chatId },
        (response) => {
          console.log("Joined room:", resp.data.chatId);
          console.log("Joined room:", response);
        }
      );
      // console.log("Response: ", resp.data)
      // console.log("selected chat id is: ", selectedChatId)
      console.log("Room Joined Successfully: ")

    }).catch((e) => {
      // console.log("error to create:", e);
    })
  }
  // create group chat
  const createGroupChat = (groupName, userName) => {
    if (!groupName) {
      // console.log("give valid group name");
    } else {
      axios.post('http://localhost:5000/chat/newchat', {
        chatId: groupName + "1234" + userName,
        groupName: groupName,
        participants: [userName],
        isGroupChat: true
      }).then((resp) => {
        // console.log("resp : ", resp)
        setGroupName('')
        setOpenGroup(false)
      }).catch((e) => {
        // console.log("error :", e);
      })
    }
  }
  // select to Talk
  const selectTOTalk = (userName, i) => {
    setChatArr([]);
    setToTalk(i);
    createChat(userName, i);
    setToggleContact(true);
    setSearching(false);
    setToggleS(false);
    addToContact(userName, i)
    // console.log("selected user to talk is :", i.userName);
  }



  useEffect(() => {
    if (searchKeyword === '') {
      setSearching(false);
      setSearchKeyword('')
    } else {
      setSearching(true);
      findUser(searchKeyword);
    }
    // console.log("serched contacts: ", searchResult)
  }, [searchKeyword.length])


  const [chatType, setChatType] = useState('private');
  const openNewChats = () => {
    switch (chatType) {
      case 'private':
        setToggleS(!toggleS);
        break;
      case 'groups':
        setToggleS(false);
        setOpenGroup(true);
      default:
        break;
    }
  }

  const [openAddToGropu , setOpenAddToGroup] = useState(false)


  const data = { id, setId, message, setMessage, chatArr, setChatArr, login, loggedin, server, isTyping, setisTyping, typerUser, setTyperUser, at, userName, setUserName, displayName, setDisplayName, profilePic, setProfilePic, mobileNum, setMobileNum, mail, setMail, openprofile, setOpenprofile, setLoggedin, about, setAbout, /* server side*/  findUser, addToContact, selectTOTalk, searchResult, setSearchResult, selectedUser, setSelectedUser, searching, setSearching, contacts, setContacts, toTalk, setToTalk, toggleS, setToggleS, fContacts, setFContacts, createGroupChat, openGroup, setOpenGroup, groupName, setGroupName, isalready, setIsalready, setSearchKeyword, selectedChatId, setSelectedChatId, createChat, toggleContact, setToggleContact, toggle2, openNewChats, chatType, setChatType, openAddToGropu , setOpenAddToGroup }

  return (
    <ChatContext.Provider value={data}>{children}</ChatContext.Provider>
  )

}

export default ChatProvider;