import { Eye, ShoppingCart, Heart } from 'lucide-react'

/**
 * Card de producto individual
 */
const ProductCard = ({ product, onQuickView, onAddToCart, onAddToWishlist }) => {
  return (
    <div className="wd-product-card relative group">
      {/* Badge */}
      {product.llegada && (
        <div className="wd-product-badge">
          PRÓXIMA LLEGADA<br />
          <span className="text-[9px]">{product.llegada}</span>
        </div>
      )}

      {/* Imagen */}
      <div className="relative aspect-square bg-white overflow-hidden">
        <img 
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay de acciones */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <button 
            onClick={() => onQuickView(product)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#f4a51c] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0"
            title="Vista rápida"
          >
            <Eye size={18} />
          </button>
          <button 
            onClick={() => onAddToCart(product)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#f4a51c] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 delay-75"
            title="Añadir al carrito"
          >
            <ShoppingCart size={18} />
          </button>
          <button 
            onClick={() => onAddToWishlist(product)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#f4a51c] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 delay-150"
            title="Añadir a favoritos"
          >
            <Heart size={18} />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 border-t border-gray-50">
        {/* Categorías */}
        <div className="wd-product-categories mb-2 line-clamp-1">
          {product.categories?.slice(0, 2).join(', ')}
        </div>

        {/* Nombre */}
        <h3 
          className="wd-product-title line-clamp-2 cursor-pointer min-h-[40px]"
          onClick={() => onQuickView(product)}
        >
          {product.name}
        </h3>

        {/* Precio */}
        <p className="wd-product-price mt-2">
          Inicia sesión para ver el precio
        </p>

        {/* Variantes o Stock */}
        {product.variants ? (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="text-[#333] font-semibold">
                  <td className="py-0.5">Color</td>
                  <td className="py-0.5 text-right">Stock</td>
                </tr>
              </thead>
              <tbody className="text-[#777]">
                {product.variants.slice(0, 3).map((variant, idx) => (
                  <tr key={idx}>
                    <td className="py-0.5">{variant.color}</td>
                    <td className="py-0.5 text-right">{variant.stock.toLocaleString()}</td>
                  </tr>
                ))}
                {product.variants.length > 3 && (
                  <tr>
                    <td colSpan="2" className="py-1 text-[10px] text-[#f4a51c]">
                      +{product.variants.length - 3} colores más
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="wd-product-stock mt-2">
            Stock: <strong className="text-[#333]">{product.stock?.toLocaleString()}</strong>
          </p>
        )}

        {/* Código y descripción */}
        <p className="text-[11px] text-[#777] mt-2 line-clamp-2">
          <strong className="text-[#333]">{product.code}</strong> - {product.description}
        </p>
      </div>
    </div>
  )
}

export default ProductCard

