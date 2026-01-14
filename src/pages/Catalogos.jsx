import { Link } from 'react-router-dom'
import { Download, ExternalLink } from 'lucide-react'

/**
 * Página de Catálogos - 100% IDÉNTICO a imblasco.cl/catalogos/
 * Con enlaces reales a los PDFs del sitio original
 */
const Catalogos = () => {
  // Usar imágenes locales
  const IMG_BASE_URL = ''
  
  const catalogos = [
    {
      id: 1,
      title: 'Catálogo Artículos Publicitarios 2024-2025',
      image: `${IMG_BASE_URL}/images/categories/regalos-premium.png`,
      // URLs reales de imblasco.cl
      pdfUrl: 'https://imblasco.cl/wp-content/uploads/2024/11/catalogo_publicitarios_2024-2025.pdf',
      webUrl: 'https://online.fliphtml5.com/tzbma/djgz/'
    },
    {
      id: 2,
      title: 'Catálogo Trofeos y Premios 2024-2025',
      image: `${IMG_BASE_URL}/images/categories/linea-cobre.png`,
      // URL real confirmada
      pdfUrl: 'https://imblasco.cl/wp-content/uploads/2024/11/catalogo_trofeos_2024-2025.pdf',
      webUrl: 'https://online.fliphtml5.com/tzbma/pnwt/'
    },
    {
      id: 3,
      title: 'Catálogo Línea Cobre 2024-2025',
      image: `${IMG_BASE_URL}/images/categories/linea-bamboo.png`,
      pdfUrl: 'https://imblasco.cl/wp-content/uploads/2024/11/catalogo_linea_cobre_2024-2025.pdf',
      webUrl: 'https://online.fliphtml5.com/tzbma/kxjc/'
    },
  ]

  const infoSections = [
    {
      title: 'DESPACHO REGIÓN',
      items: [
        'Realizamos envíos a través de diversos medios de transporte.',
        'No trabajamos con Chilexpress, Correos de Chile, Blue Express.',
        'Los días establecidos para el despacho son martes y jueves; en otros días, el envío es posible, pero no se garantiza.',
        'La mercancía transportada viaja a costo y riesgo del cliente.'
      ]
    },
    {
      title: 'CÓMO REALIZAR UN PEDIDO (CLIENTE SANTIAGO)',
      items: [
        'En primer lugar, le recomendamos solicitar una cuenta para consultar precios y disponibilidad de stock a través de nuestro sitio web, haciendo clic en el siguiente enlace.',
        'Si aún no es cliente de nuestra empresa, le solicitamos que envíe los datos de su empresa a la dirección de correo electrónico ventas@imblasco.cl para poder ingresarlo en nuestro sistema. Los datos requeridos son: RUT, razón social, giro, dirección y comuna.',
        'Si ya es cliente de nuestra empresa, le pedimos que envíe un correo a ventas@imblasco.cl, incluyendo su RUT de compra y los detalles de lo que necesita cotizar.'
      ]
    },
    {
      title: 'CÓMO REALIZAR UN PEDIDO (CLIENTE REGIÓN)',
      items: [
        'En primer lugar, le recomendamos solicitar una cuenta para consultar precios y disponibilidad de stock a través de nuestro sitio web.',
        'Si aún no es cliente de nuestra empresa, le solicitamos que envíe los datos de su empresa a ventas@imblasco.cl. En caso de que necesite despacho, le pedimos que indique el nombre de la empresa de transporte.',
        'Si ya es cliente, le solicitamos que envíe un correo a ventas@imblasco.cl, incluyendo su RUT de compra y los detalles de lo que necesita cotizar.'
      ]
    },
    {
      title: 'CÓMO RETIRAR UN PEDIDO',
      items: [
        'Si cuenta con una cotización debidamente elaborada y ha realizado el pago mediante transferencia bancaria, podrá proceder a retirar su pedido en nuestra casa matriz, ubicada en Álvarez de Toledo 981, San Miguel.',
        'Al momento de realizar el retiro, se le solicitará presentar el RUT de compra y/o el número de nota de venta.',
        'HORARIO DE ATENCIÓN',
        'Lunes a viernes de 9:42 a 14:00 hrs y de 15:30 a 19:00 hrs. Sábados de 10:00 a 13:00 hrs.'
      ]
    }
  ]

  // Función para descargar PDF
  const handleDownloadPDF = (url, title) => {
    // Abrir en nueva pestaña para descarga
    window.open(url, '_blank')
  }

  return (
    <main style={{ backgroundColor: '#fff' }}>
      {/* Título de página con breadcrumb */}
      <div 
        style={{ 
          backgroundColor: 'rgba(9, 33, 67, 1)',
          padding: '35px 0'
        }}
      >
        <div style={{ maxWidth: '1222px', margin: '0 auto', padding: '0 15px' }}>
          <h1 
            style={{ 
              fontFamily: '"Cabin", Arial, sans-serif',
              fontSize: '28px',
              fontWeight: 600,
              color: '#fff',
              margin: '0 0 8px 0'
            }}
          >
            Catálogos
          </h1>
          <div style={{ fontSize: '13px' }}>
            <Link 
              to="/" 
              style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}
            >
              Inicio
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.5)', margin: '0 8px' }}>»</span>
            <span style={{ color: 'rgb(244, 165, 28)' }}>Catálogos</span>
          </div>
        </div>
      </div>

      {/* Grid de catálogos */}
      <div style={{ backgroundColor: '#f7f7f7', padding: '40px 0' }}>
        <div style={{ maxWidth: '1222px', margin: '0 auto', padding: '0 15px' }}>
          <div 
            style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '25px'
            }}
          >
            {catalogos.map((catalogo) => (
              <div 
                key={catalogo.id}
                style={{ 
                  backgroundColor: '#fff',
                  border: '1px solid #e5e5e5',
                  overflow: 'hidden'
                }}
              >
                {/* Imagen del catálogo */}
                <div 
                  style={{ 
                    height: '280px',
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                  }}
                >
                  <img 
                    src={catalogo.image}
                    alt={catalogo.title}
                    style={{ 
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </div>
                
                {/* Botones */}
                <div 
                  style={{ 
                    padding: '15px',
                    display: 'flex',
                    gap: '10px'
                  }}
                >
                  {/* Botón DESCARGA PDF - Funcional */}
                  <a 
                    href={catalogo.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    style={{ 
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '12px 15px',
                      backgroundColor: 'rgb(244, 165, 28)',
                      color: '#fff',
                      fontFamily: '"Lato", Arial, sans-serif',
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      borderRadius: '35px',
                      transition: 'background-color 0.2s',
                      cursor: 'pointer'
                    }}
                    className="btn-pdf"
                  >
                    <Download size={14} />
                    DESCARGA PDF
                  </a>
                  
                  {/* Botón VISTA WEB - Abre flipbook */}
                  <a 
                    href={catalogo.webUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '12px 15px',
                      backgroundColor: 'rgba(9, 33, 67, 1)',
                      color: '#fff',
                      fontFamily: '"Lato", Arial, sans-serif',
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      borderRadius: '35px',
                      transition: 'background-color 0.2s',
                      cursor: 'pointer'
                    }}
                    className="btn-web"
                  >
                    <ExternalLink size={14} />
                    VISTA WEB
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secciones de información */}
      <div 
        style={{ 
          backgroundColor: '#fff',
          borderTop: '1px solid rgba(0,0,0,0.08)',
          padding: '40px 0'
        }}
      >
        <div style={{ maxWidth: '1222px', margin: '0 auto', padding: '0 15px' }}>
          <div 
            style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '30px'
            }}
          >
            {infoSections.map((section, idx) => (
              <div key={idx}>
                <h3 
                  style={{
                    fontFamily: '"Cabin", Arial, sans-serif',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#333',
                    textTransform: 'uppercase',
                    marginBottom: '15px',
                    lineHeight: 1.4
                  }}
                >
                  {section.title}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {section.items.map((item, itemIdx) => (
                    <li 
                      key={itemIdx}
                      style={{
                        position: 'relative',
                        paddingLeft: '12px',
                        fontFamily: '"Cabin", Arial, sans-serif',
                        fontSize: '12px',
                        color: '#777',
                        lineHeight: 1.8,
                        marginBottom: '5px'
                      }}
                    >
                      <span 
                        style={{
                          position: 'absolute',
                          left: 0,
                          color: 'rgb(244, 165, 28)'
                        }}
                      >
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .btn-pdf:hover {
          background-color: rgb(222, 150, 26) !important;
        }
        .btn-web:hover {
          background-color: rgba(20, 50, 90, 1) !important;
        }
        @media (max-width: 1024px) {
          main > div:nth-child(2) > div > div {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          main > div:nth-child(3) > div > div {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          main > div:nth-child(2) > div > div {
            grid-template-columns: 1fr !important;
          }
          main > div:nth-child(3) > div > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}

export default Catalogos
