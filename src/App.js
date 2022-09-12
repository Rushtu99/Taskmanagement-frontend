import './App.css';
import React, { Component }  from 'react';
import { Login } from './components/Login';
import { Register } from './components/Register';
import {Home} from './components/Home';
import {Loading} from './components/Loading' 
import {Dashboard} from './components/Dashboard';
import {ResetPassword} from './components/ResetPassword';
import {EmailVerification} from './components/EmailVerification'
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route  exact path="/" element={<Home />}/>
      <Route   path="/loading" element={<Loading/>}/>
      <Route   path="/login" element={<Login/>}/>
      <Route   path="/register" element={<Register/>}/>
      <Route   path="/dashboard" element={<Dashboard/>}/>
      <Route  path="/email/verify" element={<EmailVerification />}/>
      <Route  path="/password/reset" element={<ResetPassword />}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
