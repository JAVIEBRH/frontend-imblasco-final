import TopHeader from '../components/Header/TopHeader'
import MainHeader from '../components/Header/MainHeader'
import Navigation from '../components/Header/Navigation'
import Footer from '../components/Footer/Footer'
import { Download, FileText, Image, File } from 'lucide-react'

/**
 * Página de Descargas - COPIA EXACTA de imblasco.cl/descargas/
 */
const Descargas = ({ onLoginClick }) => {
  const descargas = [
    {
      id: 1,
      title: 'Catálogo Artículos Publicitarios 2024',
      type: 'PDF',
      size: '15.2 MB',
      icon: FileText
    },
    {
      id: 2,
      title: 'Catálogo Trofeos y Premios 2024',
      type: 'PDF',
      size: '12.8 MB',
      icon: FileText
    },
    {
      id: 3,
      title: 'Catálogo Línea Cobre',
      type: 'PDF',
      size: '8.5 MB',
      icon: FileText
    },
    {
      id: 4,
      title: 'Catálogo Línea Bamboo',
      type: 'PDF',
      size: '6.2 MB',
      icon: FileText
    },
    {
      id: 5,
      title: 'Lista de Precios Actualizada',
      type: 'Excel',
      size: '2.1 MB',
      icon: File
    },
    {
      id: 6,
      title: 'Imágenes de Productos (Pack)',
      type: 'ZIP',
      size: '45.3 MB',
      icon: Image
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
            <h1 
              style={{ 
                fontFamily: '"Cabin", Arial, sans-serif',
                fontSize: '32px',
                fontWeight: 600,
                color: '#fff',
                marginBottom: '10px'
              }}
            >
              Descargas
            </h1>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
              <a href="/" style={{ color: 'rgba(255,255,255,0.7)' }}>Inicio</a>
              <span style={{ margin: '0 8px' }}>»</span>
              <span style={{ color: '#f4a51c' }}>Descargas</span>
            </div>
          </div>
        </div>

        {/* Lista de descargas */}
        <div className="max-w-[1222px] mx-auto px-4 py-12">
          <div className="bg-white" style={{ border: '1px solid #e5e5e5' }}>
            {descargas.map((descarga, idx) => (
              <div 
                key={descarga.id}
                className="flex items-center justify-between p-6"
                style={{ 
                  borderBottom: idx < descargas.length - 1 ? '1px solid #e5e5e5' : 'none'
                }}
              >
                {/* Info */}
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 flex items-center justify-center"
                    style={{ backgroundColor: '#f7f7f7', borderRadius: '8px' }}
                  >
                    <descarga.icon size={24} style={{ color: '#f4a51c' }} />
                  </div>
                  <div>
                    <h3 
                      style={{ 
                        fontFamily: '"Cabin", Arial, sans-serif',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#333',
                        marginBottom: '4px'
                      }}
                    >
                      {descarga.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#777' }}>
                      {descarga.type} • {descarga.size}
                    </p>
                  </div>
                </div>

                {/* Botón descarga */}
                <a 
                  href="#"
                  className="flex items-center gap-2 px-6 py-3 transition-colors hover:opacity-90"
                  style={{ 
                    backgroundColor: '#f4a51c',
                    color: '#fff',
                    fontFamily: '"Lato", Arial, sans-serif',
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    borderRadius: '35px'
                  }}
                >
                  <Download size={16} />
                  DESCARGAR
                </a>
              </div>
            ))}
          </div>

          {/* Nota */}
          <div 
            className="mt-8 p-6 text-center"
            style={{ backgroundColor: '#fff', border: '1px solid #e5e5e5' }}
          >
            <p style={{ fontSize: '14px', color: '#666' }}>
              Si tiene problemas para descargar algún archivo, por favor contáctenos a{' '}
              <a href="mailto:ventas@imblasco.cl" style={{ color: '#f4a51c', fontWeight: 600 }}>
                ventas@imblasco.cl
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Descargas

