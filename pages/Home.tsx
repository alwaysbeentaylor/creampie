import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Music, PenTool, ShoppingBag } from 'lucide-react';

const Home: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-nomad-black">
      
      {/* Subtle Background Effects - Reduced intensity */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-950/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-950/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        className="z-10 text-center px-4 max-w-6xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-12 flex justify-center">
            {/* Logo Mark Large */}
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 md:w-24 md:h-24 opacity-80">
                  <path 
                    d="M7 21L12 4L17 21M17 4V21" 
                    stroke="url(#gradient)" 
                    strokeWidth="0.5" 
                    strokeLinecap="square" 
                    strokeLinejoin="miter"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="7" y1="4" x2="17" y2="21" gradientUnits="userSpaceOnUse">
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
            </svg>
        </motion.div>
        
        {/* Typography - Subtler, thinner, wider spacing */}
        <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-light text-white mb-8 tracking-[0.5em] uppercase leading-relaxed">
          Art<span className="text-gray-600 mx-4">/</span>Nomad
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-gray-500 text-sm md:text-base max-w-xl mx-auto mb-20 font-light tracking-widest uppercase leading-loose">
          Ink . Sound . Apparel
        </motion.p>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Link to="/music" className="group relative p-8 border border-white/5 rounded-sm hover:border-white/10 transition-all duration-700 bg-black/20 hover:bg-black/40">
            <div className="flex flex-col items-center">
                <Music className="w-5 h-5 text-gray-600 mb-6 group-hover:text-blue-400 transition-colors duration-500" strokeWidth={1.5} />
                <h3 className="text-xs font-bold text-white uppercase tracking-[0.3em] mb-2 group-hover:text-blue-200 transition-colors">Music</h3>
                <div className="w-0 group-hover:w-8 h-[1px] bg-blue-500 transition-all duration-500 mt-2"></div>
            </div>
          </Link>

          <Link to="/tattoo" className="group relative p-8 border border-white/5 rounded-sm hover:border-white/10 transition-all duration-700 bg-black/20 hover:bg-black/40">
            <div className="flex flex-col items-center">
                <PenTool className="w-5 h-5 text-gray-600 mb-6 group-hover:text-blue-400 transition-colors duration-500" strokeWidth={1.5} />
                <h3 className="text-xs font-bold text-white uppercase tracking-[0.3em] mb-2 group-hover:text-blue-200 transition-colors">Atelier</h3>
                 <div className="w-0 group-hover:w-8 h-[1px] bg-blue-500 transition-all duration-500 mt-2"></div>
            </div>
          </Link>

          <Link to="/shop" className="group relative p-8 border border-white/5 rounded-sm hover:border-white/10 transition-all duration-700 bg-black/20 hover:bg-black/40">
            <div className="flex flex-col items-center">
                <ShoppingBag className="w-5 h-5 text-gray-600 mb-6 group-hover:text-blue-400 transition-colors duration-500" strokeWidth={1.5} />
                <h3 className="text-xs font-bold text-white uppercase tracking-[0.3em] mb-2 group-hover:text-blue-200 transition-colors">Goods</h3>
                 <div className="w-0 group-hover:w-8 h-[1px] bg-blue-500 transition-all duration-500 mt-2"></div>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;