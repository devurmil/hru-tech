import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8787',
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Keep the big, rarely-changing libraries in their own long-cached chunks.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) {
            return 'vendor'
          }
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) {
            return 'motion'
          }
        },
      },
    },
  },
})
