import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite';
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss()
  ],
  build: {
    outDir: 'dist', // Output bundles to public/js for NestJS to serve
    rollupOptions: {
      // Define multiple entry points
      input: {
        home: path.resolve(__dirname, 'src/client/home.ts'),

      },
      output: {
        // Customize output file names
        entryFileNames: '[name].js', // e.g., home.js, about.js
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
