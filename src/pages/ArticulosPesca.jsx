import TopHeader from '../components/Header/TopHeader'
import MainHeader from '../components/Header/MainHeader'
import Navigation from '../components/Header/Navigation'
import Footer from '../components/Footer/Footer'
import WhatsAppChat from '../components/WhatsAppChat/WhatsAppChat'
import { Fish, ShoppingCart } from 'lucide-react'

/**
 * Página de Artículos de Pesca - COPIA EXACTA de imblasco.cl/articulos-de-pesca/
 */
const ArticulosPesca = ({ onLoginClick }) => {
  const productos = [
    {
      id: 1,
      name: 'Caña de Pescar Telescópica 2.1m',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop',
      category: 'Cañas de Pescar',
      stock: 45
    },
    {
      id: 2,
      name: 'Carrete de Pesca Spinning',
      image: 'https://images.unsplash.com/photo-1500463959177-e0869687df26?w=400&h=400&fit=crop',
      category: 'Carretes',
      stock: 32
    },
    {
      id: 3,
      name: 'Set de Anzuelos Variados (100 pcs)',
      image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=400&h=400&fit=crop',
      category: 'Anzuelos',
      stock: 120
    },
    {
      id: 4,
      name: 'Línea de Pesca Nylon 100m',
      image: 'https://images.unsplash.com/photo-1516220362602-dba5272034e7?w=400&h=400&fit=crop',
      category: 'Líneas',
      stock: 89
    },
    {
      id: 5,
      name: 'Señuelos Artificiales Pack x5',
      image: 'https://images.unsplash.com/photo-1544551763-8dd44758c2dd?w=400&h=400&fit=crop',
      category: 'Señuelos',
      stock: 67
    },
    {
      id: 6,
      name: 'Caja Organizadora de Pesca',
      image: 'https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=400&h=400&fit=crop',
      category: 'Accesorios',
      stock: 28
    },
    {
      id: 7,
      name: 'Red de Pesca Plegable',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop',
      category: 'Redes',
      stock: 15
    },
    {
      id: 8,
      name: 'Chaleco de Pesca Multibolsillos',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
      category: 'Vestimenta',
      stock: 22
    },
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopHeader />
      <MainHeader onLoginClick={onLoginClick} />
      <Navigation />

      {/* Contenido principal */}
      <main className="flex-1" style={{ backgroundColor: '#f7f7f7' }}>
        {/* Breadcrumb y título */}
        <div style={{ backgroundColor: '#1e1e2f', padding: '40px 0' }}>
          <div className="max-w-[1222px] mx-auto px-4">
            <div className="flex items-center gap-4">
              <Fish size={40} style={{ color: '#f4a51c' }} />
              <div>
                <h1 
                  style={{ 
                    fontFamily: '"Cabin", Arial, sans-serif',
                    fontSize: '32px',
                    fontWeight: 600,
                    color: '#fff',
                    marginBottom: '10px'
                  }}
                >
                  Artículos de Pesca
                </h1>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                  <a href="/" style={{ color: 'rgba(255,255,255,0.7)' }}>Inicio</a>
                  <span style={{ margin: '0 8px' }}>»</span>
                  <span style={{ color: '#f4a51c' }}>Artículos de Pesca</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de productos */}
        <div className="max-w-[1222px] mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productos.map((producto) => (
              <div 
                key={producto.id}
                className="bg-white overflow-hidden group"
                style={{ border: '1px solid #e5e5e5' }}
              >
                {/* Imagen */}
                <div className="relative" style={{ height: '200px', backgroundColor: '#f9f9f9' }}>
                  <img 
                    src={producto.image}
                    alt={producto.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Overlay hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button 
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#f4a51c] hover:text-white transition-all"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  {/* Categoría */}
                  <p 
                    className="mb-2"
                    style={{ fontSize: '11px', color: '#999', textTransform: 'uppercase' }}
                  >
                    {producto.category}
                  </p>
                  
                  {/* Nombre */}
                  <h3 
                    className="mb-3 line-clamp-2"
                    style={{ 
                      fontFamily: '"Cabin", Arial, sans-serif',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#333',
                      minHeight: '40px'
                    }}
                  >
                    {producto.name}
                  </h3>

                  {/* Precio */}
                  <p 
                    className="mb-3"
                    style={{ 
                      fontSize: '13px',
                      color: '#f4a51c',
                      fontWeight: 500
                    }}
                  >
                    Inicia sesión para ver el precio
                  </p>

                  {/* Stock */}
                  <div 
                    className="inline-block px-3 py-1"
                    style={{ 
                      backgroundColor: '#1e1e2f',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: 600
                    }}
                  >
                    STOCK: {producto.stock}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mensaje */}
          <div 
            className="mt-12 p-8 text-center bg-white"
            style={{ border: '1px solid #e5e5e5' }}
          >
            <Fish size={48} className="mx-auto mb-4" style={{ color: '#f4a51c' }} />
            <h3 
              className="mb-3"
              style={{ 
                fontFamily: '"Cabin", Arial, sans-serif',
                fontSize: '20px',
                fontWeight: 600,
                color: '#242424'
              }}
            >
              ¿Necesitas artículos de pesca al por mayor?
            </h3>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
              Contáctanos para obtener precios especiales y descuentos por volumen.
            </p>
            <a 
              href="mailto:ventas@imblasco.cl"
              className="inline-flex items-center gap-2 px-8 py-3"
              style={{ 
                backgroundColor: '#f4a51c',
                color: '#fff',
                fontFamily: '"Lato", Arial, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                textTransform: 'uppercase',
                borderRadius: '35px'
              }}
            >
              Contáctanos
            </a>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppChat />
    </div>
  )
}

export default ArticulosPesca

