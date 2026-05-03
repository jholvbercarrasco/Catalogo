import React, { useState, useEffect } from 'react';
import { Product } from '../data/products';
import { X, ChevronLeft, ChevronRight, ShoppingCart, Plus, Minus, Check, Ruler, ArrowLeft, Share2, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size?: string, color?: { name: string; hex: string }) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string; sku?: string; image?: string; stockCount?: number; inStock?: boolean } | undefined>(undefined);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = React.useRef(false);
  const scrollTimeout = React.useRef<NodeJS.Timeout>();
  const [showShareToast, setShowShareToast] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}?product=${product.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Mira este producto: ${product.title}`,
          text: product.description,
          url: url,
        });
      } catch (error) {
        // If user cancels share, just log it or ignore
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      try {
        await navigator.clipboard.writeText(url);
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Sync scroll position when index changes (arrows/thumbnails)
  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.offsetWidth * currentImageIndex;
      if (Math.abs(container.scrollLeft - scrollAmount) > 10) {
        isProgrammaticScroll.current = true;
        container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 600); // Increased based timeout
      }
    }
  }, [currentImageIndex]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isProgrammaticScroll.current) {
      // Extend timeout while actively scrolling programmatically
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 150);
      return;
    }
    const container = e.currentTarget;
    const index = Math.round(container.scrollLeft / container.offsetWidth);
    if (index !== currentImageIndex && index >= 0 && index < product.images.length) {
      setCurrentImageIndex(index);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const selectedVariantByColor = product.variants?.find(v => v.size === selectedSize && selectedColor && v.color === selectedColor.name);
  const selectedVariantBySize = product.variants?.find(v => v.size === selectedSize && !v.color);
  const selectedVariant = selectedVariantByColor || selectedVariantBySize;

  const currentPrice = selectedVariant?.price ?? product.price;
  const currentOriginalPrice = selectedVariant?.originalPrice ?? product.originalPrice;
  const currentSku = selectedVariant?.sku ?? selectedColor?.sku ?? product.sku;
  const currentInStock = selectedColor?.inStock ?? (selectedVariant ? (selectedVariant.inStock ?? true) : product.inStock);

  const currentStockCount = selectedColor?.stockCount ?? selectedVariant?.stockCount ?? product.stockCount;
  const currentColors = selectedVariantBySize?.colors ?? product.colors;

  const discount = currentOriginalPrice && currentOriginalPrice > currentPrice
    ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
    : 0;

  const shortDescription = product.description.indexOf('.') !== -1 
    ? product.description.substring(0, product.description.indexOf('.') + 1) 
    : product.description;
  const hasMoreText = product.description.length > shortDescription.length;
  const quantityLabel = product.category === 'Hogar' ? 'Cantidad de artículos:' : 'Cantidad de prendas:';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-5xl bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[90vh] sm:h-auto sm:max-h-[90vh]"
      >
        {/* Modal Header Actions */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          {showShareToast && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-black/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm"
            >
              Enlace copiado
            </motion.div>
          )}
          <button
            onClick={handleShare}
            className="p-2 bg-white/90 backdrop-blur-sm hover:bg-gray-100 rounded-full text-gray-800 shadow-md transition-all active:scale-90 border border-gray-100"
            aria-label="Compartir producto"
          >
            <Share2 size={20} />
          </button>
          <button
            onClick={onClose}
            className="p-2 bg-white/90 backdrop-blur-sm hover:bg-gray-100 rounded-full text-gray-800 shadow-md transition-all active:scale-90 border border-gray-100"
            aria-label="Cerrar ventana"
          >
            <X size={20} />
          </button>
        </div>

        {/* Image Gallery Section */}
        <div className="w-full md:w-1/2 bg-gray-50 p-0 sm:p-6 flex flex-col items-center justify-start sm:justify-center overflow-hidden sm:overflow-visible flex-shrink-0">
          {/* Main Image Container with Swipe Support */}
          <div className="relative w-full aspect-square sm:rounded-xl overflow-hidden bg-white shadow-sm sm:mb-4 group">
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide bg-white"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {product.images.map((img, idx) => (
                <div key={idx} className="w-full h-full flex-shrink-0 snap-center flex items-center justify-center">
                  <img
                    src={img}
                    alt={`${product.title} - Imagen ${idx + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows (Hidden on small touch devices, shown on hover in desktop) */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-md text-gray-800 opacity-0 sm:group-hover:opacity-100 transition-opacity hidden sm:flex"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-md text-gray-800 opacity-0 sm:group-hover:opacity-100 transition-opacity hidden sm:flex"
            >
              <ChevronRight size={20} />
            </button>

            {/* Mobile Swipe Indicator (HomeHero style dots) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:hidden z-10 flex gap-2 bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10 shadow-lg">
              {product.images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentImageIndex === idx ? 'w-8 bg-white' : 'w-2 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnails (5 photos) - Hidden on mobile, shown on desktop */}
          <div className="hidden sm:flex gap-2 w-full overflow-x-auto pb-2 snap-x px-1 flex-shrink-0">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all snap-center ${
                  currentImageIndex === idx ? 'border-blue-600 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="w-full md:w-1/2 p-4 sm:p-10 flex flex-col overflow-y-auto bg-white pb-24 sm:pb-10">
          <div className="mb-1">
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>
          
          <h2 className="text-lg sm:text-3xl font-bold text-gray-900 mt-1 mb-0.5">
            {product.title} <span className="text-xs sm:text-base font-normal text-gray-400 ml-1">#{currentSku}</span>
          </h2>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="flex flex-col">
              {currentOriginalPrice && currentOriginalPrice > currentPrice && (
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-lg text-gray-400 line-through">
                    S/ {currentOriginalPrice.toFixed(2)}
                  </span>
                  <span className="bg-red-600 text-white text-[9px] sm:text-xs font-bold px-1.5 py-0.5 rounded">
                    -{discount}% DCTO
                  </span>
                </div>
              )}
              <span className="text-xl sm:text-3xl font-bold text-blue-600">
                {product.variants && product.variants.length > 0 && !selectedSize && <span className="text-sm sm:text-lg text-gray-500 font-normal mr-1.5">Desde</span>}
                S/ {currentPrice.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="prose prose-sm sm:prose-base text-gray-600 mb-3 sm:mb-8 bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-100 flex flex-col items-start transition-all">
            <p className="leading-snug italic text-[11px] sm:text-base whitespace-pre-line m-0">
              {isDescriptionExpanded ? product.description : shortDescription}
            </p>
            {hasMoreText && (
              <button 
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="text-blue-600 hover:text-blue-700 text-[11px] sm:text-sm font-semibold flex items-center gap-1 mt-2 cursor-pointer transition-colors"
                aria-expanded={isDescriptionExpanded}
              >
                {isDescriptionExpanded ? 'Ocultar descripción' : 'Ver más'}
                <ChevronDown size={14} className={`transition-transform duration-300 ${isDescriptionExpanded ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>

          <div className="space-y-3 sm:space-y-6 mb-4 sm:mb-8">
            {/* Size Selector */}
            {product.sizes && (
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-2">Talla:</label>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        const variant = product.variants?.find(v => v.size === size);
                        if (variant && variant.colors) {
                          if (!variant.colors.find(c => c.name === selectedColor?.name)) {
                            setSelectedColor(undefined);
                          }
                        } else if (product.colors) {
                          if (!product.colors.find(c => c.name === selectedColor?.name)) {
                            setSelectedColor(undefined);
                          }
                        } else {
                          setSelectedColor(undefined);
                        }
                        if (variant && variant.image) {
                          const imgIdx = product.images.findIndex(img => img === variant.image);
                          if (imgIdx !== -1) {
                            setCurrentImageIndex(imgIdx);
                          }
                        }
                      }}
                      className={`min-w-[40px] sm:min-w-[48px] h-10 sm:h-12 flex items-center justify-center rounded-lg border-2 text-xs sm:text-sm font-medium transition-all ${
                        selectedSize === size 
                          ? 'border-blue-600 bg-blue-50 text-blue-600' 
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Measurements Display */}
                {selectedSize && product.measurements?.[selectedSize] && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={selectedSize}
                    className="mt-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100"
                  >
                    <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm mb-3">
                      <Ruler size={16} />
                      <span>Guía de Medidas (Talla {selectedSize})</span>
                    </div>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                      {Object.entries(product.measurements[selectedSize]).map(([label, value]) => (
                        <div key={label} className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-wider text-blue-500 font-bold">{label}</span>
                          <span className="text-sm font-medium text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Color Selector */}
            {currentColors && (
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Color: {selectedColor?.name}</label>
                <div className="flex flex-wrap gap-2">
                  {currentColors.map((color, idx) => (
                    <button
                      key={color.name}
                      onClick={() => {
                        setSelectedColor(color);
                        if (color.stockCount !== undefined && quantity > color.stockCount) {
                          setQuantity(color.stockCount);
                        } else if (color.stockCount === 0 || color.inStock === false) {
                          setQuantity(1);
                        }
                        
                        if (color.image) {
                          const imgIdx = product.images.findIndex(img => img === color.image);
                          if (imgIdx !== -1) {
                            setCurrentImageIndex(imgIdx);
                          }
                        } else if (idx < product.images.length) {
                          setCurrentImageIndex(idx);
                        }
                      }}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedColor?.name === color.name ? 'border-blue-600 scale-110' : 'border-transparent'
                      }`}
                    >
                      <span 
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-gray-200 flex items-center justify-center" 
                        style={{ backgroundColor: color.hex }}
                      >
                        {selectedColor?.name === color.name && (
                          <Check size={14} className={color.hex === '#ffffff' ? 'text-gray-900' : 'text-white'} />
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className={currentInStock === false ? 'opacity-50 pointer-events-none' : ''}>
              <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-2">{quantityLabel}</label>
              <div className="flex items-center gap-3 bg-gray-50 w-fit p-1 rounded-xl border border-gray-100">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={currentInStock === false}
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-white hover:text-blue-600 rounded-lg transition-all text-gray-500"
                >
                  <Minus size={16} />
                </button>
                <span className="text-sm sm:text-lg font-bold text-gray-900 w-6 text-center">{quantity}</span>
                <button 
                  onClick={() => {
                    if (currentStockCount !== undefined && quantity >= currentStockCount) {
                      return;
                    }
                    setQuantity(quantity + 1);
                  }}
                  disabled={currentInStock === false || (currentStockCount !== undefined && quantity >= currentStockCount)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg transition-all ${
                    currentStockCount !== undefined && quantity >= currentStockCount 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'hover:bg-white hover:text-blue-600 text-gray-500'
                  }`}
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="mt-2.5">
                {currentInStock === false ? (
                  <span className="text-gray-500 text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
                    Agotado
                  </span>
                ) : currentStockCount !== undefined && currentStockCount > 0 ? (
                  <span className="text-green-600 text-[11px] sm:text-xs font-medium">
                    Stock disponible: {currentStockCount} unidades
                  </span>
                ) : (
                  <span className="text-green-600 text-[11px] sm:text-xs font-medium">
                    Disponible
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-auto pt-4 sm:pt-6 border-t border-gray-100 pb-safe space-y-3 hidden sm:block">
            <button 
              onClick={() => onAddToCart(product, quantity, selectedSize, selectedColor)}
              disabled={currentInStock === false || (currentColors && currentColors.length > 0 && !selectedColor) || (product.sizes && product.sizes.length > 0 && !selectedSize)}
              className={`w-full flex items-center justify-center gap-2 py-4 px-8 rounded-xl font-bold text-lg transition-colors shadow-sm ${
                currentInStock === false
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : (currentColors && currentColors.length > 0 && !selectedColor) || (product.sizes && product.sizes.length > 0 && !selectedSize)
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white hover:shadow-md'
              }`}
            >
              <ShoppingCart size={20} />
              {currentInStock === false ? 'Producto Agotado' : (currentColors && currentColors.length > 0 && !selectedColor) ? 'Selecciona un color' : (product.sizes && product.sizes.length > 0 && !selectedSize) ? 'Selecciona una talla' : 'Añadir a mi pedido'}
            </button>
            
            <button 
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-700 py-3 px-8 rounded-xl font-bold text-base hover:bg-gray-50 transition-all active:scale-[0.98]"
            >
              <ArrowLeft size={18} />
              Seguir viendo productos
            </button>

            <p className="text-center text-xs sm:text-sm text-gray-500 mt-3">
              Envío gratis en pedidos superiores a S/ 150
            </p>
          </div>
        </div>

        {/* Floating Mobile Actions */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 p-3 pb-safe z-30 shadow-[0_-8px_15px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col gap-1.5">
            <button 
              onClick={() => onAddToCart(product, quantity, selectedSize, selectedColor)}
              disabled={currentInStock === false || (currentColors && currentColors.length > 0 && !selectedColor) || (product.sizes && product.sizes.length > 0 && !selectedSize)}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-base shadow-lg ${
                currentInStock === false
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                  : (currentColors && currentColors.length > 0 && !selectedColor) || (product.sizes && product.sizes.length > 0 && !selectedSize)
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-none'
                  : 'bg-blue-600 active:bg-blue-700 text-white shadow-blue-500/20'
              }`}
            >
              <ShoppingCart size={18} />
              {currentInStock === false ? 'Producto Agotado' : (currentColors && currentColors.length > 0 && !selectedColor) ? 'Selecciona un color' : (product.sizes && product.sizes.length > 0 && !selectedSize) ? 'Selecciona una talla' : 'Añadir a mi pedido'}
            </button>
            <button 
              onClick={onClose}
              className="w-full flex items-center justify-center gap-1.5 text-gray-500 py-1 rounded-lg font-semibold text-[11px]"
            >
              <ArrowLeft size={14} />
              Seguir viendo productos
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
