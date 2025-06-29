// src/pages/PoliticaPrivacidad.jsx

import React from 'react';
import './LegalPages.css'; // Crearemos este archivo CSS para darle estilo

export default function PoliticaPrivacidad() {
  return (
    <div className="legal-container">
      <h1>Política de Privacidad</h1>
      <p><strong>Última actualización:</strong> 26 de junio de 2025</p>

      <h2>1. Responsable del Tratamiento de Datos</h2>
      <p>
        <strong>Razón Social:</strong> de Andrea <br />
        <strong>Correo Electrónico:</strong> [Tu Correo Electrónico de Contacto] <br />
        <strong>Teléfono:</strong> [Tu Número de Teléfono] <br />
        <strong>Ubicación:</strong> Bogotá, Colombia
      </p>

      <h2>2. Finalidad del Tratamiento de Datos</h2>
      <p>
         Andrea, trataremos los datos personales que nos proporciones con las siguientes finalidades:
      </p>
      <ul>
        <li>Gestionar y agendar las citas solicitadas a través de nuestro formulario de agenda.</li>
        <li>Responder a las consultas y solicitudes enviadas a través de nuestro formulario de contacto.</li>
        <li>Enviar comunicaciones informativas sobre nuestros servicios, promociones o noticias relevantes, siempre que contemos con tu consentimiento explícito para ello.</li>
        <li>Mejorar la experiencia del usuario y el funcionamiento de nuestro sitio web.</li>
      </ul>

      <h2>3. Datos Personales Recopilados</h2>
      <p>
        Para las finalidades mencionadas, recopilamos los siguientes datos personales:
      </p>
      <ul>
        <li>Nombre y Apellido</li>
        <li>Dirección de Correo Electrónico</li>
        <li>Número de Teléfono</li>
        <li>Cualquier otra información que decidas compartir voluntariamente en los campos de mensaje de nuestros formularios.</li>
      </ul>

      <h2>4. Legitimación para el Tratamiento</h2>
      <p>
        La base legal para el tratamiento de tus datos es tu **consentimiento explícito**, el cual otorgas al aceptar esta política de privacidad antes de enviar cualquier formulario en nuestro sitio web.
      </p>

      <h2>5. Conservación de los Datos</h2>
      <p>
        Tus datos personales se conservarán durante el tiempo estrictamente necesario para cumplir con las finalidades para las que fueron recopilados, o hasta que solicites su supresión.
      </p>

      <h2>6. Derechos del Titular</h2>
      <p>
        Como titular de los datos, tienes derecho a Conocer, Actualizar, Rectificar y Solicitar la Supresión de tus datos personales, así como a revocar el consentimiento otorgado. Estos derechos pueden ser ejercidos enviando una solicitud a nuestro correo electrónico de contacto.
      </p>

      <h2>7. Seguridad de los Datos</h2>
      <p>
       Andrea se compromete a adoptar las medidas técnicas y organizativas necesarias para garantizar la seguridad de tus datos personales y evitar su alteración, pérdida o tratamiento no autorizado.
      </p>

      <h2>8. Cambios en la Política de Privacidad</h2>
      <p>
        Nos reservamos el derecho de modificar esta política en cualquier momento. Cualquier cambio será notificado mediante su publicación en este sitio web.
      </p>
    </div>
  );
}