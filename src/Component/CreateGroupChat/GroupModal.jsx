import React, { useContext, useState } from 'react'
import Modal from 'react-modal'
import './group.css'
import { ChatContext } from '../../Context/ChatContext';
import axios from 'axios';

const GroupModal = () => {
  const { openGroup, setOpenGroup, groupName, setGroupName, createGroupChate, userName } = useContext(ChatContext);
  let [participants , setParticipants] = useState([]);

  let createNewGroup = () => {
    axios.post('http://localhost:5000/chat/newchat', {
      participants: [userName],
      isGroupChat: true,
      groupName: groupName
    }).then((resp) =>{
      console.log("hellow got it");
      setGroupName('')
      setOpenGroup(false)
    }).catch((e)=>{
      console.log("error in log");
    })
  }

  return (
    <Modal
      isOpen={openGroup}
      onRequestClose={() => setOpenGroup(false)}
    >
      <div className="groupModal">
        <div className="avatar"></div>
        <div className="name">
          <label htmlFor="groupName">Enter your Group Name</label>
          <input type="text" name='groupName' className="groupInput"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder='my group name' />
        </div>
        {/* <div className="name2">
          <label htmlFor="groupName2">Want to Make it secoure</label>
          <input type="checkbox" name='CB' className="groupInput"
            placeholder='my group name' />
        </div>
        <div className="button-area">
          <input type="submit" value="Create Group"
            onClick={createGroupChate}
            className='groupBtn' />
        </div> */}
        <div className="button-area">
          <input type="submit" value="Add USers"
            onClick={createNewGroup}
            className='groupBtn' />
        </div>
      </div>
    </Modal>
  )
}

export default GroupModal