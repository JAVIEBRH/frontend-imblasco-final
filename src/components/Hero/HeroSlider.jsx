import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * SLIDER - MEDIDAS EXACTAS de imblasco.cl
 * Altura: ~450px según el original
 */
const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Usar imágenes locales (creadas con placeholder atractivos)
  const slides = [
    { id: 1, image: '/images/slides/slide1.jpg' },
    { id: 2, image: '/images/slides/slide2.png' },
    { id: 3, image: '/images/slides/slide3.jpg' },
    { id: 4, image: '/images/slides/slide4.jpg' },
    { id: 5, image: '/images/slides/slide5.jpg' },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [slides.length])

  const goToSlide = (index) => setCurrentSlide(index)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)

  return (
    <section 
      style={{
        position: 'relative',
        width: '100%',
        height: '450px',
        overflow: 'hidden',
        backgroundColor: '#353734'
      }}
    >
      {/* Slides */}
      <div 
        style={{
          display: 'flex',
          height: '100%',
          transition: 'transform 0.7s ease-in-out',
          transform: `translateX(-${currentSlide * 100}%)`
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            style={{
              flexShrink: 0,
              width: '100%',
              height: '100%'
            }}
          >
            <img
              src={slide.image}
              alt={`Slide ${slide.id}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          </div>
        ))}
      </div>

      {/* Flecha izquierda */}
      <button
        onClick={prevSlide}
        style={{
          position: 'absolute',
          left: '15px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '44px',
          height: '44px',
          backgroundColor: 'rgba(0,0,0,0.3)',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          transition: 'background-color 0.3s'
        }}
        className="slider-arrow"
      >
        <ChevronLeft size={24} color="#fff" strokeWidth={2} />
      </button>

      {/* Flecha derecha */}
      <button
        onClick={nextSlide}
        style={{
          position: 'absolute',
          right: '15px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '44px',
          height: '44px',
          backgroundColor: 'rgba(0,0,0,0.3)',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          transition: 'background-color 0.3s'
        }}
        className="slider-arrow"
      >
        <ChevronRight size={24} color="#fff" strokeWidth={2} />
      </button>

      {/* Paginación */}
      <div 
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
          zIndex: 10
        }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '10px 2px'
            }}
          >
            <span 
              style={{
                fontFamily: '"Lato", Arial, sans-serif',
                fontSize: '12px',
                fontWeight: 700,
                color: index === currentSlide ? '#fff' : 'rgba(255,255,255,0.4)',
                transition: 'color 0.3s'
              }}
            >
              0{index + 1}
            </span>
            <span 
              style={{
                width: index === currentSlide ? '40px' : '15px',
                height: '2px',
                backgroundColor: index === currentSlide ? '#fff' : 'rgba(255,255,255,0.3)',
                marginLeft: '6px',
                transition: 'all 0.3s'
              }}
            />
          </button>
        ))}
      </div>

      <style>{`
        .slider-arrow:hover {
          background-color: rgba(0,0,0,0.5) !important;
        }
      `}</style>
    </section>
  )
}

export default HeroSlider
