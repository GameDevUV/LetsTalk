import React, { useContext, useEffect, useState } from 'react'
import './AddUserModal.css'
import { ChatContext } from '../../Context/ChatContext';
import axios from 'axios';

const AddUserModal = () => {
    let { userName , selectedChatId, openAddToGropu , setOpenAddToGroup } = useContext(ChatContext)
    let [aContacts, setAContacts] = useState([])
    let [usersList, setUsersList] = useState('');

    useEffect(() => {
        axios.get(`${process.env.API}user/selectedcontact?userName=${userName}`)
            .then((resp) => {
                let letContact = resp.data.fullContacts;
                setAContacts(letContact)
            }).catch((e) => {
                console.log("error in fetch")
            })
    }, [])

    let add = ()=>{
        axios.put(`${process.env.API}chat/addtochat` , {
            chatId : selectedChatId,
            userName : setUsersList
        }).then((resp)=>{
            console.log(resp);
        }).catch((e)=>{
            console.log("error in add")
        })
    }

    let AddOrRemove = (user) => {
        usersList.map((i) =>{ 
            if (i === user.userName) {
                return
            } else {
                setUsersList(user.userName)
                add();
            }
        })
    }

    return (
        <div className="add-modal" style={{display : openAddToGropu ? 'flex' : 'none'}}>
            <div className="user-list">
                {/* <div className="search">
                <input type="text" className="search-for-add"
                placeholder='Search in your Contacts...' />
            </div> */}
                <div className="contacts-area-for-add">
                    <ul className="add-ul-contact">
                        {
                            aContacts.map((i, index) => {
                                return (
                                    <li className="add-li-contacts">
                                        <span>{i.userName}</span>
                                        {/* <span className='select-indcator'></span> */}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="button">
                    {/* <button className='add-to'>
                    Add
                </button> */}
                </div>
            </div>
        </div>
    )
}

export default AddUserModal