# ImBlasco Frontend

Frontend del sistema B2B de ImBlasco - Clon del sitio web + Chat de pedidos.

## 🚀 Inicio Rápido

```bash
npm install
npm run dev
```

El frontend estará disponible en: **http://localhost:5173**

## 📦 Tecnologías

- **React 18** - Framework UI
- **Vite** - Build tool
- **TailwindCSS** - Estilos
- **React Router DOM** - Routing
- **Lucide React** - Iconos

## 🔧 Configuración

El frontend está configurado para conectarse al backend en:
- **Backend URL**: http://localhost:3001
- **Proxy**: Configurado en `vite.config.js` para rutas `/api/*`

## 📁 Estructura

```
src/
├── components/     # Componentes React
│   ├── Header/     # Header de la página
│   ├── Footer/     # Footer
│   ├── B2BChat/    # Chat B2B
│   ├── Auth/       # Autenticación
│   └── ...
├── pages/          # Páginas/rutas
│   ├── Home.jsx
│   ├── Catalogos.jsx
│   └── ...
├── styles/         # Estilos globales
└── config/         # Configuración
```

## 🎯 Funcionalidades

- ✅ Clon 100% del sitio web ImBlasco
- ✅ Chat B2B integrado para pedidos automatizados
- ✅ Autenticación de usuarios
- ✅ Gestión de carrito en tiempo real
- ✅ Páginas internas (catálogos, despachos, descargas, etc.)
- ✅ Diseño responsive

## 📝 Scripts Disponibles

```bash
npm run dev      # Desarrollo (http://localhost:5173)
npm run build    # Build para producción
npm run preview  # Preview del build
```

## 🔗 Conexión con Backend

El frontend se comunica con el backend mediante:
- **API REST**: Todas las peticiones a `/api/*` se proxean a `http://localhost:3001`
- **Configuración**: Ver `vite.config.js`

## 🎨 Estilos

- **TailwindCSS**: Utilidades CSS
- **CSS Variables**: Colores y temas personalizados
- **Responsive**: Mobile-first design

---

**Para iniciar el backend:** Ve a `../imblasco-backend`






