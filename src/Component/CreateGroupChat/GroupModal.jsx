import React, { useContext } from 'react'
import Modal from 'react-modal'
import './group.css'
import { ChatContext } from '../../Context/ChatContext';

const GroupModal = () => {
  const { openGroup, setOpenGroup, groupName, setGroupName, createGroupChate } = useContext(ChatContext);
  return (
    <Modal
      isOpen={openGroup}
      onRequestClose={()=>setGroupName(false)}
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
        <div className="button-area">
          <input type="submit" value="Create Group"
            onClick={createGroupChate}
            className='groupBtn' />
        </div>
      </div>
    </Modal>
  )
}

export default GroupModal