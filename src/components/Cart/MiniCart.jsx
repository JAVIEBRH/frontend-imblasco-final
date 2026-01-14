import { ShoppingCart, X, Trash2 } from 'lucide-react'

/**
 * Mini Carrito - Dropdown del carrito de compras
 */
const MiniCart = ({ isOpen, onClose, items = [], onRemoveItem, onViewCart, onCheckout }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  if (!isOpen) return null

  return (
    <div className="wd-cart-dropdown wd-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <span className="font-semibold text-[#333]">Carrito ({items.length})</span>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={18} />
        </button>
      </div>

      {/* Items */}
      {items.length === 0 ? (
        <div className="p-8 text-center">
          <ShoppingCart size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-[13px] text-[#777]">Tu carrito está vacío</p>
        </div>
      ) : (
        <>
          <div className="max-h-[250px] overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="wd-cart-item">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="wd-cart-item-img"
                />
                <div className="flex-1">
                  <h4 className="wd-cart-item-title line-clamp-2">{item.name}</h4>
                  <p className="text-[12px] text-[#777] mt-1">
                    {item.quantity} x <span className="wd-cart-item-price">${item.price.toLocaleString()}</span>
                  </p>
                </div>
                <button 
                  onClick={() => onRemoveItem(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="wd-cart-total border-t border-gray-100">
            <span>Subtotal:</span>
            <span className="text-[#f4a51c]">${subtotal.toLocaleString()}</span>
          </div>

          {/* Actions */}
          <div className="wd-cart-actions">
            <button 
              onClick={onViewCart}
              className="wd-btn wd-btn-outline flex-1 text-[12px]"
            >
              Ver Carrito
            </button>
            <button 
              onClick={onCheckout}
              className="wd-btn wd-btn-primary flex-1 text-[12px]"
            >
              Finalizar Compra
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default MiniCart

