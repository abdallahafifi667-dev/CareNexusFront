import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Advanced chunking to reduce initial bundle size
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
            return 'react-vendor';
          }
          if (id.includes('lucide-react') || id.includes('framer-motion') || id.includes('react-hot-toast')) {
            return 'ui-vendor';
          }
          if (id.includes('i18next') || id.includes('react-i18next')) {
            return 'i18n-vendor';
          }
          if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) {
            return 'redux-vendor';
          }
        }
      }
    },
    // Ensure aggressive minification
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react']
  }
})
