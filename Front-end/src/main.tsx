import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/header/Header.tsx'
import Footer from './components/footer/Footer.tsx'
import HomePage from './pages/home-page/HomePage.tsx'
import RegisterPage from './pages/register-page/RegisterPage.tsx'
import EditRegistrationPage from './pages/edit-registration/EditRegistrationPage.tsx'
import LoginPage from './pages/login-page/LoginPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/edit-registration' element={<EditRegistrationPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)
