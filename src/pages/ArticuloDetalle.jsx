
import React, { Suspense, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { articles } from '../articuloData';
import './ArticuloDetalle.css';
import useSEO from '../hooks/useSEO';

const ArticleLoader = () => (
  <div className="detalle-container fade-in">
    <p>Cargando artículo...</p>
  </div>
);

export default function ArticuloDetalle() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [ArticleComponent, setArticleComponent] = useState(null);

  useEffect(() => {
    const foundArticle = articles.find(a => a.slug === slug);
    if (foundArticle) {
      setArticle(foundArticle);
      // Cargar el componente dinámicamente y almacenarlo en el estado
      foundArticle.component().then(module => {
        setArticleComponent(() => module.default);
      });
    } else {
      navigate('/404'); // O una página de "no encontrado"
    }
  }, [slug, navigate]);

  useSEO({
    title: article ? article.title : 'Cargando...',
    description: article ? article.summary : 'Cargando...',
    canonical: article ? `https://andreadiazmd.com/blog/${article.slug}` : ''
  });

  if (!article || !ArticleComponent) {
    return <ArticleLoader />;
  }

  return (
    <Suspense key={article.id} fallback={<ArticleLoader />}>
      <ArticleComponent articleData={article} />
    </Suspense>
  );
}
