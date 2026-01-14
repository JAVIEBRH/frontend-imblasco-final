import { useState, useEffect } from 'react'
import { 
  Users, 
  Search, 
  Plus, 
  Edit, 
  Eye, 
  Trash2,
  DollarSign,
  ShoppingCart
} from 'lucide-react'
import './Clientes.css'

/**
 * MÓDULO DE CLIENTES
 * Gestión completa de clientes B2B
 */
function Clientes() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedClient, setSelectedClient] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    userId: '',
    email: '',
    nombre: '',
    razonSocial: '',
    rut: '',
    giro: '',
    direccion: '',
    comuna: '',
    emailFacturacion: ''
  })

  useEffect(() => {
    loadClients()
  }, [search])

  const loadClients = async () => {
    try {
      setLoading(true)
      const url = search 
        ? `/api/client?search=${encodeURIComponent(search)}`
        : '/api/client'
      
      const response = await fetch(url)
      const data = await response.json()
      setClients(data.clients || [])
    } catch (error) {
      console.error('Error cargando clientes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setFormData({
      userId: '',
      email: '',
      nombre: '',
      razonSocial: '',
      rut: '',
      giro: '',
      direccion: '',
      comuna: '',
      emailFacturacion: ''
    })
    setShowModal(true)
  }

  const handleEdit = (client) => {
    setFormData({
      userId: client.userId,
      email: client.email,
      nombre: client.nombre,
      razonSocial: client.razonSocial,
      rut: client.rut,
      giro: client.giro || '',
      direccion: client.direccion || '',
      comuna: client.comuna || '',
      emailFacturacion: client.emailFacturacion || client.email
    })
    setShowModal(true)
  }

  const handleView = async (client) => {
    try {
      const [historyRes, arRes] = await Promise.all([
        fetch(`/api/client/${client.userId}/history`),
        fetch(`/api/client/${client.userId}/accounts-receivable`)
      ])

      const history = await historyRes.json()
      const accounts = await arRes.json()

      setSelectedClient({
        ...client,
        purchaseHistory: history.orders || [],
        accountsReceivable: accounts.accounts || []
      })
    } catch (error) {
      console.error('Error cargando detalles:', error)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      const url = formData.userId 
        ? `/api/client/${formData.userId}`
        : '/api/client'
      
      const method = formData.userId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setShowModal(false)
        loadClients()
      }
    } catch (error) {
      console.error('Error guardando cliente:', error)
      alert('Error al guardar el cliente')
    }
  }

  const handleDelete = async (userId) => {
    if (!confirm('¿Estás seguro de desactivar este cliente?')) return

    try {
      const response = await fetch(`/api/client/${userId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        loadClients()
      }
    } catch (error) {
      console.error('Error eliminando cliente:', error)
      alert('Error al desactivar el cliente')
    }
  }

  return (
    <div className="clientes-container">
      <div className="page-header">
        <div>
          <h1>Clientes</h1>
          <p>Gestión de clientes B2B</p>
        </div>
        <button className="btn-primary" onClick={handleCreate}>
          <Plus size={20} />
          Nuevo Cliente
        </button>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar por nombre, RUT o email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Cargando clientes...</p>
        </div>
      ) : (
        <div className="clients-grid">
          {clients.map((client) => (
            <div key={client.id} className="client-card">
              <div className="client-header">
                <div>
                  <h3>{client.razonSocial}</h3>
                  <p className="client-rut">RUT: {client.rut}</p>
                </div>
                <div className="client-actions">
                  <button 
                    className="btn-icon"
                    onClick={() => handleView(client)}
                    title="Ver detalles"
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    className="btn-icon"
                    onClick={() => handleEdit(client)}
                    title="Editar"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    className="btn-icon"
                    onClick={() => handleDelete(client.userId)}
                    title="Desactivar"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="client-info">
                <div className="info-row">
                  <span className="label">Contacto:</span>
                  <span>{client.nombre}</span>
                </div>
                <div className="info-row">
                  <span className="label">Email:</span>
                  <span>{client.email}</span>
                </div>
                <div className="info-row">
                  <span className="label">Giro:</span>
                  <span>{client.giro || 'N/A'}</span>
                </div>
                <div className="info-row">
                  <span className="label">Ubicación:</span>
                  <span>{client.comuna || 'N/A'}</span>
                </div>
              </div>
            </div>
          ))}

          {clients.length === 0 && (
            <div className="empty-state">
              <Users size={48} />
              <p>No se encontraron clientes</p>
            </div>
          )}
        </div>
      )}

      {/* Modal de Crear/Editar */}
      {showModal && (
        <ClientModal
          formData={formData}
          setFormData={setFormData}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}

      {/* Modal de Detalles */}
      {selectedClient && (
        <ClientDetailModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}
    </div>
  )
}

/**
 * Modal de Cliente
 */
function ClientModal({ formData, setFormData, onClose, onSave }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{formData.userId ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={onSave} className="modal-body">
          <div className="form-grid">
            <div className="form-group">
              <label>RUT *</label>
              <input
                type="text"
                value={formData.rut}
                onChange={(e) => setFormData({ ...formData, rut: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Razón Social *</label>
              <input
                type="text"
                value={formData.razonSocial}
                onChange={(e) => setFormData({ ...formData, razonSocial: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Nombre de Contacto *</label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Giro</label>
              <input
                type="text"
                value={formData.giro}
                onChange={(e) => setFormData({ ...formData, giro: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Dirección</label>
              <input
                type="text"
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Comuna</label>
              <input
                type="text"
                value={formData.comuna}
                onChange={(e) => setFormData({ ...formData, comuna: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Email Facturación</label>
              <input
                type="email"
                value={formData.emailFacturacion}
                onChange={(e) => setFormData({ ...formData, emailFacturacion: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/**
 * Modal de Detalles del Cliente
 */
function ClientDetailModal({ client, onClose }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Detalles del Cliente</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="client-detail-section">
            <h3>Información General</h3>
            <div className="detail-grid">
              <div><strong>RUT:</strong> {client.rut}</div>
              <div><strong>Razón Social:</strong> {client.razonSocial}</div>
              <div><strong>Contacto:</strong> {client.nombre}</div>
              <div><strong>Email:</strong> {client.email}</div>
              <div><strong>Giro:</strong> {client.giro || 'N/A'}</div>
              <div><strong>Dirección:</strong> {client.direccion || 'N/A'}</div>
              <div><strong>Comuna:</strong> {client.comuna || 'N/A'}</div>
              <div><strong>Email Facturación:</strong> {client.emailFacturacion || client.email}</div>
            </div>
          </div>

          <div className="client-detail-section">
            <h3>Historial de Compras ({client.purchaseHistory?.length || 0})</h3>
            {client.purchaseHistory && client.purchaseHistory.length > 0 ? (
              <div className="history-list">
                {client.purchaseHistory.slice(0, 5).map((order) => (
                  <div key={order.id} className="history-item">
                    <div>
                      <strong>{order.orderId}</strong>
                      <span className="status-badge">{order.status}</span>
                    </div>
                    <div>{formatCurrency(order.total)}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No hay compras registradas</p>
            )}
          </div>

          <div className="client-detail-section">
            <h3>Cuentas por Cobrar</h3>
            {client.accountsReceivable && client.accountsReceivable.length > 0 ? (
              <div className="ar-list">
                {client.accountsReceivable.map((ar) => (
                  <div key={ar.id} className="ar-item">
                    <div>
                      <strong>Factura {ar.invoiceNumber}</strong>
                      <span>Vence: {new Date(ar.dueDate).toLocaleDateString('es-CL')}</span>
                    </div>
                    <div className="ar-amount">
                      <strong>{formatCurrency(ar.balance)}</strong>
                      <span className={`status-badge ${ar.status}`}>{ar.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No hay cuentas por cobrar</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Clientes

