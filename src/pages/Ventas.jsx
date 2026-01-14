import { useState, useEffect } from 'react'
import { 
  ShoppingCart, 
  DollarSign, 
  Package, 
  TrendingUp,
  Search,
  Filter,
  Eye,
  Send,
  CheckCircle,
  XCircle,
  Clock,
  FileText
} from 'lucide-react'
import './Ventas.css'

/**
 * PÁGINA DE VENTAS - Dashboard ERP
 * Módulo profesional de gestión de ventas y pedidos
 */
function Ventas() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    dateFrom: '',
    dateTo: ''
  })

  // Estadísticas
  const [stats, setStats] = useState({
    totalToday: 0,
    pendingOrders: 0,
    totalOrders: 0,
    totalRevenue: 0
  })

  useEffect(() => {
    loadOrders()
  }, [filters])

  const loadOrders = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/order')
      const data = await response.json()
      
      if (data.orders) {
        let filteredOrders = data.orders

        // Aplicar filtros
        if (filters.search) {
          filteredOrders = filteredOrders.filter(order => 
            order.orderId?.toLowerCase().includes(filters.search.toLowerCase()) ||
            order.userId?.toLowerCase().includes(filters.search.toLowerCase())
          )
        }

        if (filters.status !== 'all') {
          filteredOrders = filteredOrders.filter(order => 
            order.status === filters.status
          )
        }

        if (filters.dateFrom) {
          const fromDate = new Date(filters.dateFrom)
          filteredOrders = filteredOrders.filter(order => 
            new Date(order.createdAt) >= fromDate
          )
        }

        if (filters.dateTo) {
          const toDate = new Date(filters.dateTo)
          toDate.setHours(23, 59, 59)
          filteredOrders = filteredOrders.filter(order => 
            new Date(order.createdAt) <= toDate
          )
        }

        setOrders(filteredOrders)
        calculateStats(data.orders)
      }
    } catch (error) {
      console.error('Error cargando pedidos:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (allOrders) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todayOrders = allOrders.filter(order => {
      const orderDate = new Date(order.createdAt)
      orderDate.setHours(0, 0, 0, 0)
      return orderDate.getTime() === today.getTime()
    })

    const pending = allOrders.filter(order => 
      ['confirmed', 'draft'].includes(order.status)
    )

    const totalRevenue = allOrders.reduce((sum, order) => 
      sum + (parseFloat(order.total) || 0), 0
    )

    const todayRevenue = todayOrders.reduce((sum, order) => 
      sum + (parseFloat(order.total) || 0), 0
    )

    setStats({
      totalToday: todayRevenue,
      pendingOrders: pending.length,
      totalOrders: allOrders.length,
      totalRevenue
    })
  }

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/order/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        loadOrders()
        setSelectedOrder(null)
      }
    } catch (error) {
      console.error('Error actualizando estado:', error)
      alert('Error al actualizar el estado del pedido')
    }
  }

  const handleSendToErp = async (orderId) => {
    try {
      const response = await fetch(`/api/order/${orderId}/send-to-erp`, {
        method: 'POST'
      })

      if (response.ok) {
        alert('Pedido enviado al ERP exitosamente')
        loadOrders()
        setSelectedOrder(null)
      } else {
        const data = await response.json()
        alert(data.message || 'Error al enviar al ERP')
      }
    } catch (error) {
      console.error('Error enviando al ERP:', error)
      alert('Error al enviar el pedido al ERP')
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      'draft': { label: 'Borrador', color: '#6b7280', icon: FileText },
      'confirmed': { label: 'Confirmado', color: '#3b82f6', icon: CheckCircle },
      'sent_to_erp': { label: 'Enviado a ERP', color: '#8b5cf6', icon: Send },
      'invoiced': { label: 'Facturado', color: '#10b981', icon: CheckCircle },
      'cancelled': { label: 'Cancelado', color: '#ef4444', icon: XCircle },
      'rejected': { label: 'Rechazado', color: '#f59e0b', icon: XCircle },
      'error': { label: 'Error', color: '#dc2626', icon: XCircle }
    }

    const config = statusConfig[status] || { label: status, color: '#6b7280', icon: Clock }
    const Icon = config.icon

    return (
      <span 
        className="status-badge"
        style={{ 
          backgroundColor: `${config.color}15`,
          color: config.color,
          borderColor: config.color
        }}
      >
        <Icon size={14} />
        {config.label}
      </span>
    )
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="ventas-container">
      {/* Header */}
      <div className="ventas-header">
        <div>
          <h1>Módulo de Ventas</h1>
          <p>Gestión de pedidos y ventas B2B</p>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#3b82f615', color: '#3b82f6' }}>
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Ventas de Hoy</p>
            <p className="stat-value">{formatCurrency(stats.totalToday)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#f59e0b15', color: '#f59e0b' }}>
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Pedidos Pendientes</p>
            <p className="stat-value">{stats.pendingOrders}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#10b98115', color: '#10b981' }}>
            <Package size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Pedidos</p>
            <p className="stat-value">{stats.totalOrders}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#8b5cf615', color: '#8b5cf6' }}>
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Ingresos Totales</p>
            <p className="stat-value">{formatCurrency(stats.totalRevenue)}</p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="filters-section">
        <div className="filters-grid">
          <div className="filter-group">
            <Search size={18} />
            <input
              type="text"
              placeholder="Buscar por ID de pedido o cliente..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <Filter size={18} />
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="filter-select"
            >
              <option value="all">Todos los estados</option>
              <option value="draft">Borrador</option>
              <option value="confirmed">Confirmado</option>
              <option value="sent_to_erp">Enviado a ERP</option>
              <option value="invoiced">Facturado</option>
              <option value="cancelled">Cancelado</option>
              <option value="rejected">Rechazado</option>
            </select>
          </div>

          <div className="filter-group">
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              className="filter-input"
              placeholder="Desde"
            />
          </div>

          <div className="filter-group">
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
              className="filter-input"
              placeholder="Hasta"
            />
          </div>
        </div>
      </div>

      {/* Tabla de Pedidos */}
      <div className="orders-table-container">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Cargando pedidos...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="empty-state">
            <ShoppingCart size={48} />
            <p>No se encontraron pedidos</p>
          </div>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID Pedido</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Items</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <strong>{order.orderId || `#${order.id}`}</strong>
                  </td>
                  <td>{order.userId || 'N/A'}</td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>{order.items?.length || 0} items</td>
                  <td>
                    <strong>{formatCurrency(order.total || 0)}</strong>
                  </td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-icon"
                        onClick={() => setSelectedOrder(order)}
                        title="Ver detalle"
                      >
                        <Eye size={16} />
                      </button>
                      {order.status === 'confirmed' && (
                        <button
                          className="btn-icon"
                          onClick={() => handleSendToErp(order.id)}
                          title="Enviar a ERP"
                        >
                          <Send size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal de Detalle */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleStatusChange}
          onSendToErp={handleSendToErp}
        />
      )}
    </div>
  )
}

/**
 * Modal de Detalle de Pedido
 */
function OrderDetailModal({ order, onClose, onStatusChange, onSendToErp }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Detalle del Pedido</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="order-info-grid">
            <div className="info-item">
              <label>ID Pedido:</label>
              <strong>{order.orderId || `#${order.id}`}</strong>
            </div>
            <div className="info-item">
              <label>Cliente:</label>
              <span>{order.userId || 'N/A'}</span>
            </div>
            <div className="info-item">
              <label>Fecha:</label>
              <span>{formatDate(order.createdAt)}</span>
            </div>
            <div className="info-item">
              <label>Estado:</label>
              <span>{order.status}</span>
            </div>
            <div className="info-item">
              <label>Total:</label>
              <strong style={{ fontSize: '1.2em', color: '#10b981' }}>
                {formatCurrency(order.total || 0)}
              </strong>
            </div>
          </div>

          <div className="order-items-section">
            <h3>Items del Pedido</h3>
            <table className="items-table">
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unit.</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.codigo || item.sku}</td>
                    <td>{item.nombre || item.productName}</td>
                    <td>{item.cantidad || item.quantity}</td>
                    <td>{formatCurrency(item.precioUnitario || item.unitPrice || 0)}</td>
                    <td><strong>{formatCurrency(item.subtotal || 0)}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="modal-actions">
            {order.status === 'confirmed' && (
              <button
                className="btn-primary"
                onClick={() => {
                  onSendToErp(order.id)
                }}
              >
                <Send size={18} />
                Enviar a ERP
              </button>
            )}
            <button
              className="btn-secondary"
              onClick={() => {
                onStatusChange(order.id, 'cancelled')
              }}
            >
              Cancelar Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ventas

