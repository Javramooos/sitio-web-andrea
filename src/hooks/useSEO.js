import { useEffect } from 'react';

export default function useSEO({ title, description, canonical }) {
  useEffect(() => {
    const defaultTitle = 'Dra. Andrea Diaz - Medicina Estética Avanzada en Bogotá';
    const defaultDescription = 'Realza tu belleza con tratamientos de medicina estética de vanguardia. La Dra. Andrea Diaz es experta en rejuvenecimiento facial, contorno corporal y más. ¡Agenda tu cita!';

    document.title = title ? `${title} | Dra. Andrea Diaz` : defaultTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || defaultDescription);
    }

    let link = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }
  }, [title, description, canonical]);
}
