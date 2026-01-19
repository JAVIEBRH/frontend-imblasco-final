import TopHeader from '../components/Header/TopHeader'
import MainHeader from '../components/Header/MainHeader'
import Navigation from '../components/Header/Navigation'
import Footer from '../components/Footer/Footer'
import { Truck, MapPin, Clock, AlertCircle } from 'lucide-react'

/**
 * Página de Despachos - COPIA EXACTA de imblasco.cl/despachos/
 */
const Despachos = ({ onLoginClick }) => {
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
              Despachos
            </h1>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
              <a href="/" style={{ color: 'rgba(255,255,255,0.7)' }}>Inicio</a>
              <span style={{ margin: '0 8px' }}>»</span>
              <span style={{ color: '#f4a51c' }}>Despachos</span>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="max-w-[1222px] mx-auto px-4 py-12">
          <div className="bg-white p-8" style={{ border: '1px solid #e5e5e5' }}>
            
            {/* Título sección */}
            <div className="flex items-center gap-4 mb-8">
              <Truck size={40} style={{ color: '#f4a51c' }} />
              <h2 
                style={{ 
                  fontFamily: '"Cabin", Arial, sans-serif',
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#242424'
                }}
              >
                Información de Despachos
              </h2>
            </div>

            {/* Grid de información */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Despacho Santiago */}
              <div className="p-6" style={{ backgroundColor: '#f7f7f7', borderLeft: '4px solid #f4a51c' }}>
                <h3 
                  className="flex items-center gap-2 mb-4"
                  style={{ 
                    fontFamily: '"Cabin", Arial, sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#333'
                  }}
                >
                  <MapPin size={20} style={{ color: '#f4a51c' }} />
                  DESPACHO SANTIAGO
                </h3>
                <ul style={{ fontSize: '14px', color: '#666', lineHeight: 2 }}>
                  <li>• Despacho el mismo día para pedidos antes de las 12:00 hrs.</li>
                  <li>• Despacho al día siguiente para pedidos después de las 12:00 hrs.</li>
                  <li>• Valor del despacho según comuna de destino.</li>
                  <li>• Pedidos sobre $150.000 neto: despacho gratis en Santiago.</li>
                </ul>
              </div>

              {/* Despacho Región */}
              <div className="p-6" style={{ backgroundColor: '#f7f7f7', borderLeft: '4px solid #1e1e2f' }}>
                <h3 
                  className="flex items-center gap-2 mb-4"
                  style={{ 
                    fontFamily: '"Cabin", Arial, sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#333'
                  }}
                >
                  <Truck size={20} style={{ color: '#1e1e2f' }} />
                  DESPACHO REGIÓN
                </h3>
                <ul style={{ fontSize: '14px', color: '#666', lineHeight: 2 }}>
                  <li>• Realizamos envíos a través de diversos medios de transporte.</li>
                  <li>• <strong style={{ color: '#c41e3a' }}>No trabajamos con Chilexpress, Correos de Chile, Blue Express.</strong></li>
                  <li>• Los días establecidos para el despacho son martes y jueves.</li>
                  <li>• En otros días el envío es posible pero no se garantiza.</li>
                  <li>• La mercancía transportada viaja a costo y riesgo del cliente.</li>
                </ul>
              </div>

              {/* Horarios */}
              <div className="p-6" style={{ backgroundColor: '#f7f7f7', borderLeft: '4px solid #059669' }}>
                <h3 
                  className="flex items-center gap-2 mb-4"
                  style={{ 
                    fontFamily: '"Cabin", Arial, sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#333'
                  }}
                >
                  <Clock size={20} style={{ color: '#059669' }} />
                  HORARIOS DE ATENCIÓN
                </h3>
                <ul style={{ fontSize: '14px', color: '#666', lineHeight: 2 }}>
                  <li><strong>Lunes a Viernes:</strong></li>
                  <li>• 9:00 a 14:00 hrs</li>
                  <li>• 15:30 a 19:00 hrs</li>
                  <li><strong>Sábados:</strong></li>
                  <li>• 10:00 a 13:00 hrs</li>
                </ul>
              </div>

              {/* Importante */}
              <div className="p-6" style={{ backgroundColor: '#fef3cd', borderLeft: '4px solid #f4a51c' }}>
                <h3 
                  className="flex items-center gap-2 mb-4"
                  style={{ 
                    fontFamily: '"Cabin", Arial, sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#333'
                  }}
                >
                  <AlertCircle size={20} style={{ color: '#f4a51c' }} />
                  IMPORTANTE
                </h3>
                <ul style={{ fontSize: '14px', color: '#666', lineHeight: 2 }}>
                  <li>• Los precios no incluyen IVA ni despacho.</li>
                  <li>• Precios sujetos a cambio sin previo aviso.</li>
                  <li>• Stock sujeto a disponibilidad.</li>
                  <li>• Fotos referenciales, pueden variar del producto real.</li>
                </ul>
              </div>
            </div>

            {/* Dirección */}
            <div className="mt-8 p-6 text-center" style={{ backgroundColor: '#1e1e2f' }}>
              <p style={{ color: '#fff', fontSize: '16px', marginBottom: '8px' }}>
                <strong>Dirección Casa Matriz:</strong>
              </p>
              <p style={{ color: '#f4a51c', fontSize: '18px', fontWeight: 600 }}>
                Álvarez de Toledo 981, San Miguel, Santiago
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Despachos

