import { Facebook } from 'lucide-react'
import { Link } from 'react-router-dom'

/**
 * TOP BAR - MEDIDAS EXACTAS de imblasco.cl
 * Altura: 41px
 * Fondo: rgba(9, 33, 67, 1)
 * Border: rgba(58, 77, 105, 1)
 */
const TopHeader = () => {
  return (
    <header 
      style={{ 
        backgroundColor: 'rgba(9, 33, 67, 1)',
        borderBottom: '1px solid rgba(58, 77, 105, 1)',
        height: '41px'
      }}
    >
      <div style={{ maxWidth: '1222px', margin: '0 auto', padding: '0 15px', height: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
          
          {/* Navegación izquierda */}
          <nav style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Link to="/despachos" className="topbar-link">DESPACHOS</Link>
            <Link to="/descargas" className="topbar-link">DESCARGAS</Link>
            <Link to="/catalogos" className="topbar-link">CATÁLOGOS</Link>
            <Link to="/politicas-comerciales" className="topbar-link">POLÍTICA COMERCIAL</Link>
            <Link 
              to="/articulos-de-pesca" 
              className="topbar-btn-pesca"
            >
              ARTÍCULOS DE PESCA
            </Link>
          </nav>

          {/* Derecha - Contacto y social */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', height: '100%' }}>
            <span style={{ 
              fontFamily: '"Cabin", Arial, sans-serif',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.8)',
              letterSpacing: '0.2px'
            }}>
              ventas@imblasco.cl | 225443327 - 225443382 - 225440418
            </span>
            
            <a 
              href="https://www.facebook.com/imblasco" 
              target="_blank" 
              rel="noopener noreferrer"
              className="topbar-social"
            >
              <Facebook size={16} />
            </a>
            
            <span style={{ width: '1px', height: '16px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
            
            <button className="topbar-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 10px' }}>
              CONTÁCTANOS
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .topbar-link {
          font-family: "Lato", Arial, sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          padding: 0 12px;
          height: 41px;
          display: flex;
          align-items: center;
          text-transform: uppercase;
          transition: color 0.25s;
          letter-spacing: 0.3px;
        }
        .topbar-link:hover {
          color: rgb(244, 165, 28);
        }
        .topbar-btn-pesca {
          background-color: #bf3b32;
          color: #fff;
          font-family: "Lato", Arial, sans-serif;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          padding: 0 16px;
          height: 41px;
          display: flex;
          align-items: center;
          text-decoration: none;
          margin-left: 5px;
          transition: background-color 0.25s;
          letter-spacing: 0.3px;
        }
        .topbar-btn-pesca:hover {
          background-color: #a32f28;
          color: #fff;
        }
        .topbar-social {
          color: rgba(255,255,255,0.7);
          display: flex;
          align-items: center;
          transition: color 0.25s;
        }
        .topbar-social:hover {
          color: #fff;
        }
      `}</style>
    </header>
  )
}

export default TopHeader
