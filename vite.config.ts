import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@lego': path.resolve(__dirname, './src/components/lego'),
    },
  },
  optimizeDeps: {
    include: ['date-fns'],
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
})
