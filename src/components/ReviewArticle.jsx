import React from 'react';
import { Helmet } from 'react-helmet';
import SocialShare from './SocialShare';
import RelatedArticles from './RelatedArticles';
import RecommendedArticles from './RecommendedArticles';
import FAQSection from './FAQSection';
import styles from './ReviewArticle.module.css';

const ReviewArticle = ({ articleData, children }) => {
  const { id, title, author, date, introduction, faqs, breadcrumbs, reviewSchema, category, imageUrl } = articleData;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };

  return (
    <article className={styles.reviewArticle}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={introduction} />
        <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <header className={styles.header}>
        <nav aria-label="breadcrumb">
          <ol className={styles.breadcrumb}>
            {breadcrumbs.map((crumb, index) => (
              <li key={index}>
                <a href={crumb.url}>{crumb.name}</a>
              </li>
            ))}
          </ol>
        </nav>
        <h1>{title}</h1>
        <p className={styles.meta}>Por {author} | Publicado el {date}</p>
      </header>

      {imageUrl && <img src={imageUrl} alt={title} className={styles.mainImage} />}

      <p className={styles.introduction}>{introduction}</p>

      <div className={styles.mainContent}>
        {children}
      </div>

      {faqs && faqs.length > 0 && <FAQSection faqs={faqs} />}

      <SocialShare title={title} />

      <RecommendedArticles currentArticleId={id} />

    </article>
  );
};

export default ReviewArticle;
