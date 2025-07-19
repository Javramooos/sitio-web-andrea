
import React from 'react';
import styles from './AmazonLink.module.css';

const AmazonLink = ({ href, children }) => {
  return (
    <a href={href} className={styles.amazonLink} target="_blank" rel="noopener noreferrer sponsored">
      {children}
    </a>
  );
};

export default AmazonLink;
