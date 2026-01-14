import { useState, useEffect } from 'react'
import { 
  FileText, 
  Search, 
  Plus, 
  Eye, 
  X,
  Download,
  CheckCircle,
  XCircle
} from 'lucide-react'
import './Facturacion.css'

/**
 * MÓDULO DE FACTURACIÓN
 * Gestión completa de facturas
 */
function Facturacion() {
  const [invoices, setInvoices] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    status: 'all'
  })
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    loadInvoices()
    loadPendingOrders()
  }, [filters])

  const loadInvoices = async () => {
    try {
      setLoading(true)
      let url = '/api/invoice'
      const params = new URLSearchParams()
      
      if (filters.status !== 'all') {
        params.append('status', filters.status)
      }
      
      if (params.toString()) {
        url += '?' + params.toString()
      }

      const response = await fetch(url)
      const data = await response.json()
      setInvoices(data.invoices || [])
    } catch (error) {
      console.error('Error cargando facturas:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadPendingOrders = async () => {
    try {
      const response = await fetch('/api/order?status=confirmed')
      const data = await response.json()
      setOrders(data.orders?.filter(o => o.status === 'confirmed') || [])
    } catch (error) {
      console.error('Error cargando pedidos:', error)
    }
  }

  const handleCreateInvoice = async (orderId) => {
    try {
      const response = await fetch(`/api/invoice/create-from-order/${orderId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoiceType: 'factura' })
      })

      if (response.ok) {
        setShowCreateModal(false)
        loadInvoices()
        loadPendingOrders()
        alert('Factura creada exitosamente')
      } else {
        const data = await response.json()
        alert(data.message || 'Error al crear la factura')
      }
    } catch (error) {
      console.error('Error creando factura:', error)
      alert('Error al crear la factura')
    }
  }

  const handleCancelInvoice = async (invoiceId) => {
    if (!confirm('¿Estás seguro de cancelar esta factura?')) return

    try {
      const response = await fetch(`/api/invoice/${invoiceId}/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: 'Cancelada por usuario' })
      })

      if (response.ok) {
        loadInvoices()
        setSelectedInvoice(null)
        alert('Factura cancelada exitosamente')
      }
    } catch (error) {
      console.error('Error cancelando factura:', error)
      alert('Error al cancelar la factura')
    }
  }

  const handleViewInvoice = async (invoiceId) => {
    try {
      const response = await fetch(`/api/invoice/${invoiceId}`)
      const invoice = await response.json()
      setSelectedInvoice(invoice)
    } catch (error) {
      console.error('Error cargando factura:', error)
    }
  }

  const getStatusBadge = (status) => {
    const config = {
      'issued': { label: 'Emitida', color: '#10b981', icon: CheckCircle },
      'cancelled': { label: 'Cancelada', color: '#ef4444', icon: XCircle },
      'void': { label: 'Anulada', color: '#6b7280', icon: XCircle }
    }

    const cfg = config[status] || { label: status, color: '#6b7280', icon: FileText }
    const Icon = cfg.icon

    return (
      <span className="status-badge" style={{ backgroundColor: `${cfg.color}15`, color: cfg.color }}>
        <Icon size={14} />
        {cfg.label}
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
    return new Date(dateString).toLocaleDateString('es-CL')
  }

  return (
    <div className="facturacion-container">
      <div className="page-header">
        <div>
          <h1>Facturación</h1>
          <p>Gestión de facturas y documentos</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={20} />
          Crear Factura
        </button>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar por número de factura..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="filter-select"
        >
          <option value="all">Todos los estados</option>
          <option value="issued">Emitidas</option>
          <option value="cancelled">Canceladas</option>
        </select>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Cargando facturas...</p>
        </div>
      ) : (
        <div className="invoices-table-container">
          <table className="invoices-table">
            <thead>
              <tr>
                <th>Número</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Monto Neto</th>
                <th>IVA</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td><strong>{invoice.invoiceNumber}</strong></td>
                  <td>{invoice.clientName || invoice.clientId}</td>
                  <td>{formatDate(invoice.issueDate)}</td>
                  <td>{formatCurrency(invoice.netAmount)}</td>
                  <td>{formatCurrency(invoice.ivaAmount)}</td>
                  <td><strong>{formatCurrency(invoice.totalAmount)}</strong></td>
                  <td>{getStatusBadge(invoice.status)}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-icon"
                        onClick={() => handleViewInvoice(invoice.id)}
                        title="Ver detalle"
                      >
                        <Eye size={16} />
                      </button>
                      {invoice.status === 'issued' && (
                        <button
                          className="btn-icon"
                          onClick={() => handleCancelInvoice(invoice.id)}
                          title="Cancelar"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {invoices.length === 0 && (
            <div className="empty-state">
              <FileText size={48} />
              <p>No se encontraron facturas</p>
            </div>
          )}
        </div>
      )}

      {/* Modal de Crear Factura */}
      {showCreateModal && (
        <CreateInvoiceModal
          orders={orders}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateInvoice}
        />
      )}

      {/* Modal de Detalle */}
      {selectedInvoice && (
        <InvoiceDetailModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          onCancel={handleCancelInvoice}
        />
      )}
    </div>
  )
}

/**
 * Modal de Crear Factura
 */
function CreateInvoiceModal({ orders, onClose, onCreate }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Crear Factura desde Pedido</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {orders.length === 0 ? (
            <p className="no-data">No hay pedidos confirmados disponibles</p>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-item">
                  <div>
                    <strong>{order.orderId || `#${order.id}`}</strong>
                    <span>Cliente: {order.userId}</span>
                    <span>Total: {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(order.total)}</span>
                  </div>
                  <button
                    className="btn-primary"
                    onClick={() => onCreate(order.id)}
                  >
                    Crear Factura
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Modal de Detalle de Factura
 */
function InvoiceDetailModal({ invoice, onClose, onCancel }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-CL')
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Detalle de Factura</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="invoice-header-info">
            <div className="info-grid">
              <div><strong>Número:</strong> {invoice.invoiceNumber}</div>
              <div><strong>Fecha:</strong> {formatDate(invoice.issueDate)}</div>
              <div><strong>Cliente:</strong> {invoice.clientName}</div>
              <div><strong>RUT:</strong> {invoice.clientRut}</div>
              <div><strong>Dirección:</strong> {invoice.clientAddress}</div>
              <div><strong>Estado:</strong> {invoice.status}</div>
            </div>
          </div>

          <div className="invoice-items-section">
            <h3>Items</h3>
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
                {invoice.items?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.sku}</td>
                    <td>{item.product_name}</td>
                    <td>{item.quantity}</td>
                    <td>{formatCurrency(item.unit_price)}</td>
                    <td><strong>{formatCurrency(item.subtotal)}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="invoice-totals">
            <div className="total-row">
              <span>Neto:</span>
              <strong>{formatCurrency(invoice.netAmount)}</strong>
            </div>
            <div className="total-row">
              <span>IVA (19%):</span>
              <strong>{formatCurrency(invoice.ivaAmount)}</strong>
            </div>
            <div className="total-row total">
              <span>Total:</span>
              <strong>{formatCurrency(invoice.totalAmount)}</strong>
            </div>
          </div>

          <div className="modal-actions">
            {invoice.status === 'issued' && (
              <button
                className="btn-secondary"
                onClick={() => {
                  onCancel(invoice.id)
                }}
              >
                Cancelar Factura
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Facturacion

