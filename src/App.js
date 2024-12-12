import React, { useContext} from 'react'
import axios from 'axios';
import './App.css';
import Chat from './Component/Chat/Chat';
import Login from './Component/Login/Login';
import Auth from './Component/Auth/Auth';
import { ChatContext } from './Context/ChatContext';
import Profile from './Component/Profile/Profile';
import { useAuth0 } from '@auth0/auth0-react';

const App = () => {
  const {loggedin } = useContext(ChatContext);
  const {isAuthenticated} = useAuth0();
  
   
  return (
    <>
    {
      isAuthenticated ? (loggedin ) ? <Chat /> :<Login /> :<Auth />
      // <Login />
      // <Auth />
      // <Chat />
    }
      
    </>
  )
}

export default App