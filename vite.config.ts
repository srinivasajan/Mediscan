import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  build: {
    // Lightning-fast build optimizations
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react'],
          clerk: ['@clerk/clerk-react'],
        },
      },
    },
    // Enable gzip compression
    reportCompressedSize: true,
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
  },
  // Performance optimizations
  esbuild: {
    target: 'esnext',
    platform: 'browser',
  },
  // Enable CSS code splitting
  css: {
    devSourcemap: true,
  },
});