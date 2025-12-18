
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove, onUpdateQty }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 z-[101] border-l border-white/10 shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="font-sync font-bold text-lg">YOUR BAG</h2>
              </div>
              <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white">
                <X />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="text-zinc-600" />
                  </div>
                  <p className="text-zinc-500 font-sync text-xs">YOUR BAG IS EMPTY</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-24 h-24 bg-zinc-900 rounded-2xl overflow-hidden border border-white/5">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-sm">{item.name}</h4>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-zinc-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-zinc-500 text-xs mb-3">SIZE: {item.selectedSize} / COLOR: {item.selectedColor}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-white/10 rounded-full">
                          <button 
                            onClick={() => onUpdateQty(item.id, -1)}
                            className="px-3 py-1 text-zinc-400 hover:text-white"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQty(item.id, 1)}
                            className="px-3 py-1 text-zinc-400 hover:text-white"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-zinc-950/50 space-y-4">
                <div className="flex justify-between font-sync text-sm">
                  <span className="text-zinc-500">SUBTOTAL</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-sync text-sm">
                  <span className="text-zinc-500">SHIPPING</span>
                  <span className="text-green-400">FREE</span>
                </div>
                <div className="flex justify-between font-sync text-lg font-bold border-t border-white/10 pt-4">
                  <span>TOTAL</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button className="w-full bg-white text-black h-16 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                  CHECKOUT NOW <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
