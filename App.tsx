
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Customizer from './components/Customizer';
import Cart from './components/Cart';
import { PRODUCTS } from './constants';
import { Product, CartItem, ViewState } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('shop');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showDevNotice, setShowDevNotice] = useState(true);

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedColor: product.colors[0], selectedSize: 10 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <AnimatePresence>
        {showDevNotice && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-md w-full bg-zinc-900 border border-white/10 p-8 rounded-[32px] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <AlertTriangle className="w-8 h-8 text-yellow-500" />
                </div>
                
                <h2 className="font-sync text-lg font-bold tracking-widest mb-4">SYSTEM NOTICE</h2>
                
                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                  This website is under development under <span className="text-white font-bold">TrinityDev/(Thio)</span>. 
                  Some features may be experimental as we engineer the future of footwear commerce.
                </p>
                
                <button 
                  onClick={() => setShowDevNotice(false)}
                  className="w-full bg-white text-black h-14 rounded-2xl font-bold font-sync text-xs tracking-widest hover:scale-[1.02] transition-transform"
                >
                  ENTER EXPERIENCE
                </button>
              </div>

              <button 
                onClick={() => setShowDevNotice(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar 
        cartCount={cartCount} 
        currentView={currentView} 
        setView={setCurrentView} 
        onOpenCart={() => setIsCartOpen(true)}
      />

      <AnimatePresence mode="wait">
        {currentView === 'shop' && (
          <motion.main
            key="shop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero 
              onExplore={() => {
                const shopSection = document.getElementById('shop-section');
                shopSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              onCustomize={() => setCurrentView('customizer')}
            />
            
            <section id="shop-section" className="max-w-7xl mx-auto px-6 py-24">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div>
                  <h2 className="text-4xl md:text-6xl font-sync font-bold tracking-tighter mb-4">LATEST <br />COLLECTION</h2>
                  <p className="text-zinc-500 max-w-md">Performance meets artistry by AdamsShoe. Explore our lineup of elite footwear models designed for the modern athlete.</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-[10px] font-sync text-white border-b-2 border-white pb-1 tracking-widest cursor-pointer">ALL PRODUCTS</span>
                  <span className="text-[10px] font-sync text-zinc-500 hover:text-white pb-1 tracking-widest cursor-pointer transition-colors">PERFORMANCE</span>
                  <span className="text-[10px] font-sync text-zinc-500 hover:text-white pb-1 tracking-widest cursor-pointer transition-colors">LIFESTYLE</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {PRODUCTS.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={addToCart} 
                  />
                ))}
              </div>
            </section>

            <footer className="border-t border-white/5 py-20 bg-zinc-950">
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-black rounded-full" />
                    </div>
                    <span className="font-sync font-bold text-lg">AdamsShoe</span>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    We are building the infrastructure for the next generation of physical movement. 
                    Join AdamsShoe in the design revolution.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-sync text-[10px] text-zinc-400 tracking-widest">COMPANY</h4>
                    <ul className="text-sm text-zinc-600 space-y-2">
                      <li className="hover:text-white cursor-pointer">About</li>
                      <li className="hover:text-white cursor-pointer">Careers</li>
                      <li className="hover:text-white cursor-pointer">Labs</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-sync text-[10px] text-zinc-400 tracking-widest">SUPPORT</h4>
                    <ul className="text-sm text-zinc-600 space-y-2">
                      <li className="hover:text-white cursor-pointer">Shipping</li>
                      <li className="hover:text-white cursor-pointer">Returns</li>
                      <li className="hover:text-white cursor-pointer">Contact</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-6">
                  <h4 className="font-sync text-[10px] text-zinc-400 tracking-widest">NEWSLETTER</h4>
                  <div className="flex gap-2">
                    <input 
                      type="email" 
                      placeholder="EMAIL ADDRESS" 
                      className="bg-transparent border-b border-white/20 pb-2 text-sm focus:outline-none focus:border-white w-full font-sync"
                    />
                    <button className="text-white">JOIN</button>
                  </div>
                </div>
              </div>
              <div className="max-w-7xl mx-auto px-6 pt-20 mt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-zinc-600 font-sync">
                <p>&copy; 2024 ADAMSSHOE TECHNOLOGIES. ALL RIGHTS RESERVED.</p>
                <div className="flex gap-8">
                  <span className="hover:text-white cursor-pointer">PRIVACY</span>
                  <span className="hover:text-white cursor-pointer">TERMS</span>
                </div>
              </div>
            </footer>
          </motion.main>
        )}

        {currentView === 'customizer' && (
          <motion.div
            key="customizer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Customizer />
          </motion.div>
        )}
      </AnimatePresence>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemove={removeFromCart}
        onUpdateQty={updateQuantity}
      />
    </div>
  );
};

export default App;
