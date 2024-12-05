import { useEffect, useState } from "react";
import { io } from 'socket.io-client'
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
  const [userName, setUserName] = useState('null');
  const [profilePic, setProfilePic] = useState('')
  const [mobileNum, setMobileNum] = useState('91')
  const [mail, setMail] = useState('')
  const [about, setAbout] = useState('Busy for now');
  const [loggedin, setLoggedin] = useState(false);
  const [isalready, setIsalready] = useState(false);
  const [authanticated2, setAuthanticated2] = useState(false);

  // requests
  const requests = [
    "/user/adduser",
    "/user/deleteData",
    "/user/updateData",
    "/user/finduser",
    "/chat/newchat",
    "/chat/sendmessage",
    "/chat/getmessage",
    "/chat/addtochat",
    "/chat/removefromchat",
    "/chat/deletemessage"
  ]
  // send data to api

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
        console.log("created resp: ", resp);
        setLoggedin(true);
        console.log("done added user");
      })
    } else {
      console.log("logged in")
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




  // saving states at local storage
  useEffect(() => {
    window.localStorage.setItem('Logged', loggedin);
  }, [loggedin])

  useEffect(() => {
    if (isAuthenticated) {
      setUserName(user.nickname);
      setDisplayName(user.name);
      setProfilePic(user.picture);
      setMail(user.email);
      if (user.phone_number) {
        setMobileNum(user.phone_number);
      } else { }
      window.localStorage.setItem('userName', userName);
      window.localStorage.setItem('displayName', displayName);
      window.localStorage.setItem('dp', profilePic);
      window.localStorage.setItem('num', mobileNum);
      window.localStorage.setItem('mail', mail);
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
        console.log("error :", e);
      })

  }, [toTalk])

  useEffect(() => {
    if (contacts === null) {
      for (let i = 0; i < contacts.length; i++) {
        axios.get(`http://localhost:5000/user/selfserve?username=${contacts[i]}`)
          .then((resp) => {
            setTempFull(resp.data.user);
          }).catch((e) => {
            console.log("error :", e);
          })
      }
    }else{
      console.log("contacts is null")
    }
  }, [selectedUser])

  // online
  const setOnline = (userName, status) => {
    axios.put('http://localhost:5000/user/status', {
      userName,
      status
    }).then((resp) => {
      // console.log("send : ", resp);
    }).catch((e) => {
      console.log("error in send", e.response ? e.response.data : e.message);
    })
  }
  // search user
  const findUser = (userName) => {
    axios.get(`http://localhost:5000/user/finduser?username=${searchKeyword}`).then((resp) => {
      console.log('search result', resp.data.data);
      console.log('search full result', resp.data);

      setSearchResult(resp.data.data);
    }).catch((e) => {
      console.log('error in search users', e);
    });
  }

  // create new chat
  const createChat = (userName, contact) => {
    axios.post('http://localhost:5000/chat/newchat', {
      chatId: userName + "1234" + contact,
      participants: [userName, contact],
    }).then((resp) => {
      // console.log("resp : ", resp)
    }).catch((e) => {
      console.log("error to create:", e);
    })
  }
  // create group chat
  const createGroupChat = (groupName, userName) => {
    if (!groupName) {
      console.log("give valid group name");
    } else {
      axios.post('http://localhost:5000/chat/newchat', {
        chatId: groupName + "1234" + userName,
        groupName: groupName,
        participants: [userName],
        isGroupChat: true
      }).then((resp) => {
        console.log("resp : ", resp)
        setGroupName('')
        setOpenGroup(false)
      }).catch((e) => {
        console.log("error :", e);
      })
    }
  }
  // select to Talk
  const selectTOTalk = (userName, i) => {
    setToTalk(i);
    addToContact(userName, i)
    createChat(userName, i);
    setSearching(false);
    setToggleS(false);
    console.log("selected user to talk is :", i.userName);
  }
  // add user to contact
  const addToContact = (userName, selectedUser) => {
    axios.put('http://localhost:5000/user/newcontacts', {
      userName,
      contactName: selectedUser
    }).then((resp) => {
      console.log("user selected : ", resp.data.addedUser);
    }).catch((e) => {
      console.log("error: ", e);
    })
  }

  // First useEffect: Load from localStorage or fetch data
  useEffect(() => {
    // Retrieve fContacts from localStorage, fallback to an empty array if undefined
    const localfContacts = JSON.parse(window.localStorage.getItem('fContacts') || "[]");

    if (localfContacts.length === 0) {
      console.log("No contacts in localStorage, fetching from server...");
      axios.get(`http://localhost:5000/user/selectedcontact?userName=${userName}`)
        .then((resp) => {
          let fetchedContacts = resp.data.fContacts;
          for (let index = 0; index < fetchedContacts.length; index++) {
            console.log("element at ", index, "is ", fetchedContacts[index])
            setFContacts(prev => [...prev, fetchedContacts[index]])
          }
          window.localStorage.setItem('fContacts', JSON.stringify(fetchedContacts));
        })
        .catch((e) => console.error("Error fetching contacts:", e));
    } else {
      console.log("Loaded contacts from localStorage:", localfContacts);
      setFContacts(localfContacts);
    }
  }, []);


  // Second useEffect: Update localStorage when fContacts changes
  useEffect(() => {
    // if (fContacts !== null) {
      
    //   if (fContacts.length > 0) {
    //     console.log("Updating localStorage with new fContacts");
    //     window.localStorage.setItem('fContacts', JSON.stringify(fContacts));
    //   }
    // }.

    console.log("f contacts is : ", fContacts);
  }, [fContacts]);



  // Another useEffect for searching

  useEffect(() => {
    if (searching) {
      axios.get(`http://localhost:5000/user/selectedcontact?userName=${userName}`)
        .then((resp) => {
          setFContacts(resp.data.fContacts);
        })
        .catch((e) => console.error("Error searching contacts:", e));
    }
  }, [searching]);



   // change on searching user
   useEffect(() => {
    if (searchKeyword === '' ) {
      setSearching(false);
      setSearchKeyword('')
    } else {
      setSearching(true);
      findUser(searchKeyword);
    }
    console.log("serched contacts: ", searchResult)
  }, [searchKeyword.length])


  // debigging
  useEffect(() => {
    console.log("Current fContacts:", fContacts);
  }, [fContacts]);

  const data = { id, setId, message, setMessage, chatArr, setChatArr, login, loggedin, server, isTyping, setisTyping, typerUser, setTyperUser, at, userName, setUserName, displayName, setDisplayName, profilePic, setProfilePic, mobileNum, setMobileNum, mail, setMail, openprofile, setOpenprofile, setLoggedin, about, setAbout, requests, /* server side*/ setOnline, findUser, addToContact, selectTOTalk, searchResult, setSearchResult, selectedUser, setSelectedUser, searching, setSearching, contacts, setContacts, toTalk, setToTalk, toggleS, setToggleS, fContacts, setFContacts, createGroupChat, openGroup, setOpenGroup, groupName, setGroupName, isalready, setIsalready , setSearchKeyword }

  return (
    <ChatContext.Provider value={data}>{children}</ChatContext.Provider>
  )

}

export default ChatProvider;