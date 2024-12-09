import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import ChatProvider from './Context/ChatProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-s0mz3pzksnphm1uv.us.auth0.com"
    clientId="kWNnulTMEhoyX1xl4Q2Wr16q9Fsmf7dc"
    authorizationParams={{
      redirect_uri: 'http://localhost:3000'
    }} >
    <ChatProvider >
      <React.StrictMode >
        <App />
      </React.StrictMode>
    </ChatProvider>
  </Auth0Provider>
);
