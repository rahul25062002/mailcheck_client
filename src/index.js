import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import List from './Pages/List.js'

import { Provider } from 'react-redux';
import  store  from './store';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Pages/login.js';

import RegistrationPage from './Pages/Registation.js';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store} >
     
      
      <BrowserRouter>
      <Routes>
        <Route path="/home" element={<App />}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/SignUp" element={<RegistrationPage/>}/>
        <Route path="/list" element={<List/>}/>
      </Routes>
      </BrowserRouter>
    
    </Provider>

  </React.StrictMode>
);


