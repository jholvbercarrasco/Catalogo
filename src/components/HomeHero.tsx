import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const offers = [
  {
    id: 1,
    title: "Colección Ropa Mujer",
    subtitle: "Descubre nuestra selección de vestidos y blusas",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1920&h=1080",
    color: "bg-blue-600"
  },
  {
    id: 2,
    title: "Joyería Fina",
    subtitle: "Detalles que deslumbran",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1280&h=720",
    color: "bg-purple-600"
  },
  {
    id: 3,
    title: "Artículos de Hogar",
    subtitle: "Confort y estilo para tu espacio",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1920&h=1080",
    color: "bg-amber-600"
  }
];

export function HomeHero({ onExplore }: { onExplore: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[400px] sm:h-[600px] overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img 
            src={offers[currentIndex].image} 
            alt={offers[currentIndex].title}
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-4"
            >
              Oferta Especial
            </motion.span>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-6xl font-black text-white mb-4 max-w-3xl"
            >
              {offers[currentIndex].title}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-gray-200 mb-8 max-w-xl"
            >
              {offers[currentIndex].subtitle}
            </motion.p>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={onExplore}
              className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-600 hover:text-white transition-all shadow-xl hover:shadow-blue-500/20"
            >
              Explorar Catálogo
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {offers.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === idx ? 'w-8 bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button 
        onClick={() => setCurrentIndex(prev => prev === 0 ? offers.length - 1 : prev - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all hidden sm:block"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={() => setCurrentIndex(prev => prev === offers.length - 1 ? 0 : prev + 1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all hidden sm:block"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
