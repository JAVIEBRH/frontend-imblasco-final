import HeroSlider from '../components/Hero/HeroSlider'
import Categories from '../components/Categories/Categories'
import NewProducts from '../components/Products/NewProducts'
import InfoSections from '../components/Info/InfoSections'

/**
 * Página de inicio - Estructura 100% IDÉNTICA a imblasco.cl
 * Orden: Slider > Categorías > Nuevos Productos > Info
 */
const Home = ({ onQuickView, onAddToCart }) => {
  return (
    <main>
      {/* 1. Slider principal con banners */}
      <HeroSlider />

      {/* 2. Categorías de productos */}
      <Categories />

      {/* 3. Nuevos productos con tabs */}
      <NewProducts onQuickView={onQuickView} onAddToCart={onAddToCart} />

      {/* 4. Secciones informativas */}
      <InfoSections />
    </main>
  )
}

export default Home
