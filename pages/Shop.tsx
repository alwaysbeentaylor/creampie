import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowUpRight } from 'lucide-react';
import { Product } from '../types';

const Shop: React.FC = () => {
  const products: Product[] = [
    { id: '1', name: 'Nomad Signature Tee', price: 35.00, category: 'Apparel', imageUrl: 'https://picsum.photos/400/500?grayscale&random=20', isNew: true },
    { id: '2', name: 'Blue Gradient Hoodie', price: 65.00, category: 'Apparel', imageUrl: 'https://picsum.photos/400/500?grayscale&random=21' },
    { id: '3', name: 'Art Print No. 1', price: 45.00, category: 'Art', imageUrl: 'https://picsum.photos/400/500?grayscale&random=22' },
    { id: '4', name: 'Nomad Cap', price: 25.00, category: 'Accessories', imageUrl: 'https://picsum.photos/400/500?grayscale&random=23' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-nomad-black relative">
      <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8"
        >
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-2">SHOP</h1>
            <p className="text-blue-400 font-bold uppercase tracking-widest text-sm">Official Merchandise</p>
          </div>
          <div className="mt-4 md:mt-0">
             <span className="text-gray-500 font-medium">4 Products available</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-white/5 mb-6 border border-white/5 group-hover:border-blue-500/30 transition-all duration-500">
                {product.isNew && (
                  <div className="absolute top-4 left-4 z-10 bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-sm">
                    New Drop
                  </div>
                )}
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-white text-black px-6 py-3 rounded-full font-bold uppercase tracking-wide text-xs hover:bg-blue-500 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                    </button>
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                    <p className="text-xs text-blue-400 uppercase tracking-widest font-bold mb-1">{product.category}</p>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{product.name}</h3>
                </div>
                <p className="text-white font-medium text-lg">€{product.price.toFixed(2)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;