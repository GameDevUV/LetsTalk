import React,{useContext} from 'react'
import { ChatContext } from '../../Context/ChatContext';
import './Auth.css'

const Auth = () => {
  const {at } = useContext(ChatContext);

  return (
    <>
      <div className="login-page">
        <div className="left-video">
          <div className="left-video-full"></div>
        </div>
        <div className="right-logs">
          {/* <div className="top-logs">
            <div className="s-top-logs"></div>
          </div> */}
          <div className="login">
            <div className="sub-logs">
              <button className="login-btn" onClick={() => at()}>Enter to the App</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth