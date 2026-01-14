/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores exactos de ImBlasco
        imblasco: {
          dark: '#1e1e2f',      // Header superior oscuro
          navy: '#2d2d44',      // Variante oscura
          orange: '#e8a83c',    // Botones naranjas/dorados
          'orange-hover': '#d4982f',
          blue: '#1e56a0',      // Azul del logo
          red: '#c41e3a',       // Rojo del logo
          gray: '#f5f5f5',      // Fondo gris claro
          'gray-dark': '#333',  // Texto oscuro
        },
        // Color WhatsApp
        whatsapp: {
          light: '#25D366',
          dark: '#128C7E',
          bg: '#ECE5DD',
          chat: '#DCF8C6',
        }
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-left': 'slideLeft 0.5s ease-out',
        'slide-right': 'slideRight 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

