import React, { useState, useMemo, useEffect } from 'react';
import { products, Product } from './data/products';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { Sidebar } from './components/Sidebar';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { HomeHero } from './components/HomeHero';
import { CategoryBar } from './components/CategoryBar';
import { Store, ShoppingCart, Search, Menu, X, ArrowRight, ShieldCheck, Truck, Headphones, CheckCircle2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

type View = 'home' | 'catalog';

import { STORE_CONFIG } from './constants';

export default function App() {
  const [appProducts, setAppProducts] = useState<Product[]>(products);
  const [view, setView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filter, setFilter] = useState<{ category: string; subcategory?: string }>({ category: 'Todos' });
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [sortOrder, setSortOrder] = useState<'relevancia' | 'precio-asc' | 'precio-desc'>('relevancia');

  // Check for shared product in URL on initial load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('product');
    if (productId) {
      const product = appProducts.find(p => p.id === productId);
      if (product) {
        setSelectedProduct(product);
      }
    }
  }, [appProducts]);

  // Fetch live inventory
  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbxeGWuAITnNlFFjTcmbTWKydLDlD-qjDYbdTUHrQcBC6UV-8gEE-EcWQUhMZ66pVfdIKQ/exec')
      .then(async res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return res.json();
        } else {
          // If it's not JSON, it might be the Google Login HTML page
          const text = await res.text();
          throw new Error("La API no devolvió un JSON. Asegúrate de configurar el acceso a 'Cualquier persona' en tu Google Apps Script.");
        }
      })
      .then(data => {
        if (Array.isArray(data)) {
          setAppProducts(prev => prev.map(product => {
            const hasVariants = product.variants && product.variants.length > 0;
            let productUpdates = {};
            let variantsUpdates = [];

            if (hasVariants) {
              let anyVariantInStock = false;
              variantsUpdates = product.variants!.map(v => {
                const variantRemoteItem = data.find(item => String(item["Codigo"]) === String(v.sku));
                if (variantRemoteItem) {
                  const stockVal = variantRemoteItem["Stock Actual"];
                  let parsedStock = 0;
                  if (typeof stockVal === 'number') {
                    parsedStock = stockVal;
                  } else if (typeof stockVal === 'string') {
                    parsedStock = parseInt(stockVal, 10);
                  }
                  const inStock = !isNaN(parsedStock) && parsedStock > 0;
                  const stockCount = inStock ? parsedStock : 0;
                  if (inStock) anyVariantInStock = true;
                  
                  const priceStr = variantRemoteItem["Precio de venta"];
                  let parsedPrice = v.price;
                  if (typeof priceStr === 'number') {
                    parsedPrice = priceStr;
                  } else if (priceStr && typeof priceStr === 'string') {
                    const numericPrice = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
                    if (!isNaN(numericPrice)) {
                      parsedPrice = numericPrice;
                    }
                  }
                  return { ...v, inStock, stockCount, price: parsedPrice };
                }
                return v;
              });

              productUpdates = {
                variants: variantsUpdates,
                inStock: anyVariantInStock,
                stockCount: variantsUpdates.reduce((acc, curr) => acc + (curr.stockCount || 0), 0)
              };
            }

            const remoteItem = data.find(item => String(item["Codigo"]) === String(product.sku));
            if (remoteItem) {
              const stockVal = remoteItem["Stock Actual"];
              let parsedStock = 0;
              if (typeof stockVal === 'number') {
                parsedStock = stockVal;
              } else if (typeof stockVal === 'string') {
                parsedStock = parseInt(stockVal, 10);
              }
              const inStock = !isNaN(parsedStock) && parsedStock > 0;
              const stockCount = inStock ? parsedStock : 0;
              
              const priceStr = remoteItem["Precio de venta"];
              let parsedPrice = product.price;
              if (typeof priceStr === 'number') {
                parsedPrice = priceStr;
              } else if (priceStr && typeof priceStr === 'string') {
                const numericPrice = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
                if (!isNaN(numericPrice)) {
                  parsedPrice = numericPrice;
                }
              }

              return {
                ...product,
                inStock,
                stockCount,
                price: parsedPrice,
                ...productUpdates
              };
            }

            return Object.keys(productUpdates).length > 0 ? { ...product, ...productUpdates } : product;
          }));
        }
      })
      .catch(err => console.error("Error fetching inventory:", err.message));
  }, []);

  // Reset scroll position when view or filter changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, filter]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const normalize = (str: string) => 
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const featuredProducts = useMemo(() => {
    return appProducts
      .filter(p => p.originalPrice && p.originalPrice > p.price)
      .map(p => ({
        ...p,
        discountPercent: Math.round(((p.originalPrice! - p.price) / p.originalPrice!) * 100)
      }))
      .sort((a, b) => b.discountPercent - a.discountPercent)
      .slice(0, 6);
  }, [appProducts]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = normalize(searchQuery);
    const plusSizes = ['XL', 'XXL', 'XXXL', '2XL', '3XL', '4XL', '5XL'];
    
    return appProducts
      .filter((p) => {
        const hasPlusSize = p.sizes?.some(size => {
          const upperSize = size.toUpperCase();
          return plusSizes.some(ps => upperSize === ps || upperSize.split(/[\s/\-]+/).includes(ps));
        });

        // Special logic for "Tallas Grandes"
        let matchesCategory = false;
        if (filter.category === 'Todos') {
          matchesCategory = true;
        } else if (filter.category === 'Tallas Grandes') {
          // Main category "Tallas Grandes" shows everything with L+ or explicitly tagged
          matchesCategory = hasPlusSize || p.category === 'Tallas Grandes' || p.subcategory === 'Tallas Grandes';
        } else {
          matchesCategory = p.category === filter.category;
        }

        // Virtual subcategory logic: "Tallas Grandes" acts as a size filter
        let matchesSubcategory = false;
        if (!filter.subcategory) {
          matchesSubcategory = true;
        } else if (filter.subcategory === 'Tallas Grandes') {
          // If subcategory is "Tallas Grandes", we must have an L+ size or be explicitly tagged
          matchesSubcategory = hasPlusSize || p.subcategory === 'Tallas Grandes' || p.category === 'Tallas Grandes';
        } else {
          matchesSubcategory = p.subcategory === filter.subcategory;
        }

        const matchesSearch = normalize(p.title).includes(normalizedQuery) || 
                             normalize(p.description).includes(normalizedQuery);
        return matchesCategory && matchesSubcategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortOrder === 'precio-asc') {
          return a.price - b.price;
        } else if (sortOrder === 'precio-desc') {
          return b.price - a.price;
        }
        
        const order: Record<string, number> = { 'Mujeres': 1, 'Hombre': 2 };
        const valA = order[a.subcategory || ''] || 99;
        const valB = order[b.subcategory || ''] || 99;
        return valA - valB;
      });
  }, [appProducts, filter, searchQuery, sortOrder]);

  const handleSelectCategory = (category: string, subcategory?: string) => {
    setFilter({ category, subcategory });
    setView('catalog');
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    if (window.history.replaceState) {
      const url = new URL(window.location.href);
      if (url.searchParams.has('product')) {
        url.searchParams.delete('product');
        window.history.replaceState({}, '', url.toString());
      }
    }
  };

  const addToCart = (product: Product, quantity: number = 1, selectedSize?: string, selectedColor?: { name: string; hex: string; sku?: string }, customText?: string) => {
    setCart(prev => {
      const cartKey = `${product.id}-${selectedSize || ''}-${selectedColor?.name || ''}-${customText || ''}`;
      const existingIndex = prev.findIndex(item => 
        `${item.id}-${item.selectedSize || ''}-${item.selectedColor?.name || ''}-${item.customText || ''}` === cartKey
      );

      if (existingIndex > -1) {
        const newCart = [...prev];
        const currentQty = newCart[existingIndex].quantity;
        const maxAllowed = product.stockCount !== undefined ? product.stockCount : Infinity;
        const addedQty = Math.min(quantity, maxAllowed - currentQty);
        if (addedQty > 0) {
          newCart[existingIndex] = { 
            ...newCart[existingIndex], 
            quantity: currentQty + addedQty 
          };
        }
        return newCart;
      }
      const initialQty = product.stockCount !== undefined ? Math.min(quantity, product.stockCount) : quantity;
      return [...prev, { ...product, quantity: initialQty, selectedSize, selectedColor, customText }];
    });
    closeProductModal();
    setIsCartOpen(true);
  };

  const updateQuantity = (cartKey: string, delta: number) => {
    setCart(prev => prev.map(item => {
      const itemKey = `${item.id}-${item.selectedSize || ''}-${item.selectedColor?.name || ''}-${item.customText || ''}`;
      if (itemKey === cartKey) {
        let newQty = item.quantity + delta;
        if (item.stockCount !== undefined) {
          newQty = Math.min(newQty, item.stockCount);
        }
        newQty = Math.max(1, newQty);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (cartKey: string) => {
    setCart(prev => prev.filter(item => {
      const itemKey = `${item.id}-${item.selectedSize || ''}-${item.selectedColor?.name || ''}-${item.customText || ''}`;
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
                if (window.history.replaceState) {
                  const url = new URL(window.location.href);
                  if (url.searchParams.has('product')) {
                    url.searchParams.delete('product');
                    window.history.replaceState({}, '', url.toString());
                  }
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 text-blue-600 hover:opacity-80 transition-opacity"
            >
              <Store size={28} className="flex-shrink-0" />
              <span className="font-bold text-xl tracking-tight text-gray-900 hidden sm:block">OryzaCamaná</span>
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
                  className="group flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-blue-600 text-sm font-semibold rounded-full shadow-md hover:bg-gray-50 hover:text-blue-700 transition-all duration-300 animate-bounce"
                >
                  Ver Catálogo completo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-bold shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-black hover:scale-105 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-300"
              >
                Ver Categorías de Productos <ArrowRight size={18} />
              </button>
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

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500">Ordenar por:</span>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as any)}
                  className="text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer shadow-sm"
                >
                  <option value="relevancia">Relevancia</option>
                  <option value="precio-asc">Menor a mayor precio</option>
                  <option value="precio-desc">Mayor a menor precio</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="space-y-12">
                {sortOrder === 'relevancia' ? (
                  filter.category === 'Todos' ? (
                    // Group by Category and then Subcategory when viewing all
                    Array.from(new Set(filteredProducts.map(p => p.category))).map(cat => {
                      const catProducts = filteredProducts.filter(p => p.category === cat);
                      const subcategories = Array.from(new Set(catProducts.map(p => p.subcategory)));
                      
                      return (
                        <div key={cat} className="space-y-8">
                          <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-blue-600 pl-4">
                              {cat}
                            </h2>
                            <div className="h-[1px] flex-grow bg-gray-200"></div>
                          </div>
                          
                          <div className="space-y-8 pl-0 sm:pl-4">
                            {subcategories.map(sub => {
                              const subProducts = catProducts.filter(p => p.subcategory === sub);
                              if (subProducts.length === 0) return null;
                              return (
                                <div key={sub || 'otros'} className="space-y-4">
                                  {sub && (
                                    <div className="flex items-center gap-3">
                                      <h3 className="text-lg font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-md">
                                        {sub}
                                      </h3>
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
                            })}
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
                  )
                ) : (
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
                    {filteredProducts.map((product) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onClick={() => setSelectedProduct(product)} 
                        onAddToCart={addToCart}
                      />
                    ))}
                  </div>
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
              <h3 className="text-lg font-bold text-gray-900 mb-4">Oryza Camaná</h3>
              <p className="text-gray-500 text-sm">Tu tienda de confianza para moda y accesorios de calidad en todo el Perú.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contacto</h3>
              <ul className="text-gray-500 text-sm space-y-2">
                <li className="flex items-center justify-center md:justify-start gap-2">
                  <span>WhatsApp: +{STORE_CONFIG.phone}</span>
                  <a 
                    href={`https://wa.me/${STORE_CONFIG.phone}?text=hola, vengo de la pagina Oriza.`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-green-500 text-white rounded-full p-1 hover:bg-green-600 transition-colors"
                    title="Chatear por WhatsApp"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
                  </a>
                </li>
                <li>Email: {STORE_CONFIG.email}</li>
                <li>Ubicación: {STORE_CONFIG.address}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Síguenos</h3>
              <div className="flex justify-center md:justify-start gap-4">
                <a href={STORE_CONFIG.social.facebook} onClick={(e) => e.preventDefault()} className="text-gray-400 hover:text-blue-600 cursor-default transition-colors">Facebook</a>
                <a href={STORE_CONFIG.social.instagram} onClick={(e) => e.preventDefault()} className="text-gray-400 hover:text-pink-600 cursor-default transition-colors">Instagram</a>
                <a href={STORE_CONFIG.social.tiktok} onClick={(e) => e.preventDefault()} className="text-gray-400 hover:text-black cursor-default transition-colors">TikTok</a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-100 text-center text-gray-400 text-xs">
            <p>&copy; {new Date().getFullYear()} Oryza Camaná.</p>
          </div>
        </div>
      </footer>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={closeProductModal} 
            onAddToCart={addToCart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
