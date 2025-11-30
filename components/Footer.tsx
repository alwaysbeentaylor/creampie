import React from 'react';
import { Instagram, Youtube, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-nomad-black py-12 border-t border-white/5 mt-auto relative overflow-hidden">
      {/* Glow effect footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold tracking-[0.2em] text-white uppercase">Art Nomad</h2>
          <p className="text-gray-500 text-xs mt-2 uppercase tracking-wide">Music / Ink / Apparel</p>
        </div>
        
        <div className="flex space-x-8">
          <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors duration-300">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-500 hover:text-red-500 transition-colors duration-300">
            <Youtube className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors duration-300">
            <Twitter className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;