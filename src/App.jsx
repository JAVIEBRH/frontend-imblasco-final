import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Componentes del Header
import TopHeader from './components/Header/TopHeader'
import MainHeader from './components/Header/MainHeader'
import Navigation from './components/Header/Navigation'

// Componentes globales
import Footer from './components/Footer/Footer'
import WhatsAppChat from './components/WhatsAppChat/WhatsAppChat'
import B2BChat from './components/B2BChat/B2BChat'
import LoginModal from './components/Auth/LoginModal'

// Páginas
import Home from './pages/Home'
import Catalogos from './pages/Catalogos'
import Despachos from './pages/Despachos'
import Descargas from './pages/Descargas'
import PoliticasComerciales from './pages/PoliticasComerciales'
import ArticulosPesca from './pages/ArticulosPesca'
import Ventas from './pages/Ventas'

// ERP
import LayoutERP from './components/ERP/LayoutERP'
import ERPDashboard from './pages/ERPDashboard'
import Clientes from './pages/Clientes'
import Facturacion from './pages/Facturacion'

/**
 * App principal - Clon 100% idéntico de imblasco.cl
 * Con sistema B2B de pedidos automatizados
 */
function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  
  // Estado de autenticación (para demo, usuario autenticado)
  // En producción, esto vendría del sistema de auth real
  const [user, setUser] = useState(() => {
    // Generar userId único si no existe
    let userId = localStorage.getItem('b2b_userId')
    if (!userId) {
      userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('b2b_userId', userId)
    }
    
    return {
      isAuthenticated: true, // Cambiar a false para modo normal
      userId: userId,
      nombre: 'Cliente Demo',
      email: 'demo@cliente.cl'
    }
  })

  const handleRemoveFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId))
  }

  const handleLogin = (userData) => {
    setUser({
      isAuthenticated: true,
      userId: userData.userId || `user-${Date.now()}`,
      nombre: userData.nombre,
      email: userData.email
    })
    setIsLoginOpen(false)
  }

  const handleLogout = () => {
    setUser({ isAuthenticated: false, userId: null, nombre: null, email: null })
  }

  return (
    <Router>
      <div className="website-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* ============================================
            HEADER - Estructura exacta de imblasco.cl
            ============================================ */}
        
        {/* Top Bar - Links superiores */}
        <TopHeader />
        
        {/* Header Principal - Logo, búsqueda, acceso */}
        <MainHeader 
          onLoginClick={() => setIsLoginOpen(true)}
          cartItems={cartItems}
          onRemoveFromCart={handleRemoveFromCart}
          user={user}
          onLogout={handleLogout}
        />
        
        {/* Navegación - Categorías y menú */}
        <Navigation />

        {/* ============================================
            CONTENIDO PRINCIPAL
            ============================================ */}
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogos" element={<Catalogos />} />
            <Route path="/despachos" element={<Despachos />} />
            <Route path="/descargas" element={<Descargas />} />
            <Route path="/politicas-comerciales" element={<PoliticasComerciales />} />
            <Route path="/articulos-de-pesca" element={<ArticulosPesca />} />
            <Route path="/ventas" element={<Ventas />} />
            
            {/* Rutas del ERP */}
            <Route path="/erp" element={<LayoutERP />}>
              <Route index element={<ERPDashboard />} />
              <Route path="dashboard" element={<ERPDashboard />} />
              <Route path="ventas" element={<Ventas />} />
              <Route path="clientes" element={<Clientes />} />
              <Route path="facturacion" element={<Facturacion />} />
            </Route>
          </Routes>
        </main>

        {/* ============================================
            FOOTER
            ============================================ */}
        <Footer />

        {/* ============================================
            WIDGETS FLOTANTES
            ============================================ */}
        
        {/* Chat B2B - Solo para usuarios autenticados */}
        <B2BChat 
          userId={user.userId}
          isAuthenticated={user.isAuthenticated}
        />

        {/* WhatsApp para usuarios no autenticados */}
        {!user.isAuthenticated && <WhatsAppChat />}

        {/* Modal de Login */}
        {isLoginOpen && (
          <LoginModal 
            onClose={() => setIsLoginOpen(false)}
            onLogin={handleLogin}
          />
        )}
      </div>
    </Router>
  )
}

export default App
