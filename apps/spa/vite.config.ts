import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
// import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  // Use a relative base so the built index and assets resolve correctly when served
  // from nginx (especially if served from a subpath or opened via filesystem for tests).
  base: '/',

  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },

  // Dev server: bind to 0.0.0.0 so nginx or Docker can proxy to it if needed
  server: {
    host: '0.0.0.0',
    port: 5173,
  },

  // Build options tuned for serving with nginx: hashed assets and dedicated assets dir
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
})
