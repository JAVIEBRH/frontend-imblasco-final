import { useState } from 'react'
import { X, Minus, Plus, ShoppingCart, Heart, Share2 } from 'lucide-react'

/**
 * Vista rápida de producto - Modal
 */
const ProductQuickView = ({ product, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(
    product?.variants?.[0]?.color || null
  )

  if (!isOpen || !product) return null

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta))
  }

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      quantity,
      selectedColor
    })
    onClose()
  }

  const currentStock = product.variants 
    ? product.variants.find(v => v.color === selectedColor)?.stock || 0
    : product.stock || 0

  return (
    <div className="wd-modal-overlay" onClick={onClose}>
      <div 
        className="bg-white max-w-[900px] w-full mx-4 p-0 relative wd-slide-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Imagen */}
          <div className="md:w-1/2 bg-gray-50 p-8">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-contain max-h-[400px]"
            />
          </div>

          {/* Info */}
          <div className="md:w-1/2 p-6">
            {/* Categorías */}
            <div className="wd-product-categories mb-2">
              {product.categories?.slice(0, 2).join(', ')}
            </div>

            {/* Título */}
            <h2 className="text-[20px] font-semibold text-[#242424] mb-4">
              {product.name}
            </h2>

            {/* Precio */}
            <div className="mb-6">
              <span className="text-[18px] font-bold text-[#f4a51c]">
                Inicia sesión para ver el precio
              </span>
            </div>

            {/* Descripción */}
            <p className="text-[14px] text-[#777] mb-6 leading-relaxed">
              <strong className="text-[#333]">{product.code}</strong> - {product.description}
            </p>

            {/* Selector de color */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <label className="block text-[14px] font-semibold text-[#333] mb-3">
                  Color: <span className="font-normal text-[#777]">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.color}
                      onClick={() => setSelectedColor(variant.color)}
                      className={`px-4 py-2 text-[12px] border transition-all ${
                        selectedColor === variant.color
                          ? 'border-[#f4a51c] bg-[#f4a51c]/10 text-[#f4a51c]'
                          : 'border-gray-200 text-[#666] hover:border-[#f4a51c]'
                      }`}
                    >
                      {variant.color}
                      <span className="ml-1 text-[10px]">({variant.stock})</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock */}
            <div className="mb-6">
              <span className="text-[13px] text-[#777]">
                Stock disponible: <strong className="text-[#333]">{currentStock.toLocaleString()}</strong>
              </span>
            </div>

            {/* Cantidad y botón */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-200">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 flex items-center justify-center text-[#777] hover:text-[#333] transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center text-[14px] font-semibold">
                  {quantity}
                </span>
                <button 
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 flex items-center justify-center text-[#777] hover:text-[#333] transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="wd-btn wd-btn-primary flex-1 gap-2"
                disabled={currentStock === 0}
              >
                <ShoppingCart size={18} />
                Añadir al Carrito
              </button>
            </div>

            {/* Acciones secundarias */}
            <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
              <button className="flex items-center gap-2 text-[13px] text-[#777] hover:text-[#f4a51c] transition-colors">
                <Heart size={16} />
                Añadir a favoritos
              </button>
              <button className="flex items-center gap-2 text-[13px] text-[#777] hover:text-[#f4a51c] transition-colors">
                <Share2 size={16} />
                Compartir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductQuickView

