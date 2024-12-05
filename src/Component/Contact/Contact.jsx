import React, { useContext, useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { ChatContext } from '../../Context/ChatContext';
import axios from 'axios';
import GroupModal from '../CreateGroupChat/GroupModal';



const Contact = () => {
  const { userName, setUserName, displayName, profilePic, mobileNum, setOpenprofile } = useContext(ChatContext);
  const { findUser, searchResult, setSearchResult, selectedUser, setSelectedUse, searching, setSearching, contacts, toTalk, setToTalk, fullContacts, selectTOTalk, addToContact, toggleS, setToggleS, fContacts, setFContacts , searchKeyword, setSearchKeyword } = useContext(ChatContext);
  const { openGroup, setOpenGroup, groupName, setGroupName } = useContext(ChatContext);
  const [groups, setGroups] = useState([]);

 
  let fetchedContacts = [];

  useEffect(() => {
    const localfContacts = JSON.parse(window.localStorage.getItem('fContacts') || "[]");
    if (localfContacts.length === 0) {
      axios.get(`http://localhost:5000/user/selectedcontact?userName=${userName}`)
        .then((resp) => {
          fetchedContacts = resp.data.fullContacts;
          // console.log(typeof(fetchedContacts))
          for (let index = 0; index < fetchedContacts.length; index++) {
            // console.log("element at " , index , "is " , fetchedContacts[index] )
            if (fetchedContacts.isGroupChat) {
              setGroups(prev => [...prev, fetchedContacts[index]])
            } else {
              setFContacts(prev => [...prev, fetchedContacts[index]])
            }
          }
          window.localStorage.setItem('fContacts', JSON.stringify(fetchedContacts));
          // console.log(fetchedContacts);
        })
        .catch((e) => console.error("Error fetching contacts:", e));
    } else {
      console.log("Loaded contacts from localStorage:", localfContacts);
      setFContacts(localfContacts);
    }
  }, [])


  useEffect(() => {
    console.log("full contact is: ", fContacts)

    axios.get(`http://localhost:5000/user/getcontacts?userName=${userName}`)
      .then((resp) => {
        console.log("fetching contacts")
        setFContacts(resp.data.fullContacts)
        console.log(resp);
      }).catch((e) => {
        console.log("userNaem: ", userName)
        console.log("error in full contacts fatch: ", e)
      })
  })

  return (
    <>
      <GroupModal />
      <div className="contacts-search">
        <div className="right-contact">
          <div className="profile">
            <div className="profile-" onClick={() => setOpenprofile(true)}>
              <div className="profile-image" style={{ backgroundImage: `url(${profilePic})` }}></div>
              <p className="profile-name">{userName || "not"}</p>
            </div>
            <div className="search-toggle"><FaSearch onClick={() => setToggleS(!toggleS)} /></div>
          </div>
          <div className="search-box" style={{ display: toggleS ? 'flex' : 'none' }}>
            <input type="text" className="search"
              placeholder='search user here'
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            /> <button ><FaSearch /></button>
          </div>
          <ul className="setting-ul">
            <li className="setting-li">All</li>
            <li className="setting-li">Groups</li>
            <li className="setting-li">Secure</li>
          </ul>
          <div className="friends-box">
            {
              searching  ? searchResult.map((i, index) =>
                <div className="main-friend-scroll" key={index}
                  onClick={() => selectTOTalk(userName, i.userName)}>
                  <div className="friend-box-1" >
                    <div className="friendB">
                      <div className="profile-pic-over">
                        <span className="image"></span>
                      </div>
                      <div className="message-name">
                        <p className="friendName">{i.userName}</p>
                        <p className="overView-msg">hii hellow hii</p>
                      </div>
                      <div className="time-and-seen">
                        <span className="time">5:9am</span>
                        <span className="seen">__</span>
                      </div>
                    </div>
                  </div>
                </div>)
                :
                fContacts && fContacts.map((i, index) =>
                  <div className="main-friend-scroll" key={index} onClick={() => selectTOTalk('user1', i)}>
                    <div className="friend-box-1">
                      <div className="friendB">
                        <div className="profile-pic-over">
                          <span className="image"></span>
                        </div>
                        <div className="message-name">
                          <p className="friendName">{i.userName}</p>
                          <p className="overView-msg">hii hellow hii</p>
                        </div>
                        <div className="time-and-seen">
                          <span className="time">5:9am</span>
                          <span className="seen">__</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact