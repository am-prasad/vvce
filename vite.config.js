import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/postcss'; // Use @tailwindcss/postcss here
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // This sets up the `@` alias for the `src` folder
    },
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss, // This is now the correct Tailwind PostCSS plugin
        autoprefixer,
      ]
    }
  }
});
