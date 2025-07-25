// src/pages/TerminosCondiciones.jsx

import React from 'react';
import './LegalPages.css'; // Usará el mismo archivo de estilos

export default function TerminosCondiciones() {
  return (
    <div className="legal-container bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="dark:text-white">Términos y Condiciones de Uso</h1>
      <p className="dark:text-gray-300"><strong>Última actualización:</strong> 26 de junio de 2025</p>

      <h2 className="dark:text-white">1. Aceptación de los Términos</h2>
      <p className="dark:text-gray-300">
        Bienvenido. Al acceder y utilizar nuestro sitio web, aceptas cumplir con los presentes Términos y Condiciones y con nuestra Política de Privacidad. Si no estás de acuerdo con alguno de estos términos, te solicitamos que no utilices nuestro sitio.
      </p>

      <h2 className="dark:text-white">2. Uso del Sitio Web</h2>
      <p className="dark:text-gray-300">
        Te comprometes a utilizar nuestro sitio web únicamente con fines lícitos y de acuerdo con las normativas vigentes. Queda estrictamente prohibido cualquier uso que pueda dañar, sobrecargar o perjudicar el sitio o interferir con el uso del mismo por parte de otros usuarios.
      </p>

      <h2 className="dark:text-white">3. Propiedad Intelectual</h2>
      <p className="dark:text-gray-300">
        Todo el contenido publicado en este sitio web, incluyendo textos, gráficos, logos, íconos, imágenes, clips de audio y video, es propiedad de Andrea o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual de Colombia e internacionales. No se permite la reproducción o uso no autorizado de dicho contenido.
      </p>

      <h2 className="dark:text-white">4. Servicios Ofrecidos</h2>
      <p className="dark:text-gray-300">
        La información sobre los tratamientos y servicios ofrecidos en este sitio web tiene un carácter informativo y no constituye una oferta contractual definitiva. Los detalles, precios y condiciones específicas de cada servicio serán proporcionados durante la consulta de valoración. El agendamiento de una cita a través de este sitio está sujeto a confirmación por parte de nuestro equipo.
      </p>

      <h2 className="dark:text-white">5. Limitación de Responsabilidad</h2>
      <p className="dark:text-gray-300">
        Andrea no se hace responsable por los daños o perjuicios que puedan derivarse del uso de la información contenida en este sitio web. La información médica aquí presentada es general y no sustituye en ningún caso una consulta médica personalizada.
      </p>

      <h2 className="dark:text-white">6. Enlaces a Terceros</h2>
      <p className="dark:text-gray-300">
        Este sitio puede contener enlaces a sitios web de terceros. No nos hacemos responsable por el contenido o las políticas de privacidad de dichos sitios.
      </p>

      <h2 className="dark:text-white">7. Ley Aplicable y Jurisdicción</h2>
      <p className="dark:text-gray-300">
         Los términos y condiciones se regirán e interpretarán de acuerdo con la normativa aplicable vigente dentro del territorio colombiano.
      </p>

      <h2 className="dark:text-white">8. Modificaciones</h2>
      <p>
        Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Te recomendamos revisarlos periódicamente.
      </p>
    </div>
  );
}