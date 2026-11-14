
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for GitHub Pages deployment
export default defineConfig({
  plugins: [react()],

  // GitHub repository name
  base: '/Fsd_Saha_Couture_React/',

  server: {
    port: 5173,
    open: true,
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
});
