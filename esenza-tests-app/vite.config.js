import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' hace que los archivos generados usen rutas relativas,
// que es lo que necesita GitHub Pages cuando el sitio no vive en la raíz del dominio.
export default defineConfig({
  plugins: [react()],
  base: './',
});
