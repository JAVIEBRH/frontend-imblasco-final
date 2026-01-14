/**
 * CATEGORÍAS - MEDIDAS EXACTAS de imblasco.cl
 * Tarjetas: 150x150px con gap de 20px
 */
const Categories = () => {
  // Usar imágenes locales (creadas con placeholder atractivos)
  const categories = [
    { 
      name: 'ACCESORIOS AUTOMÓVIL', 
      displayName: 'Accesorios Automóvil',
      image: '/images/categories/accesorios-automovil.png',
      link: '/categoria/accesorios-automovil/'
    },
    { 
      name: 'ARTÍCULOS COVID', 
      displayName: 'Artículos Covid',
      image: '/images/categories/covid.png',
      link: '/categoria/covid/'
    },
    { 
      name: 'BELLEZA Y SALUD', 
      displayName: 'Belleza y Salud',
      image: '/images/categories/belleza-salud.png',
      link: '/categoria/belleza-salud/'
    },
    { 
      name: 'ENTRETENCIÓN Y OUTDOOR', 
      displayName: 'Entretención y Outdoor',
      image: '/images/categories/entretencion.png',
      link: '/categoria/entretencion-outdoor/'
    },
    { 
      name: 'LÍNEA BAMBOO', 
      displayName: 'Línea Bamboo',
      image: '/images/categories/linea-bamboo.png',
      link: '/categoria/linea-bamboo/'
    },
    { 
      name: 'LÍNEA COBRE', 
      displayName: 'Línea Cobre',
      image: '/images/categories/linea-cobre.png',
      link: '/categoria/linea-cobre/'
    },
  ]

  return (
    <section 
      style={{ 
        backgroundColor: '#f7f7f7',
        padding: '35px 0 45px'
      }}
    >
      <div style={{ maxWidth: '1222px', margin: '0 auto', padding: '0 15px' }}>
        <div 
          style={{ 
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          {categories.map((cat, i) => (
            <a
              key={i}
              href={cat.link}
              className="category-card"
              style={{
                width: '150px',
                height: '150px',
                position: 'relative',
                overflow: 'hidden',
                display: 'block',
                textDecoration: 'none',
                backgroundColor: '#222'
              }}
            >
              {/* Imagen de fondo */}
              <img 
                src={cat.image}
                alt={cat.displayName}
                className="cat-bg-img"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease'
                }}
              />

              {/* Overlay gradient */}
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.45) 100%)'
                }}
              />

              {/* Header superior con nombre de categoría */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: 'rgba(0,0,0,0.65)',
                  padding: '8px 8px'
                }}
              >
                <span 
                  style={{
                    fontFamily: '"Cabin", Arial, sans-serif',
                    fontSize: '10px',
                    fontWeight: 600,
                    color: '#fff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.3px',
                    display: 'block',
                    textAlign: 'center',
                    lineHeight: 1.25
                  }}
                >
                  {cat.name}
                </span>
              </div>

              {/* Nombre centrado grande */}
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '35px 10px 15px'
                }}
              >
                <h3 
                  style={{
                    fontFamily: '"Cabin", Arial, sans-serif',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#fff',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                    lineHeight: 1.3,
                    margin: 0
                  }}
                >
                  {cat.displayName}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .category-card:hover .cat-bg-img {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  )
}

export default Categories
