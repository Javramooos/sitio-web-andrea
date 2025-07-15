import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Agenda from './pages/Agenda';
import Blog from './pages/Blog';
import Servicios from './pages/Servicios';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import TerminosCondiciones from './pages/TerminosCondiciones';
import ArticuloDetalle from './pages/ArticuloDetalle';
import UtilityButtons from './components/UtilityButtons';

function App() {
  return (
    <div className="app-container bg-white">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<ArticuloDetalle />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
        </Routes>
      </main>
      <Footer />
      <UtilityButtons />
    </div>
  );
}

export default App;