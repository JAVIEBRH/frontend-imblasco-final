import { Search, ChevronDown, User } from 'lucide-react'
import { Link } from 'react-router-dom'

/**
 * HEADER PRINCIPAL - MEDIDAS EXACTAS de imblasco.cl
 * Altura: 105px
 * Fondo: rgba(9, 33, 67, 1)
 */
const MainHeader = ({ onLoginClick }) => {
  return (
    <div 
      style={{ 
        backgroundColor: 'rgba(9, 33, 67, 1)',
        height: '105px'
      }}
    >
      <div style={{ maxWidth: '1222px', margin: '0 auto', padding: '0 15px', height: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
          
          {/* LOGO */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <img 
              src="/images/logo.png" 
              alt="ImBlasco"
              style={{ 
                width: '70px',
                height: 'auto'
              }}
            />
          </Link>

          {/* BARRA DE BÚSQUEDA */}
          <div style={{ flex: 1, maxWidth: '600px', margin: '0 40px' }}>
            <form 
              style={{ 
                display: 'flex',
                height: '42px',
                borderRadius: '35px',
                overflow: 'hidden',
                backgroundColor: '#fff'
              }}
            >
              <input 
                type="text"
                placeholder="Buscar productos"
                style={{
                  flex: 1,
                  padding: '0 18px',
                  border: 'none',
                  outline: 'none',
                  fontFamily: '"Cabin", Arial, sans-serif',
                  fontSize: '14px',
                  color: '#666',
                  backgroundColor: 'transparent'
                }}
              />
              
              {/* Selector de categoría */}
              <div 
                style={{ 
                  position: 'relative',
                  borderLeft: '1px solid rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <select 
                  style={{
                    height: '100%',
                    padding: '0 32px 0 15px',
                    border: 'none',
                    outline: 'none',
                    appearance: 'none',
                    backgroundColor: 'transparent',
                    fontFamily: '"Cabin", Arial, sans-serif',
                    fontSize: '12px',
                    color: '#666',
                    cursor: 'pointer',
                    minWidth: '160px',
                    textTransform: 'uppercase'
                  }}
                >
                  <option>SELECCIONAR CATE...</option>
                  <option>Artículos Publicitarios</option>
                  <option>Trofeos y Premios</option>
                  <option>Línea Cobre</option>
                  <option>Línea Bamboo</option>
                </select>
                <ChevronDown 
                  size={14} 
                  style={{ 
                    position: 'absolute', 
                    right: '12px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: '#999',
                    pointerEvents: 'none'
                  }}
                />
              </div>

              {/* Botón buscar */}
              <button 
                type="submit"
                className="search-btn"
                style={{
                  padding: '0 18px',
                  backgroundColor: 'rgb(244, 165, 28)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '0 35px 35px 0',
                  transition: 'background-color 0.25s'
                }}
              >
                <Search size={18} color="#fff" strokeWidth={2.5} />
              </button>
            </form>
          </div>

          {/* ACCESO / REGISTRO */}
          <button 
            onClick={onLoginClick}
            className="login-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '10px 0'
            }}
          >
            <User size={18} color="#fff" strokeWidth={1.5} />
            <span style={{
              fontFamily: '"Lato", Arial, sans-serif',
              fontSize: '13px',
              fontWeight: 700,
              color: '#fff',
              textTransform: 'uppercase',
              letterSpacing: '0.3px'
            }}>
              ACCESO / REGISTRO
            </span>
          </button>
        </div>
      </div>

      <style>{`
        .search-btn:hover {
          background-color: rgb(222, 150, 26) !important;
        }
        .login-btn:hover span {
          color: rgb(244, 165, 28);
        }
        .login-btn:hover svg {
          stroke: rgb(244, 165, 28);
        }
      `}</style>
    </div>
  )
}

export default MainHeader
