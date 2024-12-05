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
        '/src/components/MetricsDashboard.jsx',
        // Добавьте другие внешние зависимости, если необходимо
      ],
    },
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'card': 'white',
        'card-foreground': 'black',
      }
    },
  },
  plugins: [],
});