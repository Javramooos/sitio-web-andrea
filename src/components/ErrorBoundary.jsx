import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para que el siguiente renderizado muestre la UI de fallback
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // También puedes registrar el error en un servicio de reporte de errores
    console.error("Uncaught error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier UI de fallback personalizada
      return (
        <div style={{ padding: '20px', border: '1px solid red', color: 'red', margin: '20px auto', maxWidth: '800px' }}>
          <h2>¡Algo salió mal!</h2>
          <p>No pudimos cargar el contenido de este artículo.</p>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <p>Por favor, intenta recargar la página o vuelve al <a href="/blog" style={{ color: 'red' }}>blog</a>.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;