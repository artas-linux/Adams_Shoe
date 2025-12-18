
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, RefreshCcw, Download, Sparkles, AlertCircle, Palette } from 'lucide-react';
import { generateShoeConcept } from '../services/geminiService';

const Customizer: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    try {
      const result = await generateShoeConcept(prompt);
      if (result) {
        setGeneratedImage(result);
      } else {
        setError("Failed to generate design. Please try a different prompt.");
      }
    } catch (err) {
      setError("An error occurred during generation.");
    } finally {
      setIsGenerating(false);
    }
  };

  const suggestions = [
    "Cyberpunk city lights with neon accents",
    "Minimalist desert architecture inspired",
    "Liquid mercury and deep ocean bioluminescence",
    "Recycled ocean plastics and organic weaves"
  ];

  const colorPalettes = [
    { name: "CYBER NEON", colors: ["#ff0055", "#00ffcc", "#ffffff"], description: "vibrant neon pink and electric teal accents" },
    { name: "EARTH TONES", colors: ["#5d4037", "#8d6e63", "#d7ccc8"], description: "natural clay, dark oak, and sand textures" },
    { name: "MONO ELITE", colors: ["#000000", "#333333", "#ffffff"], description: "matte black, gunmetal grey, and stark white highlights" },
    { name: "ARCTIC FROST", colors: ["#e0f7fa", "#81d4fa", "#01579b"], description: "icy blue, translucent crystal, and frost white" }
  ];

  const handlePaletteClick = (description: string) => {
    if (prompt.includes(description)) return;
    setPrompt(prev => prev ? `${prev}, with ${description}` : `A sneaker with ${description}`);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/20 text-purple-300 text-xs font-sync mb-6">
              <Sparkles className="w-3 h-3" />
              ADAMSSHOE DESIGN LAB V1.0
            </div>
            <h2 className="text-5xl font-sync font-bold tracking-tighter mb-4">DREAM YOUR <br />DESIGN.</h2>
            <p className="text-zinc-400">Describe your ultimate sneaker. AdamsShoe's generative AI will manifest your vision into a visual concept in seconds.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Futuristic running shoe with skeletal structure..."
                className="w-full h-32 bg-zinc-900 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-white/30 transition-colors resize-none"
              />
              
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setPrompt(s)}
                    className="text-[10px] font-sync text-zinc-500 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full transition-colors"
                  >
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-zinc-500">
                <Palette className="w-4 h-4" />
                <span className="text-[10px] font-sync tracking-widest uppercase">Color Inspiration</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {colorPalettes.map((palette) => (
                  <button
                    key={palette.name}
                    onClick={() => handlePaletteClick(palette.description)}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all group"
                  >
                    <span className="text-[9px] font-sync text-zinc-400 group-hover:text-white transition-colors">{palette.name}</span>
                    <div className="flex -space-x-1">
                      {palette.colors.map((color, i) => (
                        <div 
                          key={i} 
                          className="w-3 h-3 rounded-full border border-black" 
                          style={{ backgroundColor: color }} 
                        />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white h-16 rounded-2xl font-bold flex items-center justify-center gap-3 disabled:opacity-50 hover:opacity-90 transition-all shadow-lg shadow-purple-500/20"
            >
              {isGenerating ? (
                <>
                  <RefreshCcw className="w-6 h-6 animate-spin" />
                  GENERATING CONCEPT...
                </>
              ) : (
                <>
                  <Wand2 className="w-6 h-6" />
                  GENERATE DESIGN
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-400 text-sm">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}
        </div>

        <div className="relative aspect-square w-full bg-zinc-900/50 border border-white/5 rounded-[40px] flex items-center justify-center overflow-hidden group">
          <AnimatePresence mode="wait">
            {generatedImage ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="relative w-full h-full"
              >
                <img src={generatedImage} alt="AI Design" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <a 
                    href={generatedImage} 
                    download="adamsshoe-custom.png"
                    className="bg-white text-black p-4 rounded-full hover:scale-110 transition-transform"
                  >
                    <Download className="w-6 h-6" />
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center p-12"
              >
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Wand2 className="w-8 h-8 text-zinc-600" />
                </div>
                <p className="text-zinc-500 font-sync text-sm">WAITING FOR YOUR VISION...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {isGenerating && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-30 flex flex-col items-center justify-center gap-6">
              <div className="w-16 h-16 border-4 border-zinc-800 border-t-white rounded-full animate-spin" />
              <div className="text-center space-y-2">
                <p className="font-sync font-bold tracking-widest animate-pulse">MODELING ASSETS</p>
                <p className="text-zinc-500 text-xs">This takes about 10-15 seconds</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customizer;
