import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Puerto del frontend
    strictPort: false, // Permite usar otro puerto si está ocupado
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Backend en puerto 3001
        changeOrigin: true,
        secure: false
      }
    }
  }
})

