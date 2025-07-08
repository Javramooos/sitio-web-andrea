import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <nav className="navbar bg-gray-100">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo-link">
          <img 
            src="/assets/logo-andrea.png" 
            alt="Clínica de Andrea Logo" 
            className="navbar-logo-img" 
          />
        </Link>
        <div className="flex items-center">
          <button className="menu-toggle text-gray-800" onClick={toggleMenu}>☰</button>
        </div>
      </div>
      <ul className={`navbar-links ${menuAbierto ? 'activo' : ''} bg-gray-100`}>
        <li><Link className="text-gray-800" to="/" onClick={toggleMenu}>Inicio</Link></li>
        <li><Link className="text-gray-800" to="/servicios" onClick={toggleMenu}>Servicios</Link></li>
        <li><Link className="text-gray-800" to="/agenda" onClick={toggleMenu}>Agendar</Link></li>
        <li><Link className="text-gray-800" to="/blog" onClick={toggleMenu}>Blog</Link></li>
      </ul>
    </nav>
  );
}