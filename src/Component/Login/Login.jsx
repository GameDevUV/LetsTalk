import React, { useContext, useEffect } from 'react'
import { ChatContext } from '../../Context/ChatContext'
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const { login, userName, mail,setMail, setUserName, displayName, setDisplayName, profilePic, setProfilePic, mobileNum, setMobileNum, about, setAbout, isalready , setIsalready, setAuthanticated2 } = useContext(ChatContext);

  const {isAuthenticated} = useAuth0();

  useEffect(()=>{
    
    axios.get(`http://localhost:5000/user/check?mail=${mail}`)
    .then((resp)=>{
      console.log("user details is ", resp.data);
      setIsalready(resp.data.find)

      if(isalready === false){
        setAuthanticated2(isAuthenticated);
      }else{
        axios.get(`http://localhost:5000/user/selfserve?username=${userName}`)
        .then((resp)=>{
          setUserName(resp.data.user.userName);
          setDisplayName(resp.data.user.displayName);
          setMail(resp.data.user.setMail);
        }).catch((e)=>{
          console.log("error to create: ", e);
        })
      }
    })
    .catch((e)=>{
      console.log("ceating user...")
    })
  },[])

  return (
    <>
      <div className="login-page">
        <div className="left-video">
          <div className="left-video-full">
          </div>
        </div>
        <div className="login right-logs">
          <form className="box" onSubmit={login}>
            <div className="profile-photo-input">
              <div className="profile-photo-span" style={{ backgroundImage: `url(${profilePic})` }}>
                <input type="image" className="loginp-input" id="name"
                  placeholder='enter your name...'
                />
              </div>
            </div>
            <div className="input-area">
              <label className='login-lable' htmlFor="userName">Enter your user name</label>
              <input type="text" className='login-input'
                placeholder='enter your user name ...'
                value={userName}
                name='userName'
              />
              <label className='login-lable' htmlFor="name">Enter your name</label>
              <input type="text" className="login-input" id="name"
                value={displayName}
                placeholder='enter your name...'
              />
              <label className='login-lable' htmlFor="contact">Enter your Mobile Number</label>
              <input type="text" className="login-input" id="contact"
                value={mobileNum}
                placeholder='enter your Mobile Number...'
              />
              <label className='login-lable' htmlFor="aboutMyself">Enter your About</label>
              <input type="text" className='login-input' name='aboutMyself'
                placeholder='enter about your self'
                value={about}
              />
              <button className='loging' type='submit'>submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login