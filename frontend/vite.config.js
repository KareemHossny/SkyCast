import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      includePublic: true,
      logStats: true,
      test: /\.(jpe?g|png|webp|avif)$/i,
      png: { quality: 85 },
      jpeg: { quality: 82 },
      jpg: { quality: 82 },
      webp: { quality: 82 },
      avif: { quality: 50 }
    })
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
  build: {
    minify: 'esbuild',
    cssMinify: true,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          const pkg = id.split('node_modules/')[1]?.split('/')[0];
          if (!pkg) return 'vendor';

          if (pkg === '@tanstack') return 'vendor-react-query';
          if (pkg === 'framer-motion') return 'vendor-motion';
          if (pkg === 'recharts') return 'vendor-charts';
          if (pkg === 'react-icons') return 'vendor-icons';

          return 'vendor';
        }
      }
    }
  }
});
