import React from 'react';
import { ShoppingBag, Zap, Menu, X } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  cartCount: number;
  currentView: ViewState;
  setView: (view: ViewState) => void;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, currentView, setView, onOpenCart }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { label: 'SHOP', view: 'shop' as ViewState },
    { label: 'LAB (AI)', view: 'customizer' as ViewState },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-2xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setView('shop')}
        >
          <div className="relative w-11 h-11 bg-white rounded-full flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
            <Zap className="text-black w-6 h-6 fill-current" />
          </div>
          <span className="font-sync font-bold text-xl tracking-tighter group-hover:text-white transition-colors">AdamsShoe</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setView(item.view)}
              className={`font-sync text-[10px] tracking-[0.3em] transition-all duration-300 relative ${
                currentView === item.view ? 'text-white' : 'text-zinc-500 hover:text-white'
              }`}
            >
              {item.label}
              {currentView === item.view && (
                <div className="absolute -bottom-2 left-0 right-0 h-[1px] bg-white" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-zinc-400 hover:text-white transition-all hover:scale-110"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0 -right-0 bg-white text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          
          <button 
            className="md:hidden text-zinc-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/5 p-8 flex flex-col gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setView(item.view);
                setIsMenuOpen(false);
              }}
              className={`font-sync text-sm tracking-[0.2em] text-left ${
                currentView === item.view ? 'text-white' : 'text-zinc-500'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;