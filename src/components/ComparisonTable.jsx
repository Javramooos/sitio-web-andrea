import React from 'react';
import styles from './ComparisonTable.module.css';

const ComparisonTable = ({ products }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.comparisonTable}>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Característica Clave</th>
            <th>Nuestra Nota</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>
                <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer sponsored">
                  <img src={product.image} alt={product.name} className={styles.productImage} loading="lazy" decoding="async" />
                  <span className={styles.productName}>{product.name}</span>
                </a>
              </td>
              <td>{product.keyFeature}</td>
              <td>
                <span className={styles.rating}>{product.rating}/10</span>
              </td>
              <td>
                <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer sponsored" className={styles.ctaButton}>
                  Ver en Amazon
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
