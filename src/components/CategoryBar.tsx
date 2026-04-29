import React from 'react';
import { Users, Shirt, Footprints, Sparkles, Gift } from 'lucide-react';

interface CategoryBarProps {
  onSelectCategory: (category: string, subcategory?: string) => void;
  activeCategory: string;
}

const categories = [
  { name: 'Plus Size', icon: <Users size={18} /> },
  { name: 'Vestidos', icon: <Shirt size={18} /> },
  { name: 'Zapatos', icon: <Footprints size={18} /> },
  { name: 'Joyería', icon: <Sparkles size={18} /> },
  { name: 'Regalos', icon: <Gift size={18} /> },
];

export function CategoryBar({ onSelectCategory, activeCategory }: CategoryBarProps) {
  return (
    <div className="bg-white border-b border-gray-100 sticky top-[64px] z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3 sm:py-4">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeCategory === cat.name
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <span className={activeCategory === cat.name ? 'text-white' : 'text-gray-400'}>
                {cat.icon}
              </span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
