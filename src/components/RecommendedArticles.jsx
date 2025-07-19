
import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../articuloData';
import styles from './RecommendedArticles.module.css';

const RecommendedArticles = ({ currentArticleId }) => {
  const recommended = articles
    .filter(a => a.id !== currentArticleId)
    .slice(0, 4); // Mostramos hasta 4 artículos recomendados

  if (recommended.length === 0) {
    return null;
  }

  return (
    <div className={styles.recommendedContainer}>
      <h3>Artículos que te podrían interesar</h3>
      <div className={styles.grid}>
        {recommended.map(article => (
          <Link to={`/blog/${article.slug}`} key={article.id} className={styles.card}>
            <img src={article.imageUrl} alt={article.title} className={styles.cardImage} loading="lazy" decoding="async" />
            <div className={styles.cardContent}>
              <h4>{article.title}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendedArticles;
