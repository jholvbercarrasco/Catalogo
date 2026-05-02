import React, { useState, useMemo } from 'react';
import { Product } from '../data/products';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onClick, onAddToCart }: ProductCardProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const currentPrice = product.variants && product.variants.length > 0 
    ? Math.min(...product.variants.map(v => v.price)) 
    : product.price;

  const currentOriginalPrice = product.variants && product.variants.length > 0
    ? product.variants.find(v => v.price === currentPrice)?.originalPrice ?? product.originalPrice
    : product.originalPrice;

  const discount = currentOriginalPrice && currentOriginalPrice > currentPrice
    ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
    : 0;

  const allColors = useMemo(() => {
    if (product.colors) return product.colors;
    if (product.variants) {
      const uniqueColors = new Map<string, {name: string, hex: string, image?: string}>();
      product.variants.forEach(variant => {
        if (variant.colors) {
          variant.colors.forEach(c => uniqueColors.set(c.name, c));
        }
      });
      if (uniqueColors.size > 0) {
        return Array.from(uniqueColors.values());
      }
    }
    return undefined;
  }, [product.colors, product.variants]);

  const cardInStock = product.variants && product.variants.length > 0
    ? product.variants.some(v => v.inStock !== false)
    : product.inStock;

  const cardStockCount = product.variants && product.variants.length > 0
    ? product.variants.reduce((acc, v) => acc + (v.stockCount || 0), 0)
    : product.stockCount;

  // Usa la imagen seleccionada o la original
  const currentImage = product.images[activeImageIndex] || product.images[0];

  const shortDescription = product.description.indexOf('.') !== -1 
    ? product.description.substring(0, product.description.indexOf('.') + 1) 
    : product.description;

  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={currentImage}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1.5">
          {cardInStock === false && (
            <span className="text-[10px] sm:text-xs font-bold bg-red-600 text-white px-2 py-1 sm:px-2.5 sm:py-1 rounded-full shadow-sm w-fit uppercase tracking-wider">
              Agotado
            </span>
          )}
          <span className="text-[10px] sm:text-xs font-medium bg-white/90 backdrop-blur-sm px-2 py-1 sm:px-2.5 sm:py-1 rounded-full text-gray-700 shadow-sm w-fit">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-5 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-900 text-sm sm:text-lg mb-1 line-clamp-2 sm:line-clamp-1 group-hover:text-blue-600 transition-colors leading-tight">
          {product.title} <span className="text-[10px] sm:text-xs font-normal text-gray-400 ml-1">#{product.sku}</span>
        </h3>
        <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 md:line-clamp-3 mb-3 sm:mb-4 flex-grow">
          {shortDescription}
        </p>

        {/* Mini Color Selector */}
        {allColors && (
          <div className="flex flex-wrap gap-1 mb-2 mt-1 sm:mt-0">
            {allColors.map((color, idx) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.stopPropagation();
                  if (color.image) {
                    const imgIdx = product.images.findIndex(img => img === color.image);
                    if (imgIdx !== -1) {
                      setActiveImageIndex(imgIdx);
                    }
                  } else if (idx < product.images.length) {
                    setActiveImageIndex(idx);
                  }
                }}
                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border flex flex-shrink-0 items-center justify-center transition-all ${
                  activeImageIndex === (color.image ? product.images.findIndex(img => img === color.image) : idx < product.images.length ? idx : 0) ? 'border-gray-500 scale-110' : 'border-transparent'
                }`}
                title={color.name}
              >
                <span 
                  className="w-full h-full rounded-full border border-gray-200"
                  style={{ backgroundColor: color.hex }}
                />
              </button>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between mt-auto pt-2 sm:pt-3 border-t border-gray-50">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              {currentOriginalPrice && currentOriginalPrice > currentPrice && (
                <>
                  <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                    S/ {currentOriginalPrice.toFixed(2)}
                  </span>
                  <span className="text-[10px] font-bold bg-red-600 text-white px-1.5 py-0.5 rounded leading-none">
                    -{discount}%
                  </span>
                </>
              )}
            </div>
            <span className="text-base sm:text-xl font-bold text-gray-900">
              {product.variants && product.variants.length > 0 && <span className="text-xs text-gray-500 font-normal mr-1">Desde</span>}
              S/ {currentPrice.toFixed(2)}
            </span>
            <span className="text-[10px] sm:text-xs font-medium mt-0.5" style={{ color: cardInStock === false ? '#9CA3AF' : '#16A34A' }}>
              {cardInStock === false 
                ? "Agotado" 
                : (cardStockCount !== undefined && cardStockCount > 0 
                  ? `Stock: ${cardStockCount} unid.` 
                  : "Disponible")}
            </span>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (cardInStock !== false) {
                if ((allColors && allColors.length > 0) || (product.sizes && product.sizes.length > 0)) {
                  // If it has variants/colors, we need them to choose! Open the modal instead.
                  onClick(product);
                } else {
                  onAddToCart(product);
                }
              }
            }}
            disabled={cardInStock === false}
            className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-colors ${
              cardInStock === false 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600'
            }`}
          >
            <ShoppingBag size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
