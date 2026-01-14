/**
 * SECCIONES INFORMATIVAS - MEDIDAS EXACTAS de imblasco.cl
 * 4 columnas con información de despacho y pedidos
 */
const InfoSections = () => {
  const sections = [
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
        'En primer lugar, le recomendamos solicitar una cuenta para consultar precios y disponibilidad de stock a través de nuestro sitio web.',
        'Si aún no es cliente de nuestra empresa, le solicitamos que envíe los datos de su empresa a ventas@imblasco.cl para poder ingresarlo en nuestro sistema.',
        'Si ya es cliente, le pedimos que envíe un correo a ventas@imblasco.cl, incluyendo su RUT de compra y los detalles de lo que necesita cotizar.'
      ]
    },
    {
      title: 'CÓMO REALIZAR UN PEDIDO (CLIENTE REGIÓN)',
      items: [
        'En primer lugar, le recomendamos solicitar una cuenta para consultar precios y disponibilidad de stock.',
        'Si aún no es cliente, le solicitamos que envíe los datos de su empresa a ventas@imblasco.cl. Indique el nombre de la empresa de transporte que utilizará.',
        'Si ya es cliente, le solicitamos que envíe un correo a ventas@imblasco.cl con su RUT de compra y los detalles de lo que necesita cotizar.'
      ]
    },
    {
      title: 'CÓMO RETIRAR UN PEDIDO',
      items: [
        'Si cuenta con una cotización y ha realizado el pago mediante transferencia bancaria, podrá retirar su pedido en Álvarez de Toledo 981, San Miguel.',
        'Al momento del retiro, se le solicitará presentar el RUT de compra y/o el número de nota de venta.',
        'HORARIO DE ATENCIÓN',
        'Lunes a viernes de 9:42 a 14:00 hrs y de 15:30 a 19:00 hrs. Sábados de 10:00 a 13:00 hrs.'
      ]
    }
  ]

  return (
    <section 
      style={{ 
        backgroundColor: '#fff',
        borderTop: '1px solid rgba(0,0,0,0.08)',
        padding: '45px 0 50px'
      }}
    >
      <div style={{ maxWidth: '1222px', margin: '0 auto', padding: '0 15px' }}>
        <div 
          style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '35px'
          }}
          className="info-grid"
        >
          {sections.map((section, idx) => (
            <div key={idx}>
              <h3 
                style={{
                  fontFamily: '"Cabin", Arial, sans-serif',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#333',
                  textTransform: 'uppercase',
                  marginBottom: '18px',
                  lineHeight: 1.45,
                  margin: '0 0 18px 0'
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
                      paddingLeft: '14px',
                      fontFamily: '"Cabin", Arial, sans-serif',
                      fontSize: '12px',
                      color: '#777',
                      lineHeight: 1.75,
                      marginBottom: '6px'
                    }}
                  >
                    <span 
                      style={{
                        position: 'absolute',
                        left: 0,
                        color: 'rgb(244, 165, 28)',
                        fontWeight: 700
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

      <style>{`
        @media (max-width: 1024px) {
          .info-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .info-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

export default InfoSections
