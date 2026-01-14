import { useState } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  FileText,
  CreditCard,
  Package,
  BarChart3,
  Menu,
  X,
  LogOut
} from 'lucide-react'
import './LayoutERP.css'

/**
 * LAYOUT DEL ERP
 * Layout con navegación lateral para todas las páginas del ERP
 */
function LayoutERP() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()

  const menuItems = [
    { path: '/erp', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { path: '/erp/ventas', icon: ShoppingCart, label: 'Ventas' },
    { path: '/erp/clientes', icon: Users, label: 'Clientes' },
    { path: '/erp/facturacion', icon: FileText, label: 'Facturación' },
    { path: '/erp/pagos', icon: CreditCard, label: 'Pagos' },
    { path: '/erp/inventario', icon: Package, label: 'Inventario' },
    { path: '/erp/reportes', icon: BarChart3, label: 'Reportes' }
  ]

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="erp-layout">
      {/* Sidebar */}
      <aside className={`erp-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>ERP ImBlasco</h2>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path, item.exact)
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${active ? 'active' : ''}`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="nav-item">
            <LogOut size={20} />
            {sidebarOpen && <span>Salir</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="erp-main">
        <Outlet />
      </main>
    </div>
  )
}

export default LayoutERP


