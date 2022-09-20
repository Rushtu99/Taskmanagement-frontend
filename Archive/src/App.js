import './App.css';
import React, { Component }  from 'react';
import { Login } from './components/Login';
import { Register } from './components/Register';
import {Home} from './components/Home';
import {Dashboard} from './components/Dashboard'
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route  exact path="/" element={<Home />}/>
      <Route   path="/login" element={<Login/>}/>
      <Route   path="/register" element={<Register/>}/>

      <Route   path="/dashboard" element={<Dashboard/>}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
