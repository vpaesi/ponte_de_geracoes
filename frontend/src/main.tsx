import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './utils/UserContext';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Users from './pages/Users';
import Profile from './pages/Profile';
import AtualizarPerfil from './pages/AtualizarPerfil';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/users/:userType" element={<Users />} />
          <Route path="/profile/:id?" element={<Profile />} />
          <Route path="/atualizar-perfil" element={<AtualizarPerfil />} />
        </Routes>
      </Router>
    </UserProvider>
  </React.StrictMode>
);