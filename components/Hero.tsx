import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onCustomize: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore, onCustomize }) => {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Animation Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10 pt-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-zinc-400 text-xs font-sync mb-6">
            <Sparkles className="w-3 h-3 text-yellow-400" />
            ADAMSSHOE FOOTWEAR PLATFORM
          </div>
          <h1 className="text-6xl md:text-8xl font-sync font-bold tracking-tighter mb-8 leading-tight">
            RUN THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-700">FUTURE.</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-lg mb-12">
            Engineered for performance, designed by AI. Experience the ultimate intersection of biological motion and generative design by AdamsShoe.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={onExplore}
              className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform"
            >
              SHOP COLLECTION <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onCustomize}
              className="bg-zinc-900 text-white border border-white/10 px-8 py-4 rounded-full font-bold hover:bg-zinc-800 transition-colors"
            >
              AI DESIGN LAB
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          {/* Main Shoe Visualizer (3D-like) */}
          <div className="relative aspect-square w-full max-w-xl mx-auto group">
            <div className="absolute inset-0 bg-white/5 rounded-3xl blur-2xl group-hover:bg-white/10 transition-colors duration-700" />
            <motion.img
              src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=1200"
              alt="AdamsShoe Futuristic Design"
              className="relative z-10 w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.2)]"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 2, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Floating Info Tags */}
            <motion.div 
              className="absolute top-10 right-0 bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-2xl z-20"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="text-[10px] text-zinc-500 font-sync mb-1">MATERIAL</div>
              <div className="text-sm font-bold">KINETIC KNIT 4.0</div>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-20 left-0 bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-2xl z-20"
              animate={{ x: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <div className="text-[10px] text-zinc-500 font-sync mb-1">RESPONSE</div>
              <div className="text-sm font-bold">+24% ENERGY</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;