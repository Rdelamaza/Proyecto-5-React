import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base :'/Proyecto-5-React/',
    build: {
    outDir: 'dist',  // Asegúrate de que la carpeta de salida sea "dist"
  },
});