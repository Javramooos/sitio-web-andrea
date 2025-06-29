import React, { useState, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import './Pago.css';

// --- FUNCIÓN PARA CONVERTIR NÚMERO A LETRAS (sin cambios) ---
function numeroALetras(num) {
  const unidades = ["", "un", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
  const decenas = ["", "diez", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
  const centenas = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];
  const numString = String(num).replace(/[^0-9]/g, '');
  if (numString === '' || parseInt(numString) === 0) return '';
  const getDecenas = (n) => { if (n < 10) return unidades[n]; if (n === 10) return "diez"; if (n < 20) return "dieci" + unidades[n-10]; const decena = Math.floor(n / 10); const unidad = n % 10; return decenas[decena] + (unidad > 0 ? " y " + unidades[unidad] : ""); };
  const getCentenas = (n) => { if (n > 99) { if (n === 100) return "cien"; return centenas[Math.floor(n / 100)] + " " + getDecenas(n % 100); } return getDecenas(n); };
  const getMiles = (n) => { if (n < 1000) return getCentenas(n); const mil = Math.floor(n / 1000); const resto = n % 1000; if (mil === 1) return "mil" + (resto > 0 ? " " + getCentenas(resto) : ""); return getCentenas(mil) + " mil" + (resto > 0 ? " " + getCentenas(resto) : ""); }
  const millones = (n) => { if (n < 1000000) return getMiles(n); const millon = Math.floor(n / 1000000); const resto = n % 1000000; let textoMillon = millon === 1 ? "un millón" : getCentenas(millon) + " millones"; return textoMillon + (resto > 0 ? " " + getMiles(resto) : ""); }
  const finalString = millones(parseInt(numString));
  return finalString.charAt(0).toUpperCase() + finalString.slice(1) + " Pesos Colombianos.";
}


// --- DATOS DE PRODUCTOS Y PAGOS ---
const itemsDePago = [
  {
    categoria: 'Tratamientos',
    titulo: 'Abono de Tratamiento',
    descripcion: 'Realiza el pago inicial o un abono para asegurar tu cita y tratamiento agendado.',
    imagen: '/assets/pago_tratamiento.jpg',
    precio: 'Variable',
    detalles: 'Ingresa el monto acordado con la clínica. Este pago se descontará del total de tu procedimiento.',
    videoUrl: null,
    posterUrl: null,
    beneficios: null
  },
  {
    categoria: 'Sérums',
    titulo: 'Sérum de Vitamina C 20%',
    descripcion: 'Potente antioxidante que ilumina la piel, reduce manchas y estimula la producción de colágeno.',
    imagen: '/assets/producto_serum_c.jpg',
    precio: '150.000',
    detalles: 'Aplicar 3-4 gotas sobre el rostro limpio por la mañana, antes de la crema hidratante y el protector solar.',
    videoUrl: 'https://www.youtube.com/embed/URL_DEL_NUEVO_VIDEO',
    posterUrl: '/assets/poster_serum.jpg',
    beneficios: [ 'Neutraliza los radicales libres.', 'Aporta luminosidad y unifica el tono.', 'Fomenta la síntesis de colágeno para mayor firmeza.' ]
  },
  {
    categoria: 'Cremas',
    titulo: 'Crema Hidratante con Ácido Hialurónico',
    descripcion: 'Hidratación profunda y duradera que rellena líneas finas y deja la piel suave y elástica.',
    imagen: '/assets/producto_hialuronico.jpg',
    precio: '180.000',
    detalles: 'Usar día y noche sobre la piel limpia. Apta para todo tipo de piel, especialmente deshidratadas.',
    videoUrl: 'https://www.youtube.com/embed/URL_DEL_VIDEO',
    posterUrl: '/assets/poster_crema.jpg',
    beneficios: [ 'Atrae y retiene hasta 1000 veces su peso en agua.', 'Mejora la elasticidad y suavidad de la piel.', 'Reduce la apariencia de arrugas por deshidratación.' ]
  },
  {
    categoria: 'Cuidado de Ojos',
    titulo: 'Contorno de Ojos con Cafeína',
    descripcion: 'Reduce la apariencia de bolsas, ojeras y finas líneas de expresión en la zona periocular.',
    imagen: '/assets/producto_ojos.jpg',
    precio: '165.000',
    detalles: 'Aplicar una pequeña cantidad con suaves toques usando el dedo anular, por la mañana y por la noche.',
    // === CAMBIO REALIZADO AQUÍ ===
    videoUrl: 'https://www.youtube.com/embed/URL_DEL_VIDEO_DE_OJOS', // URL de ejemplo
    posterUrl: '/assets/poster_ojos.jpg',   // Ruta de ejemplo
    beneficios: [ 'Disminuye la hinchazón y congestión (bolsas).', 'Mejora la microcirculación para atenuar ojeras.', 'Aporta hidratación específica para la delicada piel del contorno.' ]
  },
  {
    categoria: 'Protectores Solares',
    titulo: 'Protector Solar SPF 50+ Toque Seco',
    descripcion: 'Alta protección contra rayos UVA/UVB con una fórmula ligera de rápida absorción y sin brillo.',
    imagen: '/assets/producto_protector.jpg',
    precio: '120.000',
    detalles: 'Reaplicar cada 2-3 horas. Ideal para pieles mixtas a grasas. No deja residuos blancos.',
    // === CAMBIO REALIZADO AQUÍ ===
    videoUrl: 'https://www.youtube.com/embed/ID_DE_TU_VIDEO', // URL de ejemplo
    posterUrl: '/assets/poster_protector.jpg', // Ruta de ejemplo
    beneficios: [ 'Protección de amplio espectro contra el fotoenvejecimiento.', 'Acabado mate ideal para usar antes del maquillaje.', 'Fórmula no comedogénica que no obstruye los poros.' ]
  },
];

const categorias = ['Todos', ...new Set(itemsDePago.map(item => item.categoria))];
const listaTratamientos = ['Microdermoabrasión', 'Rellenos Dérmicos', 'Peeling Químico', 'Consulta de Valoración'];


export default function Pago() {
  const [openIndex, setOpenIndex] = useState(null);
  const [filtroActivo, setFiltroActivo] = useState('Todos');
  const [montoVariable, setMontoVariable] = useState('');
  const [playingVideoIndex, setPlayingVideoIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(prevIndex => {
      if (prevIndex !== index) {
        setMontoVariable('');
        setPlayingVideoIndex(null);
      }
      return prevIndex === index ? null : index;
    });
  };

  const handleMontoChange = (e) => {
    const valorSinPuntos = e.target.value.replace(/[^0-9]/g, '');
    setMontoVariable(valorSinPuntos);
  };

  const montoFormateado = new Intl.NumberFormat('es-CO').format(montoVariable || 0);

  const itemsFiltrados = itemsDePago.filter(item => 
    filtroActivo === 'Todos' ? true : item.categoria === filtroActivo
  );

  const handlePagar = (item) => {
    alert(`Iniciando proceso de pago para: ${item.titulo}`);
  };

  const handlePlayVideo = (e, index) => {
    e.stopPropagation();
    setPlayingVideoIndex(index);
  };

  return (
    <div className="pago-page-container fade-in">
      <div className="pago-titulo-container">
        <h1>Portal de Pagos y Productos</h1>
        <p>Tu espacio seguro para adquirir productos y realizar el pago de tus tratamientos.</p>
      </div>

      <div className="filtros-container">
        {categorias.map(categoria => (
          <button key={categoria} className={`filtro-btn ${filtroActivo === categoria ? 'active' : ''}`} onClick={() => setFiltroActivo(categoria)}>
            {categoria}
          </button>
        ))}
      </div>

      <div className="pagos-grid-container">
        {itemsFiltrados.map((item, index) => (
          <Fragment key={item.titulo}>
            <div className={`pago-item ${openIndex === index ? 'active' : ''}`} onClick={() => handleToggle(index)}>
              <div className="pago-header">
                <img src={item.imagen} alt={item.titulo} className="pago-imagen-pequena" />
                <div className="pago-header-texto">
                  <h3>{item.titulo}</h3>
                  <p>{item.descripcion}</p>
                </div>
              </div>
            </div>

            {openIndex === index && (
              <div className="pago-detalle-expandido">
                <div className="detalle-columna-pago video">
                  {item.videoUrl ? (
                    <div className="video-player-wrapper">
                      {playingVideoIndex === index ? (
                        <div className="video-container">
                          <iframe src={`${item.videoUrl}?autoplay=1`} title={item.titulo} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                      ) : (
                        <div className="video-poster" onClick={(e) => handlePlayVideo(e, index)}>
                          <img src={item.posterUrl} alt={`Video de ${item.titulo}`} />
                          <div className="play-button-overlay">
                            <FontAwesomeIcon icon={faPlayCircle} />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <img src={item.imagen} alt={item.titulo} className="pago-imagen-grande" />
                  )}
                  <p className="pago-detalles-texto">{item.detalles}</p>
                </div>
                
                <div className="detalle-columna-pago accion">
                  <h3>{item.titulo}</h3>
                  <p className="pago-precio">
                    {item.precio === 'Variable' ? `$ ${montoFormateado} COP` : `$${item.precio} COP`}
                  </p>
                  
                  {item.beneficios && (
                    <div className="beneficios-pago-container">
                      <h4>Beneficios Clave</h4>
                      <ul className="beneficios-lista-pago">
                        {item.beneficios.map((beneficio, i) => (<li key={i}>{beneficio}</li>))}
                      </ul>
                    </div>
                  )}

                  {item.precio === 'Variable' && (
                    <>
                      <div className="input-group-pago">
                        <label htmlFor="tratamiento-abono">¿Qué tratamiento deseas abonar?</label>
                        <select id="tratamiento-abono" required>
                          <option value="">Selecciona un tratamiento...</option>
                          {listaTratamientos.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div className="input-group-pago">
                        <label htmlFor="monto">Ingresa el monto a pagar:</label>
                        <input type="text" id="monto" placeholder="Ej: 250.000" value={montoFormateado === '0' ? '' : montoFormateado} onChange={handleMontoChange}/>
                        {montoVariable && (<p className="monto-en-letras">{numeroALetras(montoVariable)}</p>)}
                      </div>
                    </>
                  )}

                  <button className="boton-pagar-grande" onClick={() => handlePagar(item)}>
                    <FontAwesomeIcon icon={faCreditCard} /> Pagar Ahora
                  </button>
                  <p className="pago-seguro-texto">Serás redirigido a nuestra pasarela de pagos segura.</p>
                </div>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}