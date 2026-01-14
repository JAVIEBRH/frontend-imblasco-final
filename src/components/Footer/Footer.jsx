import { Link } from 'react-router-dom'

/**
 * FOOTER - MEDIDAS EXACTAS de imblasco.cl
 * Barra simple con copyright y enlaces
 */
const Footer = () => {
  return (
    <footer 
      style={{ 
        backgroundColor: 'rgba(9, 33, 67, 1)',
        padding: '20px 0'
      }}
    >
      <div style={{ maxWidth: '1222px', margin: '0 auto', padding: '0 15px' }}>
        <div 
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '15px'
          }}
        >
          <p 
            style={{
              fontFamily: '"Cabin", Arial, sans-serif',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.5)',
              margin: 0
            }}
          >
            Copyright © 2024{' '}
            <strong style={{ color: 'rgba(255,255,255,0.8)' }}>
              Importadora Blas y Compañia Ltda.
            </strong>
            {' - Diseñado por imblasco.cl'}
          </p>

          <div style={{ display: 'flex', gap: '25px' }}>
            <Link 
              to="/"
              className="footer-link"
              style={{
                fontFamily: '"Cabin", Arial, sans-serif',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.5)',
                textDecoration: 'none',
                transition: 'color 0.25s'
              }}
            >
              Tienda
            </Link>
            <Link 
              to="/"
              className="footer-link"
              style={{
                fontFamily: '"Cabin", Arial, sans-serif',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.5)',
                textDecoration: 'none',
                transition: 'color 0.25s'
              }}
            >
              Mi cuenta
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link:hover {
          color: rgb(244, 165, 28) !important;
        }
      `}</style>
    </footer>
  )
}

export default Footer
