import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Muziek', path: '/music' },
    { label: 'Tattoo & Booking', path: '/tattoo' },
    { label: 'Merchandise', path: '/shop' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-nomad-black/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo - Merged A & N Monogram */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
               <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path 
                    d="M7 21L12 4L17 21M17 4V21" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="square" 
                    strokeLinejoin="miter"
                    className="text-white group-hover:text-blue-400 transition-colors duration-500"
                  />
                  {/* Subtle accent line */}
                  <circle cx="12" cy="10" r="1" className="fill-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               </svg>
            </div>
            <span className="text-sm font-light tracking-[0.3em] text-white uppercase group-hover:text-gray-300 transition-colors hidden sm:block">
              Art Nomad
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-12">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 relative group
                    ${location.pathname === item.path 
                      ? 'text-white' 
                      : 'text-gray-500 hover:text-white'
                    }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-2 left-0 w-full h-[1px] bg-blue-500 transform origin-left transition-transform duration-500 ${location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-500 transition-colors focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-nomad-black border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-4 text-xs font-bold uppercase tracking-widest border-l-[1px] transition-all
                    ${location.pathname === item.path 
                      ? 'text-white border-blue-600 bg-white/5' 
                      : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5 hover:border-gray-600'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;