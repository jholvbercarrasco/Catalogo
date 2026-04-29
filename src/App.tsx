import React, { useState, useMemo, useEffect } from 'react';
import { products, Product } from './data/products';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { Sidebar } from './components/Sidebar';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { HomeHero } from './components/HomeHero';
import { CategoryBar } from './components/CategoryBar';
import { Store, ShoppingCart, Search, Menu, X, ArrowRight, ShieldCheck, Truck, Headphones, CheckCircle2 } from 'lucide-react';
import { AnimatePresence } from 'motion/react';

type View = 'home' | 'catalog';

import { STORE_CONFIG } from './constants';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filter, setFilter] = useState<{ category: string; subcategory?: string }>({ category: 'Todos' });
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);

  // Reset scroll position when view or filter changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, filter]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const normalize = (str: string) => 
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const featuredProducts = useMemo(() => {
    return products
      .filter(p => p.originalPrice && p.originalPrice > p.price)
      .map(p => ({
        ...p,
        discountPercent: Math.round(((p.originalPrice! - p.price) / p.originalPrice!) * 100)
      }))
      .sort((a, b) => b.discountPercent - a.discountPercent)
      .slice(0, 6);
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = normalize(searchQuery);
    return products
      .filter((p) => {
        const matchesCategory = filter.category === 'Todos' || p.category === filter.category;
        const matchesSubcategory = !filter.subcategory || p.subcategory === filter.subcategory;
        const matchesSearch = normalize(p.title).includes(normalizedQuery) || 
                             normalize(p.description).includes(normalizedQuery);
        return matchesCategory && matchesSubcategory && matchesSearch;
      })
      .sort((a, b) => {
        const order: Record<string, number> = { 'Mujeres': 1, 'Hombre': 2 };
        const valA = order[a.subcategory || ''] || 99;
        const valB = order[b.subcategory || ''] || 99;
        return valA - valB;
      });
  }, [filter, searchQuery]);

  const handleSelectCategory = (category: string, subcategory?: string) => {
    setFilter({ category, subcategory });
    setView('catalog');
  };

  const addToCart = (product: Product, quantity: number = 1, selectedSize?: string, selectedColor?: { name: string; hex: string; sku?: string }) => {
    setCart(prev => {
      const cartKey = `${product.id}-${selectedSize || ''}-${selectedColor?.name || ''}`;
      const existingIndex = prev.findIndex(item => 
        `${item.id}-${item.selectedSize || ''}-${item.selectedColor?.name || ''}` === cartKey
      );

      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex] = { 
          ...newCart[existingIndex], 
          quantity: newCart[existingIndex].quantity + quantity 
        };
        return newCart;
      }
      return [...prev, { ...product, quantity, selectedSize, selectedColor }];
    });
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const updateQuantity = (cartKey: string, delta: number) => {
    setCart(prev => prev.map(item => {
      const itemKey = `${item.id}-${item.selectedSize || ''}-${item.selectedColor?.name || ''}`;
      if (itemKey === cartKey) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (cartKey: string) => {
    setCart(prev => prev.filter(item => {
      const itemKey = `${item.id}-${item.selectedSize || ''}-${item.selectedColor?.name || ''}`;
      return itemKey !== cartKey;
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onSelectCategory={handleSelectCategory}
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onItemClick={(product) => {
          setSelectedProduct(product);
          setIsCartOpen(false);
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
            >
              <Menu size={24} />
            </button>
            <button 
              onClick={() => {
                setView('home');
                setFilter({ category: 'Todos' });
              }}
              className="flex items-center gap-2 text-blue-600 hover:opacity-80 transition-opacity"
            >
              <Store size={28} className="flex-shrink-0" />
              <span className="font-bold text-xl tracking-tight text-gray-900 hidden sm:block">MiCatálogo</span>
            </button>
          </div>
          
          <div className="flex-1 max-w-2xl">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Buscar productos..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (view === 'home') setView('catalog');
                }}
                className="w-full bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-full py-2 pl-10 pr-4 text-sm transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-grow">
        <CategoryBar 
          onSelectCategory={handleSelectCategory} 
          activeCategory={filter.category}
        />
        {view === 'home' ? (
          <div className="flex flex-col">
            <HomeHero onExplore={() => setView('catalog')} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Productos Destacados</h2>
                <button 
                  onClick={() => {
                    setFilter({ category: 'Todos' });
                    setView('catalog');
                  }}
                  className="flex items-center gap-2 text-blue-600 font-semibold hover:underline"
                >
                  Ver Catálogo completo <ArrowRight size={18} />
                </button>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                {featuredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={() => setSelectedProduct(product)} 
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué comprar con nosotros?</h2>
                  <p className="text-gray-500 max-w-2xl mx-auto">Nos esforzamos por brindarte la mejor experiencia de compra con productos de calidad y atención personalizada.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 transition-all hover:shadow-lg">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                      <ShieldCheck size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Calidad Garantizada</h3>
                    <p className="text-gray-500">Seleccionamos cuidadosamente cada prenda para asegurar que recibas lo mejor en tela y acabados.</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 transition-all hover:shadow-lg">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                      <Truck size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Envíos Seguros</h3>
                    <p className="text-gray-500">Realizamos envíos a todo el Perú con seguimiento constante para que tu pedido llegue a tiempo.</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 transition-all hover:shadow-lg">
                    <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6">
                      <Headphones size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Atención Personalizada</h3>
                    <p className="text-gray-500">¿Tienes dudas con tu talla? Escríbenos al WhatsApp y te asesoramos de inmediato.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* How to Buy */}
            <div className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-blue-600 rounded-3xl p-8 sm:p-16 text-white overflow-hidden relative">
                  <div className="relative z-10">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Cómo realizar tu pedido en 3 pasos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center font-bold text-2xl mb-6">1</div>
                        <h3 className="text-xl font-bold mb-3">Elige tus productos</h3>
                        <p className="text-blue-100">Navega por nuestro catálogo y añade tus prendas favoritas al carrito.</p>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center font-bold text-2xl mb-6">2</div>
                        <h3 className="text-xl font-bold mb-3">Revisa tu carrito</h3>
                        <p className="text-blue-100">Verifica tallas y colores en "Mi Pedido" antes de confirmar.</p>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center font-bold text-2xl mb-6">3</div>
                        <h3 className="text-xl font-bold mb-3">Confirma por WhatsApp</h3>
                        <p className="text-blue-100">Presiona el botón de pago y envíanos el mensaje para coordinar la entrega.</p>
                      </div>
                    </div>
                    <div className="mt-16 flex justify-center">
                      <button 
                        onClick={() => {
                          setFilter({ category: 'Todos' });
                          setView('catalog');
                        }}
                        className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all flex items-center gap-2"
                      >
                        Empezar a comprar <ArrowRight size={20} />
                      </button>
                    </div>
                  </div>
                  {/* Decorative background elements */}
                  <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 w-full">
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-blue-600 font-medium mb-2">
                  <button onClick={() => setView('home')} className="hover:underline">Inicio</button>
                  {filter.category !== 'Todos' && (
                    <>
                      <span className="text-gray-400">/</span>
                      <span>{filter.category}</span>
                    </>
                  )}
                  {filter.subcategory && (
                    <>
                      <span className="text-gray-400">/</span>
                      <span>{filter.subcategory}</span>
                    </>
                  )}
                </div>
                <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
                  {filter.category === 'Todos' ? 'Nuestros Productos' : filter.category}
                  {filter.subcategory && <span className="text-gray-400 font-normal"> • {filter.subcategory}</span>}
                </h1>
                <p className="text-gray-500 text-base sm:text-lg max-w-2xl">
                  {filter.category === 'Todos' 
                    ? 'Explora nuestra colección completa de artículos destacados.' 
                    : `Viendo productos en la categoría ${filter.category}${filter.subcategory ? ` (${filter.subcategory})` : ''}.`}
                </p>
              </div>

              {filter.category !== 'Todos' && (
                <button 
                  onClick={() => setFilter({ category: 'Todos' })}
                  className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm"
                >
                  <X size={16} />
                  Limpiar filtros
                </button>
              )}
            </div>

            {filteredProducts.length > 0 ? (
              <div className="space-y-12">
                {filter.category === 'Todos' ? (
                  // Group by Category when viewing all
                  Array.from(new Set(filteredProducts.map(p => p.category))).map(cat => {
                    const catProducts = filteredProducts.filter(p => p.category === cat);
                    return (
                      <div key={cat} className="space-y-6">
                        <div className="flex items-center gap-4">
                          <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-blue-600 pl-4">
                            {cat}
                          </h2>
                          <div className="h-[1px] flex-grow bg-gray-200"></div>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
                          {catProducts.map((product) => (
                            <ProductCard 
                              key={product.id} 
                              product={product} 
                              onClick={() => setSelectedProduct(product)} 
                              onAddToCart={addToCart}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  // Group by Subcategory when a category is selected
                  Array.from(new Set(filteredProducts.map(p => p.subcategory))).map(sub => {
                    const subProducts = filteredProducts.filter(p => p.subcategory === sub);
                    if (subProducts.length === 0) return null;
                    
                    return (
                      <div key={sub || 'otros'} className="space-y-6">
                        {sub && (
                          <div className="flex items-center gap-4">
                            <h2 className="text-xl font-bold text-gray-800 bg-blue-50 px-4 py-1 rounded-lg border border-blue-100">
                              {sub}
                            </h2>
                            <div className="h-[1px] flex-grow bg-gray-200"></div>
                          </div>
                        )}
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
                          {subProducts.map((product) => (
                            <ProductCard 
                              key={product.id} 
                              product={product} 
                              onClick={() => setSelectedProduct(product)} 
                              onAddToCart={addToCart}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                  <Search size={40} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron productos</h3>
                <p className="text-gray-500">Intenta ajustar tus filtros o búsqueda.</p>
                <button 
                  onClick={() => {
                    setFilter({ category: 'Todos' });
                    setSearchQuery('');
                  }}
                  className="mt-6 text-blue-600 font-medium hover:underline"
                >
                  Ver todos los productos
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">{STORE_CONFIG.name}</h3>
              <p className="text-gray-500 text-sm">Tu tienda de confianza para moda y accesorios de calidad en todo el Perú.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contacto</h3>
              <ul className="text-gray-500 text-sm space-y-2">
                <li>WhatsApp: +{STORE_CONFIG.phone}</li>
                <li>Email: {STORE_CONFIG.email}</li>
                <li>Ubicación: {STORE_CONFIG.address}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Síguenos</h3>
              <div className="flex justify-center md:justify-start gap-4">
                <a href={STORE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">Facebook</a>
                <a href={STORE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600 transition-colors">Instagram</a>
                <a href={STORE_CONFIG.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors">TikTok</a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-100 text-center text-gray-400 text-xs">
            <p>&copy; {new Date().getFullYear()} {STORE_CONFIG.name}. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            onAddToCart={addToCart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
