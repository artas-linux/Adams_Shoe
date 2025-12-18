import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative bg-zinc-900/50 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm h-full flex flex-col"
    >
      <div className="aspect-[4/5] overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          <span className="text-[10px] font-sync text-white tracking-widest">{product.category}</span>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-white text-black h-12 px-6 rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 font-bold"
        >
          ADD TO BAG <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-sync text-lg font-bold tracking-tighter leading-none">{product.name}</h3>
          <span className="text-zinc-400 font-bold">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-zinc-500 text-sm line-clamp-2">{product.description}</p>
        
        <div className="mt-auto pt-4 flex gap-2">
          {product.colors.map((color, idx) => (
            <div 
              key={idx}
              className="w-4 h-4 rounded-full border border-white/10"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;