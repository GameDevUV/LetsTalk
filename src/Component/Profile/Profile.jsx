import React, { useContext } from 'react'
import { ChatContext } from '../../Context/ChatContext'
import { useAuth0 } from "@auth0/auth0-react";
import Modal from 'react-modal'

import './Profile.css'

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
                                <p className="detail-name" id='name'>{userName}</p>
                                <p className="detail-name-e">{displayName}</p>
                            </div>
                        </div>
                    </div>
                    <div className="details-tb">
                        <div className="abt">
                            <span className="tag">Mail</span>
                            <p className="detail-name">{mail}</p>
                        </div>
                        <div className="abt">
                            <span className="tag">Number</span>
                            <p className="detail-name">{
                                (mobileNum !== null) ? mobileNum : 91
                            }</p>
                        </div>
                        <div className="abt">
                            <span className="tag">Email</span>
                            <p className="detail-name">{mail}</p>
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