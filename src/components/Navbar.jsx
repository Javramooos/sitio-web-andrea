import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useCart } from '../context/CartContext';
// import ShoppingCart from './ShoppingCart';
import './Navbar.css';

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  // const { cartItems, isCartOpen, openCart, closeCart } = useCart();

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  // const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav className="navbar bg-gray-100">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo-link">
            <img 
              src="/assets/logo-andrea.png" 
              alt="Clínica de Andrea Logo" 
              className="navbar-logo-img" 
            />
          </Link>
          <div className="flex items-center space-x-4">
            {/* <button onClick={openCart} className="relative text-gray-800">
              <i className="fas fa-shopping-cart"></i>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button> */}
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
      {/* <ShoppingCart isOpen={isCartOpen} onClose={closeCart} /> */}
    </>
  );
}