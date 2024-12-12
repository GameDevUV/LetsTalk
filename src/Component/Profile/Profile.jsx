import React, { useContext } from 'react'
import { ChatContext } from '../../Context/ChatContext'
import { useAuth0 } from "@auth0/auth0-react";
import Modal from 'react-modal'

import './Profile.css'
import { FaLock } from 'react-icons/fa';

const Profile = () => {
    const { logout } = useAuth0();

    const { userName, displayName, mail, profilePic, mobileNum, openprofile, setOpenprofile, loggedin, setLoggedin } = useContext(ChatContext);

    const closeModal = () => {
        setOpenprofile(false)
    }
    const lout = () => {
        setLoggedin(false);
        logout();
    }

    return (
        <Modal
            isOpen={openprofile}
            onRequestClose={closeModal}
        >
            <div className="profile-modal">
                <div className="profile-area">
                    <div className="pic-name-main">
                        <div className="profile-pic-left">
                            <span className="pic-" style={{ backgroundImage: `url(${profilePic})` }}></span>
                        </div>
                        <div className="details">
                            <div className="details-tab">
                                <label htmlFor="" className='leb'> your username</label>
                                <input type="text" value={userName} readOnly={true} className="user-profile" />
                                <label htmlFor="" className='leb'> your display name</label>
                                <input type="text" value={"Display Name"} readOnly={true} className="user-profile" />
                            </div>
                        </div>
                    </div>
                    <div className="details-tb">
                        <div className="abt">
                            <label htmlFor="" className='leb'> E-mail </label>
                            <input type="text" value={"vsgamer9595@gmail.com"} readOnly={true} className="user-profile detail-name" />
                        </div>
                        <div className="abt">
                            <label htmlFor="" className='leb'> Mobile Number</label>
                            <input type="text" value={"9376952125"} readOnly={true} className="user-profile detail-name" />
                        </div>
                    </div>
                    <div className="details-tb">
                        <p className="secourityItem">
                            do yo wanted to add a secourity Pass Key ?
                            <span className="idea"><i>i</i></span>
                        </p>
                        <div className="secourity-button-tab">
                            <button className='secoure'><FaLock /> Secoure</button>
                            <button className='TAC secoure'>Terms</button>
                        </div>
                    </div>
                    <div className="logout-exit">
                        <div className="lgout">
                            <button className="logout-button" onClick={lout}>Log out</button>
                            <button className="logout-button">Edit</button>
                            <button className="logout-button" onClick={closeModal}>Exit</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default Profile