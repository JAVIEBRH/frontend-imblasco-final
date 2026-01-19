/**
 * Configuración centralizada de la API
 * 
 * En desarrollo: usa '/api' (proxy de Vite → localhost:3001)
 * En producción: usa la URL completa del backend en Render
 */

// Detectar si estamos en desarrollo o producción
const isDevelopment = import.meta.env.DEV || window.location.hostname === 'localhost'

// URL base del backend
// En desarrollo: usa '/api' (proxy de Vite → localhost:3001)
// En producción: usa VITE_API_URL de variables de entorno o fallback a URL por defecto
export const API_URL = isDevelopment 
  ? '/api'  // En desarrollo, usa el proxy de Vite
  : (import.meta.env.VITE_API_URL || 'https://imblascoasistentebackend.onrender.com/api')  // En producción, usa variable de entorno o fallback

console.log('🔗 API URL configurada:', API_URL)
