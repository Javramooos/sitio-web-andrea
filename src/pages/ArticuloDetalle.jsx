// src/pages/ArticuloDetalle.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ArticuloDetalle.css';

export default function ArticuloDetalle() {
  const [articulo, setArticulo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams(); // Obtiene el 'slug' de la URL

  useEffect(() => {
    const fetchArticulo = async () => {
      const strapiUrl = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337';
      // Filtramos por el slug para obtener el artículo correcto
      const apiUrl = `${strapiUrl}/api/articulos?filters[slug][$eq]=${slug}&populate=*`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue exitosa');
        }
        const data = await response.json();

        if (data.data && data.data.length > 0) {
          const item = data.data[0];
          // Formateamos los datos para un uso más fácil
          const formattedArticle = {
            id: item.id,
            titulo: item.attributes.titulo,
            contenido: item.attributes.contenido, // Asumimos que el contenido viene de un campo 'contenido'
            imagen: item.attributes.imagen_portada && item.attributes.imagen_portada.data ? `${strapiUrl}${item.attributes.imagen_portada.data.attributes.url}` : '',
            fecha: new Date(item.attributes.publishedAt).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
            categoria: item.attributes.categoria,
          };
          setArticulo(formattedArticle);
        } else {
          throw new Error('Artículo no encontrado');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticulo();
  }, [slug]); // El efecto se ejecuta de nuevo si el slug cambia

  if (loading) {
    return <div className="detalle-container fade-in"><p>Cargando artículo...</p></div>;
  }

  if (error) {
    return <div className="detalle-container fade-in"><p>Error: {error}</p></div>;
  }

  if (!articulo) {
    return null; // O un mensaje de "Artículo no encontrado"
  }

  return (
    <div className="detalle-container fade-in">
      <header className="detalle-header">
        <Link to="/blog" className="volver-link">← Volver al blog</Link>
        <span className="categoria-tag">{articulo.categoria}</span>
        <h1>{articulo.titulo}</h1>
        <p className="fecha-publicacion">Publicado el {articulo.fecha}</p>
      </header>
      
      <img src={articulo.imagen} alt={articulo.titulo} className="detalle-imagen-portada" />
      
      {/* Aquí renderizamos el contenido del artículo */}
      <div 
        className="detalle-contenido" 
        dangerouslySetInnerHTML={{ __html: articulo.contenido }} // Ojo: Usar con precaución si el HTML no es de confianza
      />
    </div>
  );
}
