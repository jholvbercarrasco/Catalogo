import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronDown, ChevronRight, Home, Shirt, Sparkles, Gift } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: string, subcategory?: string) => void;
}

interface CategoryItem {
  name: string;
  icon: React.ReactNode;
  subcategories?: string[];
}

const categories: CategoryItem[] = [
  { 
    name: 'Ropa Mujer', 
    icon: <Shirt size={20} />, 
    subcategories: ['Tallas Grandes'] 
  },
  { 
    name: 'Ropa Hombre', 
    icon: <Shirt size={20} />, 
    subcategories: ['Polos'] 
  },
  { 
    name: 'Hogar', 
    icon: <Home size={20} /> 
  },
  { 
    name: 'Joyería', 
    icon: <Sparkles size={20} /> 
  }
];

export function Sidebar({ isOpen, onClose, onSelectCategory }: SidebarProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleExpand = (name: string) => {
    setExpandedCategory(expandedCategory === name ? null : name);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Sidebar Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Categorías</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-grow overflow-y-auto py-4">
              <div className="px-4 space-y-1">
                <button
                  onClick={() => {
                    onSelectCategory('Todos');
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all font-medium"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg group-hover:bg-blue-100">
                    <Shirt size={18} />
                  </div>
                  Todos los Productos
                </button>

                {categories.map((cat) => (
                  <div key={cat.name} className="space-y-1">
                    <button
                      onClick={() => {
                        if (cat.subcategories) {
                          toggleExpand(cat.name);
                        } else {
                          onSelectCategory(cat.name);
                          onClose();
                        }
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-medium ${
                        expandedCategory === cat.name 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                          expandedCategory === cat.name ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          {cat.icon}
                        </div>
                        {cat.name}
                      </div>
                      {cat.subcategories && (
                        expandedCategory === cat.name ? <ChevronDown size={18} /> : <ChevronRight size={18} />
                      )}
                    </button>

                    {/* Subcategories */}
                    <AnimatePresence>
                      {cat.subcategories && expandedCategory === cat.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-12 space-y-1"
                        >
                          {cat.subcategories.map((sub) => (
                            <button
                              key={sub}
                              onClick={() => {
                                onSelectCategory(cat.name, sub);
                                onClose();
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                            >
                              {sub}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <p className="text-xs text-gray-400 text-center">
                Oryza Camaná v1.0 • 2026
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
