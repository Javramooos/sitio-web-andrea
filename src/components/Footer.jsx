import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faWhatsapp, faTiktok } from '@fortawesome/free-brands-svg-icons';
// --- CAMBIOS AQUÍ ---
// 1. Importamos los íconos que necesitamos: teléfono y un ícono genérico para los links.
import { faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      {/* Elemento 1: Logo (sin cambios) */}
      <a href="/" aria-label="Volver al inicio" className="footer-logo-link">
        <img src="/assets/logo-andrea.png" alt="Logo de Clínica de Andrea" className="footer-logo-img" />
      </a>

      {/* --- CAMBIOS AQUÍ --- */}
      {/* 2. Añadimos más información útil en la sección central. 
         Gracias al 'gap' en tu CSS, se espaciarán automáticamente. */}
      <div className="footer-info">
         <a href="https://www.google.com/maps/place/Dra+Andrea+Diaz-Medicina+est%C3%A9tica+avanzada/@4.6737411,-74.0616865,15z/data=!4m10!1m2!2m1!1sDra+Andrea+Diaz-Medicina+est%C3%A9tica+avanzada!3m6!1s0x8e3f9b721fc3c1af:0x184c24e10ec5e0a!8m2!3d4.68035!4d-74.044786!15sCitEcmEgQW5kcmVhIERpYXotTWVkaWNpbmEgZXN0w6l0aWNhIGF2YW56YWRhWi0iK2RyYSBhbmRyZWEgZGlheiBtZWRpY2luYSBlc3TDqXRpY2EgYXZhbnphZGGSARlmYW1pbHlfcHJhY3RpY2VfcGh5c2ljaWFumgFEQ2k5RFFVbFJRVU52WkVOb2RIbGpSamx2VDJwS01sTldPVFpqU0ZaeFZUQlZNbUpFVGxCVWJYQkxUbFV4VjJKWFl4QUKqAVUQATIgEAEiHO_CRsvNC6TjwJXicMNqaKGEkfaGR3dzNCtfI2gyLxACIitkcmEgYW5kcmVhIGRpYXogbWVkaWNpbmEgZXN0w6l0aWNhIGF2YW56YWRh4AEA-gEECF8QEg!16s%2Fg%2F11ydk9s7r8?entry=ttu&g_ep=EgoyMDI1MDYyMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          Ubicación
        </a>
        <a href="mailto:dra.andrea.diazm@gmail.com">
          <FontAwesomeIcon icon={faEnvelope} />
          dra.andrea.diazm@gmail.com
        </a>
        {/* ENLACE DE TELÉFONO AÑADIDO */}
        <a href="tel:+573001234567">
          <FontAwesomeIcon icon={faPhone} />
          (+57) 300 123 4567
        </a>
      </div>
      
      {/* Elemento 3: Redes Sociales (sin cambios, recuerda actualizar los links) */}
      <div className="footer-social">
        <a href="https://www.instagram.com/tu_cuenta" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://www.facebook.com/tu_cuenta" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <FontAwesomeIcon icon={faWhatsapp} />
        </a>
        <a href="https://www.tiktok.com/@tu_cuenta" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
          <FontAwesomeIcon icon={faTiktok} />
        </a>
      </div>

      {/* --- CAMBIOS AQUÍ --- */}
      {/* 3. Añadimos los enlaces legales debajo del copyright para mantenerlo limpio. */}
      <div className="footer-copy">
        <p>© 2025 Andrea. Todos los derechos reservados.</p>
        <div className="footer-legal-links">
          <a href="/politica-privacidad">Política de Privacidad</a>
          <span>|</span>
          <a href="/terminos-condiciones">Términos y Condiciones</a>
        </div>
      </div>
    </footer>
  );
}

// Opcional: Para mejorar el espaciado de los links legales, 
// puedes añadir este pequeño bloque de CSS al final de tu archivo Footer.css

/*
.footer-legal-links {
  margin-top: 0.5rem;
}

.footer-legal-links a {
  color: var(--texto-secundario);
  text-decoration: none;
  margin: 0 0.5rem;
}

.footer-legal-links a:hover {
  text-decoration: underline;
}
*/