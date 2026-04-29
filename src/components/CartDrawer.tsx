import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, MessageCircle, ArrowLeft } from 'lucide-react';
import { Product } from '../data/products';

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: { name: string; hex: string; sku?: string };
}

import { STORE_CONFIG } from '../constants';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartKey: string, delta: number) => void;
  onRemove: (cartKey: string) => void;
  onItemClick: (product: Product) => void;
}

export function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemove, onItemClick }: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `¡Hola! Me gustaría confirmar mi pedido:\n\n` +
      items.map(item => {
        let details = '';
        if (item.selectedSize) details += ` [Talla: ${item.selectedSize}]`;
        if (item.selectedColor) details += ` [Color: ${item.selectedColor.name}]`;
        return `- ${item.title} (#${item.selectedColor?.sku || item.sku})${details} (${item.quantity} x S/ ${item.price.toFixed(2)})`;
      }).join('\n') +
      `\n\nTotal: S/ ${total.toFixed(2)}\n\n¿Cómo procedo con el pago?`
    );
    window.open(`https://wa.me/${STORE_CONFIG.phone}?text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Mi Pedido</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                <X size={20} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Trash2 size={24} />
                  </div>
                  <p className="mb-6">Tu pedido está vacío</p>
                  <button 
                    onClick={onClose}
                    className="flex items-center gap-2 text-blue-600 font-bold hover:underline"
                  >
                    <ArrowLeft size={18} />
                    Seguir viendo productos
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => {
                    const cartKey = `${item.id}-${item.selectedSize || ''}-${item.selectedColor?.name || ''}`;
                    const discount = item.originalPrice && item.originalPrice > item.price
                      ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                      : 0;

                    return (
                      <div key={cartKey} className="flex gap-4 group">
                        <div 
                          onClick={() => onItemClick(item)}
                          className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                        >
                          <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-grow">
                          <h3 
                            onClick={() => onItemClick(item)}
                            className="font-semibold text-gray-900 text-sm cursor-pointer hover:text-blue-600 transition-colors"
                          >
                            {item.title} <span className="text-[10px] font-normal text-gray-400 ml-1">#{item.selectedColor?.sku || item.sku}</span>
                          </h3>
                          
                          <div className="flex flex-wrap gap-2 mt-1">
                            {item.selectedSize && (
                              <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                                Talla: {item.selectedSize}
                              </span>
                            )}
                            {item.selectedColor && (
                              <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600 flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.selectedColor.hex }} />
                                {item.selectedColor.name}
                              </span>
                            )}
                          </div>

                          <div className="mt-1">
                            {item.originalPrice && item.originalPrice > item.price ? (
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400 line-through">S/ {item.originalPrice.toFixed(2)}</span>
                                <span className="text-blue-600 font-bold text-sm">S/ {item.price.toFixed(2)}</span>
                                <span className="text-[10px] font-bold bg-red-600 text-white px-1 rounded">-{discount}%</span>
                              </div>
                            ) : (
                              <p className="text-blue-600 font-bold text-sm">S/ {item.price.toFixed(2)}</p>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-2 py-1">
                              <button 
                                onClick={() => onUpdateQuantity(cartKey, -1)}
                                className="p-1 hover:text-blue-600 transition-colors"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => onUpdateQuantity(cartKey, 1)}
                                className="p-1 hover:text-blue-600 transition-colors"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <button 
                              onClick={() => onRemove(cartKey)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between mb-6">
                <span className="text-gray-600 font-medium">Monto Total</span>
                <span className="text-2xl font-bold text-gray-900">S/ {total.toFixed(2)}</span>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-800 leading-relaxed">
                  Para confirmar un pedido tendrá que contactarse vía WhatsApp con el agente, y debe hacer un adelanto o pago total de la compra.
                </p>
              </div>

              <button 
                onClick={handleWhatsAppClick}
                disabled={items.length === 0}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg active:scale-[0.98] mb-3"
              >
                <MessageCircle size={22} />
                Ir a pagar a WhatsApp
              </button>

              <button 
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all active:scale-[0.98]"
              >
                Seguir Comprando
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
