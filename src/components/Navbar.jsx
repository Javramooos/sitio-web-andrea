import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo-link">
          {/* --- LA RUTA CORRECTA Y DEFINITIVA BASADA EN TU CAPTURA --- */}
          <img 
            src="/assets/logo-andrea.png" 
            alt="Clínica de Andrea Logo" 
            className="navbar-logo-img" 
          />
        </Link>
        <button className="menu-toggle" onClick={toggleMenu}>☰</button>
      </div>
      <ul className={`navbar-links ${menuAbierto ? 'activo' : ''}`}>
        <li><Link to="/" onClick={toggleMenu}>Inicio</Link></li>
        <li><Link to="/servicios" onClick={toggleMenu}>Servicios</Link></li>
        <li><Link to="/agenda" onClick={toggleMenu}>Agendar</Link></li>
        <li><Link to="/pago" onClick={toggleMenu}>Blog</Link></li>
      </ul>
    </nav>
  );
}