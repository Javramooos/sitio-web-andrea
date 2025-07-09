import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // Modificamos este bloque
  server: {
    // Le decimos a Vite que use SIEMPRE el puerto 5175
    port: 5175,

    // Opcional: esto asegura que si el 5175 está ocupado, falle
    // en lugar de buscar otro puerto. Es bueno para la consistencia.
    strictPort: true,
  }
})