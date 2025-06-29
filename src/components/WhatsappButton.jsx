import { useEffect, useState } from "react";

export default function WhatsappButton() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    const footer = document.querySelector("footer");
    if (footer) observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return (
    visible && (
      <a
        href="https://wa.me/573001234567" // Reemplaza con el número real
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
      >
        <img
          src="/assets/whatsapp.png"
          alt="Contáctanos por WhatsApp"
          width="60"
          height="60"
        />
      </a>
    )
  );
}