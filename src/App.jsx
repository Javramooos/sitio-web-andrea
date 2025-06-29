import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Agenda from './pages/Agenda';
import Pago from './pages/Pago';
import Servicios from './pages/Servicios';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import TerminosCondiciones from './pages/TerminosCondiciones';

// 1. QUITA la importación del botón antiguo
// import WhatsappButton from './components/WhatsappButton';

// 2. AÑADE la importación del nuevo componente de botones
import UtilityButtons from './components/UtilityButtons';


function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/pago" element={<Pago />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
        </Routes>
      </main>
      <Footer />
      
      {/* 3. REEMPLAZA el componente del botón */}
      <UtilityButtons />
    </div>
  );
}

export default App;