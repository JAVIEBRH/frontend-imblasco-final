import TopHeader from '../components/Header/TopHeader'
import MainHeader from '../components/Header/MainHeader'
import Navigation from '../components/Header/Navigation'
import Footer from '../components/Footer/Footer'
import WhatsAppChat from '../components/WhatsAppChat/WhatsAppChat'
import { Shield, CreditCard, Truck, Clock, AlertTriangle, CheckCircle } from 'lucide-react'

/**
 * Página de Políticas Comerciales - COPIA EXACTA de imblasco.cl/politicas-comerciales/
 */
const PoliticasComerciales = ({ onLoginClick }) => {
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
              Políticas Comerciales
            </h1>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
              <a href="/" style={{ color: 'rgba(255,255,255,0.7)' }}>Inicio</a>
              <span style={{ margin: '0 8px' }}>»</span>
              <span style={{ color: '#f4a51c' }}>Políticas Comerciales</span>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="max-w-[1222px] mx-auto px-4 py-12">
          
          {/* Grid de políticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* Formas de Pago */}
            <div className="bg-white p-6" style={{ border: '1px solid #e5e5e5' }}>
              <div className="flex items-center gap-3 mb-6">
                <CreditCard size={28} style={{ color: '#f4a51c' }} />
                <h2 
                  style={{ 
                    fontFamily: '"Cabin", Arial, sans-serif',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#242424'
                  }}
                >
                  FORMAS DE PAGO
                </h2>
              </div>
              <ul style={{ fontSize: '14px', color: '#666', lineHeight: 2 }}>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{ color: '#059669' }} />
                  <span>Transferencia bancaria (preferido)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{ color: '#059669' }} />
                  <span>Depósito bancario</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{ color: '#059669' }} />
                  <span>Cheque al día (sujeto a evaluación)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{ color: '#059669' }} />
                  <span>Efectivo en caja</span>
                </li>
              </ul>
              <div className="mt-4 p-4" style={{ backgroundColor: '#fef3cd', borderRadius: '4px' }}>
                <p style={{ fontSize: '13px', color: '#856404' }}>
                  <strong>Nota:</strong> No aceptamos tarjetas de crédito ni débito.
                </p>
              </div>
            </div>

            {/* Condiciones de Venta */}
            <div className="bg-white p-6" style={{ border: '1px solid #e5e5e5' }}>
              <div className="flex items-center gap-3 mb-6">
                <Shield size={28} style={{ color: '#f4a51c' }} />
                <h2 
                  style={{ 
                    fontFamily: '"Cabin", Arial, sans-serif',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#242424'
                  }}
                >
                  CONDICIONES DE VENTA
                </h2>
              </div>
              <ul style={{ fontSize: '14px', color: '#666', lineHeight: 2 }}>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{ color: '#059669' }} />
                  <span>Venta exclusiva a empresas (B2B)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{ color: '#059669' }} />
                  <span>Pedido mínimo: $50.000 neto</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{ color: '#059669' }} />
                  <span>Precios no incluyen IVA</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{ color: '#059669' }} />
                  <span>Precios sujetos a cambio sin previo aviso</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{ color: '#059669' }} />
                  <span>Stock sujeto a disponibilidad</span>
                </li>
              </ul>
            </div>

            {/* Despachos */}
            <div className="bg-white p-6" style={{ border: '1px solid #e5e5e5' }}>
              <div className="flex items-center gap-3 mb-6">
                <Truck size={28} style={{ color: '#f4a51c' }} />
                <h2 
                  style={{ 
                    fontFamily: '"Cabin", Arial, sans-serif',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#242424'
                  }}
                >
                  DESPACHOS
                </h2>
              </div>
              <ul style={{ fontSize: '14px', color: '#666', lineHeight: 2 }}>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{ color: '#059669' }} />
                  <span>Despacho a regiones los días martes y jueves</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{ color: '#059669' }} />
                  <span>Despacho gratis en Santiago sobre $150.000 neto</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle size={16} className="mt-1 flex-shrink-0" style={{ color: '#f4a51c' }} />
                  <span>No trabajamos con Chilexpress, Correos de Chile, Blue Express</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle size={16} className="mt-1 flex-shrink-0" style={{ color: '#f4a51c' }} />
                  <span>Mercancía viaja a costo y riesgo del cliente</span>
                </li>
              </ul>
            </div>

            {/* Horarios */}
            <div className="bg-white p-6" style={{ border: '1px solid #e5e5e5' }}>
              <div className="flex items-center gap-3 mb-6">
                <Clock size={28} style={{ color: '#f4a51c' }} />
                <h2 
                  style={{ 
                    fontFamily: '"Cabin", Arial, sans-serif',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#242424'
                  }}
                >
                  HORARIOS DE ATENCIÓN
                </h2>
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                <div className="mb-4">
                  <p style={{ fontWeight: 600, color: '#333', marginBottom: '8px' }}>Lunes a Viernes:</p>
                  <p>• Mañana: 9:00 a 14:00 hrs</p>
                  <p>• Tarde: 15:30 a 19:00 hrs</p>
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: '#333', marginBottom: '8px' }}>Sábados:</p>
                  <p>• 10:00 a 13:00 hrs</p>
                </div>
              </div>
              <div className="mt-4 p-4" style={{ backgroundColor: '#1e1e2f', borderRadius: '4px' }}>
                <p style={{ fontSize: '13px', color: '#fff' }}>
                  <strong style={{ color: '#f4a51c' }}>Dirección:</strong> Álvarez de Toledo 981, San Miguel
                </p>
              </div>
            </div>
          </div>

          {/* Descuentos por volumen */}
          <div className="bg-white p-6" style={{ border: '1px solid #e5e5e5' }}>
            <h2 
              className="text-center mb-6"
              style={{ 
                fontFamily: '"Cabin", Arial, sans-serif',
                fontSize: '20px',
                fontWeight: 600,
                color: '#242424'
              }}
            >
              DESCUENTO POR MONTOS - PAGO CONTADO
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <thead>
                  <tr style={{ backgroundColor: '#1e1e2f', color: '#fff' }}>
                    <th className="py-3 px-6 text-left" style={{ fontSize: '14px', fontWeight: 600 }}>Montos</th>
                    <th className="py-3 px-6 text-right" style={{ fontSize: '14px', fontWeight: 600 }}>Descuento</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: '14px', color: '#666' }}>
                  <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                    <td className="py-3 px-6">$1 - $100,000</td>
                    <td className="py-3 px-6 text-right font-semibold">0%</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                    <td className="py-3 px-6">$100,001 - $1,000,000</td>
                    <td className="py-3 px-6 text-right font-semibold" style={{ color: '#059669' }}>5%</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                    <td className="py-3 px-6">$1,000,001 - $2,000,000</td>
                    <td className="py-3 px-6 text-right font-semibold" style={{ color: '#059669' }}>10%</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-6">Más de $2,000,001</td>
                    <td className="py-3 px-6 text-right font-semibold" style={{ color: '#f4a51c' }}>15%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-center mt-6" style={{ fontSize: '13px', color: '#f4a51c', fontWeight: 500 }}>
              5% de descuento adicional comprando sobre 1 caja de medallas del mismo modelo / color.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppChat />
    </div>
  )
}

export default PoliticasComerciales

