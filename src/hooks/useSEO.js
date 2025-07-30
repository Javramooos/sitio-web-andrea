import { useEffect } from 'react';

export default function useSEO({ title, description, canonical }) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  useEffect(() => {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) {
      metaDescription.setAttribute('content', description);
    }
  }, [description]);

  useEffect(() => {
    let link = document.querySelector('link[rel="canonical"]');

    if (canonical) {
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }
  }, [canonical]);
}
