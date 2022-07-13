import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RecoilRoot>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecoilRoot>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);


