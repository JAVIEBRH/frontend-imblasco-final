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
        secure: false,
        timeout: 120000, // 2 min para streaming (SSE)
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes) => {
            // Evitar buffer para Server-Sent Events (streaming)
            if (proxyRes.headers['content-type']?.includes('text/event-stream')) {
              proxyRes.headers['cache-control'] = 'no-cache'
              proxyRes.headers['x-no-compression'] = '1'
            }
          })
        }
      }
    }
  }
})

