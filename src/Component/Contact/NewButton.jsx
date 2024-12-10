import React, { useContext } from 'react'
import './Contact.css'
import { FaPlus } from 'react-icons/fa'
import ChatProvider from '../../Context/ChatProvider'
import { ChatContext } from '../../Context/ChatContext'


const NewButton = () => {
    const {openNewChats} = useContext(ChatContext)

    return (
        <div className='button-new-contact'>
            <button className='button-plus' onClick={openNewChats}><FaPlus /></button>
        </div>
    )
}

export default NewButton