
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'NEON VELOCITY V1',
    price: 189.00,
    category: 'Performance',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-lightweight mesh with reactive foam technology for maximum energy return.',
    colors: ['#ff0055', '#00ffcc', '#ffffff']
  },
  {
    id: '2',
    name: 'MIDNIGHT STEALTH',
    price: 210.00,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800',
    description: 'Premium nubuck leather with carbon fiber support for urban exploration.',
    colors: ['#000000', '#333333', '#666666']
  },
  {
    id: '3',
    name: 'AURORA GLIDE',
    price: 245.00,
    category: 'Limited',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800',
    description: 'Iridescent finish with adaptive cushioning. Only 500 pairs worldwide.',
    colors: ['#a855f7', '#3b82f6', '#10b981']
  },
  {
    id: '4',
    name: 'CORE ELEMENT',
    price: 165.00,
    category: 'Performance',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
    description: 'The essential daily trainer. Built for durability and comfort.',
    colors: ['#ffffff', '#000000', '#facc15']
  }
];

export const SIZES = [7, 8, 9, 10, 11, 12];
