/**
 * Utilidades para manejo de imágenes
 * Intenta cargar desde múltiples fuentes
 */

/**
 * Obtener URL de imagen con fallback
 * @param {string} imagePath - Ruta relativa de la imagen
 * @returns {string} URL completa
 */
export function getImageUrl(imagePath) {
  // Intentar desde el sitio original primero
  const originalUrl = `https://www.imblasco.cl${imagePath}`
  
  // Si está en desarrollo, también intentar local
  if (import.meta.env.DEV) {
    // En desarrollo, Vite sirve desde public/
    return imagePath.startsWith('/') ? imagePath : `/${imagePath}`
  }
  
  return originalUrl
}

/**
 * URLs conocidas del sitio original
 */
export const IMAGE_URLS = {
  // Slides - URLs alternativas comunes
  slides: {
    slide1: [
      'https://www.imblasco.cl/images/slides/slide1.jpg',
      'https://www.imblasco.cl/wp-content/uploads/slides/slide1.jpg',
      'https://imblasco.cl/images/slides/slide1.jpg'
    ],
    slide2: [
      'https://www.imblasco.cl/images/slides/slide2.png',
      'https://www.imblasco.cl/wp-content/uploads/slides/slide2.png',
      'https://imblasco.cl/images/slides/slide2.png'
    ],
    slide3: [
      'https://www.imblasco.cl/images/slides/slide3.jpg',
      'https://www.imblasco.cl/wp-content/uploads/slides/slide3.jpg',
      'https://imblasco.cl/images/slides/slide3.jpg'
    ],
    slide4: [
      'https://www.imblasco.cl/images/slides/slide4.jpg',
      'https://www.imblasco.cl/wp-content/uploads/slides/slide4.jpg',
      'https://imblasco.cl/images/slides/slide4.jpg'
    ],
    slide5: [
      'https://www.imblasco.cl/images/slides/slide5.jpg',
      'https://www.imblasco.cl/wp-content/uploads/slides/slide5.jpg',
      'https://imblasco.cl/images/slides/slide5.jpg'
    ]
  },
  
  // Logo
  logo: [
    'https://www.imblasco.cl/images/logo.png',
    'https://www.imblasco.cl/wp-content/themes/imblasco/images/logo.png',
    'https://imblasco.cl/images/logo.png'
  ]
}

/**
 * Obtener URL de imagen con múltiples fallbacks
 * @param {string} type - Tipo: 'slide', 'product', 'category', 'logo'
 * @param {string} name - Nombre del archivo
 * @returns {string} Primera URL disponible
 */
export function getImageWithFallback(type, name) {
  const baseUrl = 'https://www.imblasco.cl'
  
  // Rutas comunes
  const paths = [
    `/images/${type}s/${name}`,
    `/wp-content/uploads/${type}s/${name}`,
    `/wp-content/themes/imblasco/images/${type}s/${name}`,
    `/images/${name}`,
    `/wp-content/uploads/${name}`
  ]
  
  // Retornar primera URL (el navegador manejará el fallback con onError)
  return `${baseUrl}${paths[0]}`
}


