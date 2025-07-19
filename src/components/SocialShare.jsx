import React from 'react';
import styles from './SocialShare.module.css';

const SocialShare = ({ title }) => {
  // En un componente real, obtendríamos la URL dinámicamente
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const socialPlatforms = [
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      className: styles.facebook
    },
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(title)}`,
      className: styles.twitter
    },
    {
      name: 'WhatsApp',
      url: `whatsapp://send?text=${encodeURIComponent(title + " " + shareUrl)}`,
      className: styles.whatsapp
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${encodeURIComponent(title)}`,
      className: styles.linkedin
    }
  ];

  return (
    <div className={styles.socialShareContainer}>
      <h4>Comparte este artículo</h4>
      <div className={styles.buttonsWrapper}>
        {socialPlatforms.map(platform => (
          <a 
            key={platform.name}
            href={platform.url}
            target="_blank" 
            rel="noopener noreferrer"
            className={`${styles.socialButton} ${platform.className}`}
            aria-label={`Compartir en ${platform.name}`}
          >
            {platform.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialShare;
