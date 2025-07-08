import React, { useState } from 'react';
import './Agenda.css';

const tratamientos = [
  { id: 'microdermoabrasion', nombre: 'Microdermoabrasión' },
  { id: 'rellenos', nombre: 'Rellenos Dérmicos' },
  { id: 'peeling', nombre: 'Peeling Químico' },
  { id: 'botox', nombre: 'Toxina Botulínica' },
  { id: 'otro', nombre: 'Otro (especificar en observaciones)' }
];
const consejosPorTratamiento = {
  microdermoabrasion: "Evita la exposición solar directa 3 días antes de tu sesión.",
  rellenos: "No consumas alcohol 24 horas antes para minimizar la posibilidad de hematomas.",
  peeling: "Suspende el uso de retinoides o ácidos fuertes una semana antes de tu cita.",
  botox: "Evita tomar aspirina o antiinflamatorios una semana antes para reducir el riesgo de moratones.",
};
const horasDisponibles = ['08:30 AM', '10:30 AM', '12:00 PM', '02:00 PM', '03:30 PM', '05:30 PM'];

export default function Agenda() {
  const [horaSeleccionada, setHoraSeleccionada] = useState('');
  const [tratamientoSeleccionado, setTratamientoSeleccionado] = useState('');

  // =================================================================
  // === ESTA ES LA NUEVA FUNCIÓN QUE ENVÍA EL WHATSAPP ===
  // =================================================================
  const handleFormSubmit = (e) => {
    // 1. Prevenimos que la página se recargue
    e.preventDefault();

    // 2. Recolectamos los datos del formulario usando sus 'name'
    const formData = new FormData(e.target);
    const nombre = formData.get('nombre');
    const email = formData.get('email');
    const telefono = formData.get('telefono');
    const fecha = formData.get('fecha');
    const observaciones = formData.get('observaciones');

    // Los datos del estado los tomamos directamente
    const tratamientoObj = tratamientos.find(t => t.id === tratamientoSeleccionado);
    const nombreTratamiento = tratamientoObj ? tratamientoObj.nombre : 'No especificado';
    const hora = horaSeleccionada;

    // 3. Creamos el mensaje formateado para WhatsApp
    // (%0A es el código para un salto de línea en una URL)
    const mensaje = `*Nueva Solicitud de Cita*%0A%0A` +
                  `*Paciente:* ${nombre}%0A` +
                  `*Email:* ${email}%0A` +
                  `*Teléfono:* ${telefono}%0A%0A` +
                  `*Tratamiento de Interés:* ${nombreTratamiento}%0A` +
                  `*Fecha seleccionada:* ${fecha}%0A` +
                  `*Hora preferida:* ${hora}%0A%0A` +
                  `*Observaciones:* ${observaciones || 'Ninguna'}`;

    // 4. Tu número de WhatsApp (con código de país, sin el '+')
    const tuNumero = '573195296092'; // <-- ¡IMPORTANTE! Reemplaza con tu número real

    // 5. Creamos la URL final y abrimos en una nueva pestaña
    const urlWhatsApp = `https://wa.me/${tuNumero}?text=${mensaje}`;
    window.open(urlWhatsApp, '_blank');

    // 6. Opcional: Reseteamos el formulario después de enviar
    e.target.reset();
    setHoraSeleccionada('');
    setTratamientoSeleccionado('');
  };

  const consejoAMostrar = consejosPorTratamiento[tratamientoSeleccionado] || "Para asegurar la mejor experiencia, por favor llega 10 minutos antes de tu hora programada y evita el uso de maquillaje en la zona a tratar.";

  return (
    <section className="agenda-page-container fade-in">
      <div className="agenda-titulo-container">
        <h1>Agenda tu Cita</h1>
        <p>Completa el formulario para solicitar tu cita. Nos pondremos en contacto contigo a la brevedad para confirmar la disponibilidad.</p>
      </div>
      <div className="agenda-content-wrapper">
        <div className="form-container">
          <form className="formulario-agenda" id="formulario-de-cita" onSubmit={handleFormSubmit}>
            <div className="input-group">
              <label htmlFor="nombre">Nombre Completo</label>
              <input id="nombre" name="nombre" type="text" placeholder="Ej: María Pérez" required />
            </div>
            <div className="input-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input id="email" name="email" type="email" placeholder="ejemplo@correo.com" required />
            </div>
            <div className="input-group">
              <label htmlFor="telefono">Teléfono</label>
              <input id="telefono" name="telefono" type="tel" placeholder="300 123 4567" required />
            </div>
            <div className="input-group">
              <label htmlFor="tratamiento">Elige el Tratamiento</label>
              <select id="tratamiento" name="tratamiento" required value={tratamientoSeleccionado} onChange={(e) => setTratamientoSeleccionado(e.target.value)}>
                <option value="" disabled>Selecciona un tratamiento...</option>
                {tratamientos.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="fecha">Elige la Fecha</label>
              <input id="fecha" name="fecha" type="date" required />
            </div>
            <div className="input-group">
              <label>Elige la Hora</label>
              <div className="horas-grid">
                {horasDisponibles.map(hora => (
                  <button type="button" key={hora} className={`hora-btn ${horaSeleccionada === hora ? 'selected' : ''}`} onClick={() => setHoraSeleccionada(hora)}>
                    {hora}
                  </button>
                ))}
              </div>
              <input type="hidden" name="hora" value={horaSeleccionada} />
            </div>
            <div className="input-group">
              <label htmlFor="observaciones">Observaciones (opcional)</label>
              <textarea id="observaciones" name="observaciones" placeholder="¿Hay algo más que debamos saber?" rows="4"></textarea>
            </div>
            <button type="submit" form="formulario-de-cita" className="submit-btn submit-btn-desktop">Solicitar Cita</button>
          </form>
        </div>
        <div className="info-container">
          <div className="info-box">
            <h3>Nuestros Horarios</h3>
            <ul><li><strong>Lunes a Sábados:</strong> 8:30 AM - 5:30 PM</li><li><strong>Domingos y Festivos:</strong> Cerrado</li></ul>
          </div>
          <div className="info-box">
            <h3>Antes de tu Cita</h3>
            <p>{consejoAMostrar}</p>
            {consejosPorTratamiento[tratamientoSeleccionado] && (
              <p key={tratamientoSeleccionado} className="consejo-especifico"><strong>Recomendación adicional:</strong> {consejosPorTratamiento[tratamientoSeleccionado]}</p>
            )}
          </div>
          <div className="info-box">
            <h3>Ubicación</h3>
            <p>Cra. 11 #97-23 Consultorio 102, Bogotá, Colombia</p>
            <div className="map-container">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15906.206063095775!2d-74.0616865!3d4.6737411!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9b721fc3c1af%3A0x184c24e10ec5e0a!2sDra%20Andrea%20Diaz-Medicina%20est%C3%A9tica%20avanzada!5e0!3m2!1ses!2sco!4v1750908412852!5m2!1ses!2sco" width="100%" height="250" style={{border:0}} allowFullScreen="" loading="lazy"></iframe>
            </div>
          </div>
          <button type="submit" form="formulario-de-cita" className="submit-btn submit-btn-mobile">Solicitar Cita</button>
        </div>
      </div>
    </section>
  );
}