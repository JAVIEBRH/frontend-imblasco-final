/**
 * Configuración centralizada de la API
 * 
 * En desarrollo: usa '/api' (proxy de Vite → localhost:3001)
 * En producción: usa la URL completa del backend en Render
 */

// Detectar si estamos en desarrollo o producción
const isDevelopment = import.meta.env.DEV || window.location.hostname === 'localhost'

// URL base del backend
export const API_URL = isDevelopment 
  ? '/api'  // En desarrollo, usa el proxy de Vite
  : 'https://imblascoasistentebackend.onrender.com/api'  // En producción, usa Render

console.log('🔗 API URL configurada:', API_URL)
