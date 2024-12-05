import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/** @type {import('tailwindcss').Config} */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    rollupOptions: {
      external: [
        '/src/components/ErrorBoundary.jsx',
        '/src/components/MetricsDashboard.jsx',
        // Добавьте другие внешние зависимости, если необходимо
      ],
    },
  },
});