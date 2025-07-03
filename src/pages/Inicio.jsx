import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import TestimoniosCarrusel from "../components/TestimoniosCarrusel";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Inicio() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const testimonios = [
    { nombre: "María P.", texto: "Me siento renovada después de cada sesión, la Dra. Andrea tiene unas manos mágicas.", foto: "/assets/testimonio1.jpg" },
    { nombre: "Laura G.", texto: "El mejor lugar para tratamientos faciales, resultados visibles desde el primer momento.", foto: "/assets/testimonio2.jpg" },
    { nombre: "Carolina R.", texto: "Excelente atención, profesionales de alto nivel y tecnología de punta.", foto: "/assets/testimonio3.jpg" },
    { nombre: "Gabriela M.", texto: "Me devolvieron la confianza en mí misma.", foto: "/assets/testimonio4.jpg" },
    { nombre: "Diana S.", texto: "Sin duda el mejor lugar, muy profesional todo el equipo.", foto: "/assets/testimonio5.jpg" },
  ];

  const imagenes = [
    { src: "/assets/1.jpg", texto: "La doctora durante un procedimiento de rejuvenecimiento facial." },
    { src: "/assets/2.jpg", texto: "Equipos de última tecnología en nuestras oficinas." },
    { src: "/assets/3.jpg", texto: "Resultados visibles en nuestros pacientes satisfechos." },
  ];

  const [index, setIndex] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [mostrarTodo, setMostrarTodo] = useState(false);

  useEffect(() => {
    if (!pausado) {
      const intervalo = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
      }, 4000);
      return () => clearInterval(intervalo);
    }
  }, [imagenes.length, pausado, index]);

  const handleMouseEnter = () => setPausado(true);
  const handleMouseLeave = () => setPausado(false);

  const textoCorto = "Egresada de la Universidad Nacional de Colombia. Especializada en procedimientos faciales y corporales.";
  const textoCompleto = "Egresada de la Universidad Nacional de Colombia. Especializada en procedimientos faciales y corporales, con más de 10 años de experiencia, miembro activo de la Sociedad Colombiana de Medicina Estética, conferencista internacional, reconocida por sus técnicas avanzadas en rejuvenecimiento facial no invasivo.";

  return (
    <div className="inicio-container" style={{ margin: 0, padding: 0, overflowX: "hidden" }}>

{/* --- Reemplaza tu sección de bienvenida con esta --- */}
<section className="bienvenida fade-in">
  {/* Ahora el video usa una clase en lugar de estilos en línea */}
  <video autoPlay loop muted playsInline className="video-background">
    <source src="/assets/andrea.mp4" type="video/mp4" />
  </video>
  
  {/* El contenido de texto no cambia */}
  <h1>La Armonía que Buscas, los Resultados que Amas.</h1>
  <p className="subtitulo">Tu espacio de bienestar, belleza y cuidado personalizado  Tu bienestar es nuestra prioridad.</p>
  <div className="boton-agendar">
    <Link to="/agenda">
      <button>Agende acá</button>
    </Link>
  </div>
</section>

      {/* Conozca a la doctora */}
      <section className="fade-in" style={{ textAlign: 'center', marginTop: '2rem' }}>
        <div style={{ display: 'inline-block', background: '#ffffff', padding: '1.5rem 3rem', borderRadius: '16px', boxShadow: '0 8px 20px rgba(0,0,0,0.3)', border: '2px solid #d1b3bd' }}>
          <h2 style={{ fontSize: '2rem', margin: 0, color: '#000' }}>Conozca a la Dra. Andrea Díaz</h2>
        </div>
      </section>

      {/* Calidad y Seguridad */}
      <section className="intro-procedimientos fade-in" style={{ background: '#f8f8f8', color: '#000', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', margin: '2rem' }}>
        <h2>Calidad y Seguridad Garantizadas</h2>
        <p>Cada tratamiento es realizado por profesionales capacitados, utilizando tecnología de última generación y protocolos certificados. Nuestra prioridad es ofrecer resultados visibles sin comprometer tu bienestar.</p>
      </section>
      {/* Sección conoce a la doctora + carrusel */}
      <section className="conoceme-seccion" style={{ display: 'flex', flexWrap: 'wrap', marginTop: '4rem', gap: '2rem', padding: '2rem', justifyContent: 'center', alignItems: 'flex-start' }}>
        <div data-aos="fade-right" style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
          <div className="tarjeta-doctora" style={{ width: '300px', borderRadius: '12px', overflow: 'hidden', background: '#fff', border: '2px solid #d1b3bd', boxShadow: '0 6px 20px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column' }}>
            <img src="/assets/foto.jpg" alt="Doctora" style={{ width: '100%', height: '60%', objectFit: 'cover' }} />
            <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ margin: 0 }}>Dra. Andrea Díaz</h3>
              <p style={{ margin: '0.5rem 0' }}>Medicina Estética</p>
              <p style={{ fontSize: '0.9rem', color: '#333' }}>{mostrarTodo ? textoCompleto : textoCorto}</p>
              <button onClick={() => setMostrarTodo(!mostrarTodo)} style={{ alignSelf: 'center', marginTop: '1rem', background: '#d1b3bd', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', color: '#000' }}>
                {mostrarTodo ? 'Ver menos' : 'Ver más'}
              </button>
            </div>
          </div>
        </div>

        <div data-aos="fade-left" style={{ flex: '2 1 400px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="carrusel-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ position: 'relative', width: '100%', height: '500px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', overflow: 'hidden' }}>
            {imagenes.map((item, i) => (
              <div key={i} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: i === index ? 1 : 0, transition: 'opacity 1s ease', padding: '1rem', boxSizing: 'border-box' }}>
                <div style={{ border: '5px solid #d1b3bd', borderRadius: '12px', overflow: 'hidden', width: '100%', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={item.src} alt={`Galería ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <p style={{ textAlign: 'center', fontSize: '1rem', color: '#555', marginTop: '0.5rem' }}>{item.texto}</p>
              </div>
            ))}
            <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px' }}>
              {imagenes.map((_, i) => (
                <button key={i} onClick={() => setIndex(i)} style={{ width: '12px', height: '12px', borderRadius: '50%', border: 'none', backgroundColor: i === index ? '#d1b3bd' : '#ccc' }}></button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
        <Link to="/servicios">
  <button className="boton-ver-servicios">Ver Servicios</button>
</Link>
          </div>
        </div>
      </section>
      {/* Testimonios correctamente en nueva sección independiente */}
<section className="fade-in section-title">
  <div className="section-title-container">
    <h2>Testimonios de Nuestros Pacientes</h2>
  </div>
</section>

<TestimoniosCarrusel />


        
      
    </div>
  );
}