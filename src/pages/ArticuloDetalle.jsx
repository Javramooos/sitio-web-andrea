// src/pages/ArticuloDetalle.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogData } from '../blogData'; // Importamos los datos estáticos
import './ArticuloDetalle.css';

export default function ArticuloDetalle() {
  const [articulo, setArticulo] = useState(null);
  const [articulosRelacionados, setArticulosRelacionados] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const articuloEncontrado = blogData.find(a => a.slug === slug);

    if (articuloEncontrado) {
      const formattedArticle = {
        ...articuloEncontrado,
        titulo: articuloEncontrado.title,
        contenido: articuloEncontrado.content,
        imagen: articuloEncontrado.imageUrl,
        categoria: articuloEncontrado.category,
        amazonLink: articuloEncontrado.amazonLink, 
        fecha: new Date().toLocaleDateString('es-ES', { 
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        tiempoLectura: Math.ceil(articuloEncontrado.content.split(' ').length / 200), // 200 palabras por minuto
      };
      setArticulo(formattedArticle);

      // --- SEO Dinámico ---
      // 1. Actualizar el título de la página
      document.title = `${formattedArticle.titulo} - Blog de Andrea Díaz`;

      // 2. Actualizar la meta descripción
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', formattedArticle.summary);
      } else {
        const newMeta = document.createElement('meta');
        newMeta.name = "description";
        newMeta.content = formattedArticle.summary;
        document.head.appendChild(newMeta);
      }

      // Lógica para encontrar artículos relacionados
      const relacionados = blogData.filter(
        (a) => a.category === formattedArticle.categoria && a.id !== formattedArticle.id
      ).slice(0, 2); // Tomamos hasta 2 artículos relacionados
      setArticulosRelacionados(relacionados);

    } else {
      console.error("Artículo no encontrado");
    }
  }, [slug, navigate]);

  if (!articulo) {
    return <div className="detalle-container fade-in"><p>Artículo no encontrado.</p></div>;
  }

  return (
    <div className="detalle-container fade-in">
      <div className="detalle-top-bar">
        <Link to="/blog" className="volver-link">← Volver al blog</Link>
      </div>
      <header className="detalle-header">
        <span className="categoria-tag">{articulo.categoria}</span>
        <h1>{articulo.titulo}</h1>
        <p className="tiempo-lectura">Tiempo de lectura: {articulo.tiempoLectura} min</p>
      </header>
      
      <img src={articulo.imagen} alt={articulo.titulo} className="detalle-imagen-portada" />
      
      <div 
        className="detalle-contenido" 
        dangerouslySetInnerHTML={{ __html: articulo.contenido }}
      />

      {/* Botón de compra de Amazon */}
      {articulo.amazonLink && (
        <div className="amazon-link-container">
          <a href={articulo.amazonLink} target="_blank" rel="noopener noreferrer" className="amazon-buy-button">
            Comprar en Amazon
          </a>
        </div>
      )}

      {/* Sección de Compartir en Redes Sociales */}
      <div className="social-share-container">
        <h4>Comparte este artículo:</h4>
        <div className="social-buttons">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="social-button facebook">
            Facebook
          </a>
          <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${encodeURIComponent(articulo.titulo)}`} target="_blank" rel="noopener noreferrer" className="social-button twitter">
            Twitter
          </a>
          <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${encodeURIComponent(articulo.titulo)}`} target="_blank" rel="noopener noreferrer" className="social-button linkedin">
            LinkedIn
          </a>
          <a href={`whatsapp://send?text=${encodeURIComponent(articulo.titulo + " " + window.location.href)}`} target="_blank" rel="noopener noreferrer" className="social-button whatsapp">
            WhatsApp
          </a>
        </div>
      </div>

      {/* Sección de Artículos Relacionados */}
      {articulosRelacionados.length > 0 && (
        <div className="articulos-relacionados-container">
          <h3>También te puede interesar</h3>
          <div className="relacionados-grid">
            {articulosRelacionados.map(relacionado => (
              <Link to={`/blog/${relacionado.slug}`} key={relacionado.id} className="relacionado-card">
                <img src={relacionado.imageUrl} alt={relacionado.title} />
                <div className="relacionado-card-content">
                  <span className="categoria-tag-relacionado">{relacionado.category}</span>
                  <h4>{relacionado.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
