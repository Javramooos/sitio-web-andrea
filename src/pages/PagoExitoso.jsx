
import React from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';

const PagoExitoso = () => {
  useSEO({
    title: 'Compra Exitosa - Dra. Andrea Diaz',
    description: 'Confirmación de tu compra de tratamientos.',
  });

  return (
    <div className="text-center py-20 px-4 fade-in">
      <div className="max-w-md mx-auto">
        <div className="text-green-500 mb-4">
          <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">¡Gracias por tu compra!</h1>
        <p className="mt-3 text-gray-600">
          Hemos recibido tu pedido correctamente. En breve, nuestro equipo se pondrá en contacto contigo por WhatsApp o correo electrónico para coordinar los detalles de tu tratamiento.
        </p>
        <div className="mt-8">
          <Link to="/" className="text-white bg-principal hover:bg-principal-dark font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
            Volver al Inicio
          </Link>
          <Link to="/servicios" className="text-principal border border-principal hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5">
            Ver más servicios
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PagoExitoso;
