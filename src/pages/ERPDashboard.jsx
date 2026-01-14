import { useState, useEffect } from 'react'
import { 
  DollarSign, 
  FileText, 
  Users, 
  Package,
  TrendingUp,
  AlertTriangle,
  CreditCard,
  ShoppingCart
} from 'lucide-react'
import { API_URL } from '../config/api.js'
import './ERPDashboard.css'

/**
 * DASHBOARD PRINCIPAL DEL ERP
 */
function ERPDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardStats()
  }, [])

  const loadDashboardStats = async () => {
    try {
      const dateFrom = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      const dateTo = new Date().toISOString()

      const response = await fetch(`${API_URL}/report/dashboard?dateFrom=${dateFrom}&dateTo=${dateTo}`)
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error cargando estadísticas:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="erp-dashboard">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="erp-dashboard">
      <div className="dashboard-header">
        <h1>Dashboard ERP</h1>
        <p>Visión general del sistema</p>
      </div>

      <div className="stats-grid-large">
        <div className="stat-card-large sales">
          <div className="stat-icon-large">
            <DollarSign size={32} />
          </div>
          <div className="stat-content-large">
            <p className="stat-label-large">Ventas (30 días)</p>
            <p className="stat-value-large">{formatCurrency(stats?.sales?.totalRevenue || 0)}</p>
            <p className="stat-subtext">{stats?.sales?.totalOrders || 0} pedidos</p>
          </div>
        </div>

        <div className="stat-card-large invoices">
          <div className="stat-icon-large">
            <FileText size={32} />
          </div>
          <div className="stat-content-large">
            <p className="stat-label-large">Facturas Emitidas</p>
            <p className="stat-value-large">{formatCurrency(stats?.invoices?.totalInvoiced || 0)}</p>
            <p className="stat-subtext">{stats?.invoices?.totalInvoices || 0} facturas</p>
          </div>
        </div>

        <div className="stat-card-large payments">
          <div className="stat-icon-large">
            <CreditCard size={32} />
          </div>
          <div className="stat-content-large">
            <p className="stat-label-large">Pagos Recibidos</p>
            <p className="stat-value-large">{formatCurrency(stats?.payments?.totalPaid || 0)}</p>
            <p className="stat-subtext">{stats?.payments?.totalPayments || 0} pagos</p>
          </div>
        </div>

        <div className="stat-card-large receivables">
          <div className="stat-icon-large">
            <TrendingUp size={32} />
          </div>
          <div className="stat-content-large">
            <p className="stat-label-large">Por Cobrar</p>
            <p className="stat-value-large">{formatCurrency(stats?.accountsReceivable?.totalBalance || 0)}</p>
            <p className="stat-subtext">{stats?.accountsReceivable?.pendingAccounts || 0} cuentas</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Alertas</h3>
          </div>
          <div className="card-content">
            {stats?.inventory?.lowStockCount > 0 ? (
              <div className="alert-item">
                <AlertTriangle size={20} color="#f59e0b" />
                <span>{stats.inventory.lowStockCount} productos con stock bajo</span>
              </div>
            ) : (
              <p className="no-alerts">No hay alertas</p>
            )}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Accesos Rápidos</h3>
          </div>
          <div className="card-content">
            <div className="quick-actions">
              <a href="/erp/ventas" className="quick-action-link">
                <ShoppingCart size={20} />
                <span>Ventas</span>
              </a>
              <a href="/erp/clientes" className="quick-action-link">
                <Users size={20} />
                <span>Clientes</span>
              </a>
              <a href="/erp/facturacion" className="quick-action-link">
                <FileText size={20} />
                <span>Facturación</span>
              </a>
              <a href="/erp/inventario" className="quick-action-link">
                <Package size={20} />
                <span>Inventario</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ERPDashboard


