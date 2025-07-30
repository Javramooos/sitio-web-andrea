import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Usamos un pequeño retraso para dar tiempo a que el elemento se renderice
      const timer = setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          // Usamos 'start' para alinear el elemento en la parte superior
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // Si no se encuentra el elemento, nos desplazamos a la parte superior de la página
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer); // Limpiamos el temporizador
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
