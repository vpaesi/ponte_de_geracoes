import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home-page/HomePage.tsx'
import Header from './components/header/Header.tsx'
import Footer from './components/footer/Footer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route index element={<HomePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)
