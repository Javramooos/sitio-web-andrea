
import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import useSEO from '../hooks/useSEO';

const Checkout = () => {
  useSEO({
    title: 'Finalizar Compra - Dra. Andrea Diaz',
    description: 'Completa tu compra de tratamientos de medicina estética.',
  });

  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePayment = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de integración con la pasarela de pago (Wompi, Mercado Pago, etc.)
    // Como es una simulación, limpiamos el carrito y redirigimos.
    console.log("Procesando pago...");
    clearCart();
    navigate('/pago-exitoso');
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Tu carrito está vacío</h1>
        <p className="mt-4">No tienes productos para comprar.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 fade-in">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Finalizar Compra</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Columna de Resumen de Orden */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Resumen de tu Orden</h2>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toLocaleString('es-CO')}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 mt-6 pt-6">
            <div className="flex justify-between font-bold text-lg">
              <p>Total</p>
              <p>${totalPrice.toLocaleString('es-CO')}</p>
            </div>
          </div>
        </div>

        {/* Columna de Formulario y Pago */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Tus Datos</h2>
          <form onSubmit={handlePayment}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                <input type="text" id="name" name="name" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                <input type="email" id="email" name="email" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono (WhatsApp)</label>
                <input type="tel" id="phone" name="phone" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold">Método de Pago</h3>
              <p className="text-sm text-gray-600 mt-1">Serás redirigido a una pasarela de pago segura.</p>
              <button type="submit" className="w-full mt-4 bg-indigo-600 text-white py-3 px-4 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium">
                Pagar con Wompi / Mercado Pago
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
