// Ejemplo de un componente para mostrar los posts de Strapi
import React, { useState, useEffect } from 'react';

const StrapiPosts = () => {
  const [posts, setPosts] = useState([]);
  const strapiUrl = 'http://localhost:1337'; // Más adelante, esto irá en un archivo .env

  useEffect(() => {
    const fetchPosts = async () => {
      // Usamos ?populate=* para que la API nos incluya la URL de la imagen
      const response = await fetch(`${strapiUrl}/api/articulos?populate=*`);
      const data = await response.json();
      setPosts(data.data); // En Strapi v4, los datos están dentro de una propiedad "data"
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.attributes.titulo}</h2>
          {/* Construimos la URL completa de la imagen */}
          <img
            src={`${strapiUrl}${post.attributes.imagen_portada.data.attributes.url}`}
            alt={post.attributes.titulo}
            width="400"
          />
          {/* Aquí necesitarías un conversor de Markdown a HTML para mostrar el contenido */}
          <p>Contenido: {post.attributes.contenido.substring(0, 100)}...</p>
        </article>
      ))}
    </div>
  );
};

export default StrapiPosts;