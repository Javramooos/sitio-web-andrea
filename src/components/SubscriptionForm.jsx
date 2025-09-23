import React, { useState } from 'react';
import styles from './SubscriptionForm.module.css';
import countryCodes from '../data/countryCodes.json';

const SubscriptionForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+57');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!name || !email) {
      setError('Por favor, completa tu nombre y correo electrónico.');
      return;
    }

    const fullPhone = phone ? `${countryCode}${phone}` : null;

    try {
      const response = await fetch('http://localhost:3001/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone: fullPhone }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Algo salió mal.');
      }

      setMessage('¡Gracias por suscribirte! Revisa tu correo para descargar la guía.');
      setName('');
      setEmail('');
      setPhone('');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.leadSection}>
      <div className={styles.mockup}>
        <div className={styles.mockupPlaceholder}>
            <img src="/assets/GUIA.jpg" alt="Guía para una piel radiante" />
        </div>
        <h4 className={styles.mockupTitle}>Guía para una Piel Radiante</h4>
      </div>
      <div className={styles.subscriptionForm}>
        <h3 className={styles.title}>Recibe nuestra guía gratuita</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>Nombre Completo:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="phone" className={styles.label}>Teléfono (Opcional):</label>
            <div className={styles.phoneGroup}>
              <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className={styles.input}>
                {countryCodes.map(c => <option key={c.code} value={c.code.split(',')[0]}>{c.name} ({c.code})</option>)}
              </select>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`${styles.input} ${styles.phoneInput}`}
              />
            </div>
          </div>

          <button type="submit" className={styles.button}>
            Suscribirme
          </button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
        {error && <p className={styles.error}>{error}</p>}
      </div>
      <div className={styles.benefits}>
        <h4 className={styles.benefitsTitle}>¿Qué aprenderás?</h4>
        <ul>
          <li>✓ Secretos para una piel radiante.</li>
          <li>✓ Rutinas de cuidado facial efectivas.</li>
          <li>✓ Nutrición para una belleza desde adentro.</li>
          <li>✓ Errores comunes a evitar.</li>
        </ul>
        <div className={styles.testimonial}>
          <p>"Esta guía cambió mi forma de cuidar mi piel. ¡Totalmente recomendada!"</p>
          <span>- Sofía L.</span>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionForm;
