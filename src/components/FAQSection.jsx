import React, { useState, useEffect } from 'react';
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
  useEffect(() => {
    if (!faqs || faqs.length === 0) {
      return;
    }
    
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

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-schema';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const scriptElement = document.getElementById('faq-schema');
      if (scriptElement) {
        document.head.removeChild(scriptElement);
      }
    };
  }, [faqs]);

  return (
    <section className={styles.faqSection}>
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