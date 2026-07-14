import { useState } from 'react';
import {Routes,Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import "./styles/dashboard.css";
import "./styles/Taskcard.css";
import "./styles/TaskModal.css";
import "./styles/header.css";
import "./styles/sidebar.css";
import "./styles/login.css";
import "./styles/register.css";
// import './App.css'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
  )
}

export default App
