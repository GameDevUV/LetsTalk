import React, { useContext, useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { ChatContext } from '../../Context/ChatContext';
import axios from 'axios';
import GroupModal from '../CreateGroupChat/GroupModal';
import NewButton from './NewButton';



const Contact = () => {
  const { userName, setUserName, displayName, profilePic, mobileNum, setOpenprofile } = useContext(ChatContext);
  const { findUser, searchResult, setSearchResult, selectedUser, setSelectedUse, searching, setSearching, contacts, toTalk, setToTalk, fullContacts, selectTOTalk, addToContact, toggleS, setToggleS, fContacts, setFContacts, searchKeyword, setSearchKeyword } = useContext(ChatContext);
  const { openGroup, setOpenGroup, groupName, setGroupName, toggleContact, setToggleContact, toggle2, chatType, setChatType } = useContext(ChatContext);

  useEffect(() => {
    switch (chatType) {
      case 'private':
        axios.get(`http://localhost:5000/user/selectedcontact?userName=${userName}`).then((resp) => {
          let letContact = resp.data.fullContacts;
          setFContacts(letContact);
        }).catch((e) => {
          // console.log("error during fecthing get Contacts", e);
        })
        break;
      case 'groups':
        // fetch groups
        setFContacts([]);
        break;

      default:
        break;
    }
  }, [chatType])


  const toggleChatType = (type) => {
    setChatType(type);
  }

  return (
    <>
      <GroupModal />
      <NewButton />
      <div className="contacts-search" >
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
            /> <button className='classic-seacrch' ><FaSearch /></button>
          </div>
          <ul className="setting-ul">
            <li className="setting-li" onClick={() => toggleChatType('private')}>Private</li>
            <li className="setting-li" onClick={() => toggleChatType('groups')}>Groups</li>
            <li className="setting-li" onClick={() => toggleChatType('secoured')}>Secure</li>
          </ul>
          <div className="friends-box">
            {
              searching ? searchResult.map((i, index) =>
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
                  < div className="main-friend-scroll" key={index} onClick={() => selectTOTalk(userName, i)}>
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
      </div >
    </>
  )
}

export default Contact