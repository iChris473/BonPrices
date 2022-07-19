import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { AuthContextProvider } from './context/AuthContext';
import { SuperContextProvider } from './context/SuperContext';

const mainUserProfile = window.location.href

const ContextWrapper = ({children}) => {

  return mainUserProfile.includes('admin') ? (
    <AuthContextProvider>
    {children}
  </AuthContextProvider> 
  ) : (
    <SuperContextProvider>
    {children}
  </SuperContextProvider>
  )

}


ReactDOM.render(
  <React.StrictMode>
    {/* <SuperContextProvider> */}
      <ContextWrapper>
        <RecoilRoot>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RecoilRoot>
      </ContextWrapper>
    {/* </SuperContextProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);


