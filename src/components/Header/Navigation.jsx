import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, ChevronDown, ChevronRight } from 'lucide-react'

/**
 * NAVEGACIÓN - MEDIDAS EXACTAS de imblasco.cl
 * Altura: 50px
 * Border: rgba(129, 129, 129, 0.2)
 */
const Navigation = () => {
  const [catOpen, setCatOpen] = useState(false)
  const location = useLocation()

  const categories = [
    { name: 'Novedades', sub: ['Novedades Publicitarios', 'Novedades Trofeos y Premios'] },
    { name: 'Artículos Publicitarios', sub: ['Accesorios-Herramientas', 'Tecnológicos', 'Bolígrafos-Lápices-Estuches', 'Botellas-Mugs-Tazones-Termos-Vasos'] },
    { name: 'Trofeos y Premios', sub: ['Copas y Torres', 'Trofeos', 'Medallas – Cintas – Sellos – Accesorios', 'Galvanos de Cristal'] },
    { name: 'Timbres Automáticos', sub: ['Timbres Rectangulares y Fechadores', 'Timbres Cuadrados y Redondos'] },
    { name: 'Bolsas Publicitarias' },
    { name: 'Productos para Sublimación' },
    { name: 'Línea Bamboo' },
    { name: 'Línea Cobre' },
    { name: 'Packaging', sub: ['Bolsas Papel Kraft', 'Sacos de Yute', 'Cajas de Cartón Autoarmables'] },
    { name: 'Set de Regalos' },
  ]

  const mainLinks = [
    { name: 'INICIO', path: '/' },
    { name: 'NUESTRA EMPRESA', path: '/nuestra-empresa' },
    { name: 'NUESTRO TALLER', path: '/nuestro-taller' },
    { name: 'TALLERES RECOMENDADOS', path: '/talleres-recomendados' },
    { name: 'TRANSPORTES RECOMENDADOS', path: '/transportes-recomendados' },
    { name: 'SOLICITUD DE CUENTA', path: '/solicitud-cuenta' },
  ]

  return (
    <nav 
      style={{ 
        backgroundColor: '#fff',
        borderBottom: '1px solid rgba(129, 129, 129, 0.2)',
        height: '50px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
    >
      <div style={{ maxWidth: '1222px', margin: '0 auto', padding: '0 15px', height: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          
          {/* Botón CATEGORÍAS */}
          <div 
            style={{ position: 'relative', height: '100%' }}
            onMouseEnter={() => setCatOpen(true)}
            onMouseLeave={() => setCatOpen(false)}
          >
            <button 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                height: '100%',
                padding: '0 20px',
                backgroundColor: '#fff',
                border: 'none',
                borderLeft: '1px solid rgba(129, 129, 129, 0.2)',
                borderRight: '1px solid rgba(129, 129, 129, 0.2)',
                cursor: 'pointer',
                fontFamily: '"Lato", Arial, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                color: '#333',
                textTransform: 'uppercase',
                letterSpacing: '0.3px'
              }}
            >
              <Menu size={18} color="#333" strokeWidth={2} />
              <span>CATEGORÍAS</span>
              <ChevronDown 
                size={14} 
                color="#333" 
                style={{ 
                  transition: 'transform 0.2s',
                  transform: catOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
              />
            </button>

            {/* Dropdown categorías */}
            {catOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                backgroundColor: '#fff',
                minWidth: '280px',
                boxShadow: '0 5px 25px rgba(0,0,0,0.12)',
                border: '1px solid rgba(0,0,0,0.08)',
                zIndex: 999
              }}>
                {categories.map((cat, i) => (
                  <div key={i} className="cat-dropdown-item" style={{ position: 'relative' }}>
                    <a 
                      href="#"
                      className="cat-link"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 20px',
                        borderBottom: '1px solid rgba(0,0,0,0.04)',
                        fontFamily: '"Cabin", Arial, sans-serif',
                        fontSize: '14px',
                        color: '#555',
                        textDecoration: 'none',
                        transition: 'all 0.2s'
                      }}
                    >
                      <span>{cat.name}</span>
                      {cat.sub && <ChevronRight size={14} color="#bbb" />}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Links de navegación */}
          <div style={{ display: 'flex', alignItems: 'center', height: '100%', marginLeft: '5px' }}>
            {mainLinks.map((link, i) => (
              <Link 
                key={i}
                to={link.path}
                className="nav-link"
                style={{
                  fontFamily: '"Lato", Arial, sans-serif',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: location.pathname === link.path ? 'rgb(244, 165, 28)' : '#333',
                  textTransform: 'uppercase',
                  padding: '0 14px',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  transition: 'color 0.25s',
                  letterSpacing: '0.2px'
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .nav-link:hover {
          color: rgb(244, 165, 28) !important;
        }
        .cat-link:hover {
          background-color: #f9f9f9;
          color: rgb(244, 165, 28);
        }
      `}</style>
    </nav>
  )
}

export default Navigation
