import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * NUEVOS PRODUCTOS - MEDIDAS EXACTAS de imblasco.cl
 * Cards: 200px de ancho, imagen 160px de alto
 */
const NewProducts = () => {
  const [activeTab, setActiveTab] = useState(0)
  const scrollRef = useRef(null)

  // Imágenes locales desde public/images
  const IMG_BASE_URL = ''

  const tabs = ['Artículos Publicitarios', 'Trofeos y Premios']

  const products = {
    0: [
      { id: 'B85', name: 'Estuche Negro para llavero y bolígrafo B85', image: `${IMG_BASE_URL}/images/products/product1.jpg`, stock: 4563, badge: '17x7x2,8 cms' },
      { id: 'K78', name: 'Llavero Camión Minero Encobrizado K78', image: `${IMG_BASE_URL}/images/products/product2.jpg`, stock: 2589, badge: '51x38x2.5 mm' },
      { id: 'M79', name: 'Tazón Encobrizado Liso M79', image: `${IMG_BASE_URL}/images/products/product3.jpg`, stock: 1855, badge: 'Ø9,3x10x11,8 cms' },
      { id: 'K34', name: 'Llavero Metálico K34', image: `${IMG_BASE_URL}/images/products/product4.jpg`, stock: 0, llegada: true },
      { id: 'MAT04', name: 'Set de Mate MAT04', image: `${IMG_BASE_URL}/images/products/product5.jpg`, stock: 120 },
      { id: 'G06', name: 'Bolsa Reutilizable TNT G06', image: `${IMG_BASE_URL}/images/categories/belleza-salud.png`, badge: '30x38x8,5 cms', variants: [
        { color: 'AMARILLO', stock: 11712 },
        { color: 'BEIGE', stock: 3854 },
        { color: 'NARANJO', stock: 9311 },
        { color: 'VERDE', stock: 7797 },
      ]},
    ],
    1: [
      { id: 'CP-001', name: 'Copa Línea Clásica Dorada', image: `${IMG_BASE_URL}/images/categories/regalos-premium.png`, stock: 45 },
      { id: 'MED-01', name: 'Medalla Premium Oro', image: `${IMG_BASE_URL}/images/categories/linea-cobre.png`, stock: 500 },
      { id: 'GAL-05', name: 'Galvano Cristal Estrella', image: `${IMG_BASE_URL}/images/categories/sublimacion.png`, stock: 23 },
      { id: 'SET-V01', name: 'Set de Vino Premium', image: `${IMG_BASE_URL}/images/categories/linea-bamboo.png`, stock: 78 },
    ]
  }

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ 
        left: direction === 'left' ? -220 : 220, 
        behavior: 'smooth' 
      })
    }
  }

  return (
    <section style={{ backgroundColor: '#fff', padding: '45px 0' }}>
      <div style={{ maxWidth: '1222px', margin: '0 auto', padding: '0 15px' }}>
        <div style={{ 
          backgroundColor: '#f7f7f7',
          border: '1px solid #e8e8e8',
          padding: '30px 25px'
        }}>
          {/* Título */}
          <div style={{ textAlign: 'center', marginBottom: '25px' }}>
            <h2 style={{
              fontFamily: '"Cabin", Arial, sans-serif',
              fontSize: '18px',
              fontWeight: 600,
              color: '#242424',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              margin: '0 0 25px 0'
            }}>
              NUEVOS PRODUCTOS
            </h2>

            {/* Tabs */}
            <div style={{ 
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
              borderBottom: '1px solid #e5e5e5'
            }}>
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  style={{
                    fontFamily: '"Cabin", Arial, sans-serif',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: activeTab === i ? 'rgb(244, 165, 28)' : '#666',
                    textTransform: 'uppercase',
                    background: 'none',
                    border: 'none',
                    borderBottom: activeTab === i ? '3px solid rgb(244, 165, 28)' : '3px solid transparent',
                    padding: '0 5px 15px',
                    marginBottom: '-1px',
                    cursor: 'pointer',
                    transition: 'color 0.2s'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Carousel de productos */}
          <div style={{ position: 'relative', margin: '0 -5px' }}>
            {/* Botón izquierdo */}
            <button 
              onClick={() => scroll('left')}
              style={{
                position: 'absolute',
                left: '-15px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                background: '#fff',
                border: '1px solid #ddd',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'box-shadow 0.2s'
              }}
              className="scroll-btn"
            >
              <ChevronLeft size={20} color="#333" />
            </button>

            {/* Contenedor de productos */}
            <div 
              ref={scrollRef}
              style={{ 
                display: 'flex', 
                gap: '15px', 
                overflowX: 'auto', 
                scrollbarWidth: 'none',
                padding: '10px 5px',
                margin: '0 10px'
              }}
            >
              {products[activeTab]?.map((p) => (
                <div
                  key={p.id}
                  className="product-card"
                  style={{
                    flexShrink: 0,
                    width: '200px',
                    backgroundColor: '#fff',
                    border: '1px solid #eee',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    transition: 'box-shadow 0.3s'
                  }}
                >
                  {/* Badge de medidas */}
                  {p.badge && (
                    <div style={{
                      backgroundColor: 'rgba(9, 33, 67, 1)',
                      color: '#fff',
                      textAlign: 'center',
                      padding: '6px 8px',
                      fontFamily: '"Cabin", Arial, sans-serif',
                      fontSize: '11px',
                      fontWeight: 600
                    }}>
                      {p.badge}
                    </div>
                  )}
                  
                  {/* Badge de próxima llegada */}
                  {p.llegada && (
                    <div style={{
                      backgroundColor: 'rgb(244, 165, 28)',
                      color: '#fff',
                      textAlign: 'center',
                      padding: '8px',
                      fontFamily: '"Cabin", Arial, sans-serif',
                      fontSize: '10px',
                      fontWeight: 700,
                      textTransform: 'uppercase'
                    }}>
                      PRÓXIMA LLEGADA
                    </div>
                  )}

                  {/* Imagen del producto */}
                  <div style={{ 
                    height: '160px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    padding: '15px',
                    backgroundColor: '#fff'
                  }}>
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '100%', 
                        objectFit: 'contain' 
                      }} 
                    />
                  </div>

                  {/* Info del producto */}
                  <div style={{ padding: '12px 15px', textAlign: 'center' }}>
                    <h3 style={{ 
                      fontFamily: '"Cabin", Arial, sans-serif', 
                      fontSize: '13px', 
                      fontWeight: 600, 
                      color: '#333', 
                      marginBottom: '10px', 
                      minHeight: '36px', 
                      lineHeight: 1.35,
                      margin: '0 0 10px 0'
                    }}>
                      {p.name}
                    </h3>
                    
                    <p style={{ 
                      fontFamily: '"Cabin", Arial, sans-serif', 
                      fontSize: '12px', 
                      color: 'rgb(244, 165, 28)', 
                      marginBottom: '12px',
                      margin: '0 0 12px 0'
                    }}>
                      Inicia sesión para ver el precio
                    </p>

                    {/* Variantes o Stock */}
                    {p.variants ? (
                      <table style={{ width: '100%', fontSize: '10px', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ color: '#333', fontWeight: 600 }}>
                            <td style={{ textAlign: 'left', padding: '2px 0' }}>Color</td>
                            <td style={{ textAlign: 'right', padding: '2px 0' }}>Stock</td>
                          </tr>
                        </thead>
                        <tbody style={{ color: '#666' }}>
                          {p.variants.slice(0, 4).map((v, i) => (
                            <tr key={i}>
                              <td style={{ textAlign: 'left', padding: '2px 0' }}>{v.color}</td>
                              <td style={{ textAlign: 'right', padding: '2px 0' }}>{v.stock.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div style={{ 
                        display: 'inline-block', 
                        backgroundColor: 'rgba(9, 33, 67, 1)', 
                        color: '#fff', 
                        padding: '5px 15px', 
                        fontFamily: '"Cabin", Arial, sans-serif', 
                        fontSize: '11px', 
                        fontWeight: 600 
                      }}>
                        Stock: {p.stock?.toLocaleString() || '0'}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Botón derecho */}
            <button 
              onClick={() => scroll('right')}
              style={{
                position: 'absolute',
                right: '-15px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                background: '#fff',
                border: '1px solid #ddd',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'box-shadow 0.2s'
              }}
              className="scroll-btn"
            >
              <ChevronRight size={20} color="#333" />
            </button>
          </div>

          {/* Nota */}
          <p style={{ 
            textAlign: 'center', 
            fontFamily: '"Cabin", Arial, sans-serif', 
            fontSize: '12px', 
            color: '#888', 
            fontStyle: 'italic', 
            marginTop: '25px',
            margin: '25px 0 0 0'
          }}>
            Este producto tiene múltiples variantes. Las opciones se pueden elegir en la página de producto
          </p>
        </div>
      </div>

      <style>{`
        div::-webkit-scrollbar { display: none; }
        .product-card:hover { 
          box-shadow: 0 8px 25px rgba(0,0,0,0.12) !important; 
        }
        .scroll-btn:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
        }
      `}</style>
    </section>
  )
}

export default NewProducts
