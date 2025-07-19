import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import styles from './FAQSection.module.css';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.faqItem}>
      <button className={styles.question} onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        <span className={styles.toggle}>{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && <div className={styles.answer} dangerouslySetInnerHTML={{ __html: answer }} />}
    </div>
  );
};

const FAQSection = ({ faqs }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/<[^>]*>?/gm, '') // Remove HTML for schema
      }
    }))
  };

  return (
    <section className={styles.faqSection}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <h2 className={styles.title}>Preguntas Frecuentes</h2>
      <div className={styles.faqList}>
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
