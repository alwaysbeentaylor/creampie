import React from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';
import { Song } from '../types';

const Music: React.FC = () => {
  const latestDrops: Song[] = [
    {
      id: '1',
      title: 'Midnight Echoes',
      artist: 'Art Nomad',
      coverUrl: 'https://picsum.photos/400/400?grayscale&random=1',
      platform: 'spotify',
      link: '#',
      releaseDate: '2023-10-27'
    },
    {
      id: '2',
      title: 'Blue Horizon',
      artist: 'Art Nomad feat. Lux',
      coverUrl: 'https://picsum.photos/400/400?grayscale&random=2',
      platform: 'spotify',
      link: '#',
      releaseDate: '2023-09-15'
    },
    {
      id: '3',
      title: 'Neon City Blues',
      artist: 'Art Nomad',
      coverUrl: 'https://picsum.photos/400/400?grayscale&random=3',
      platform: 'spotify',
      link: '#',
      releaseDate: '2023-08-01'
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-nomad-black relative">
       {/* Background gradient blob */}
       <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8"
        >
          <div>
             <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-2">MUSIC</h1>
             <p className="text-blue-400 font-bold uppercase tracking-widest text-sm">Latest Releases & Visuals</p>
          </div>
        </motion.div>

        {/* Featured Video Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-20"
        >
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-white/10 group">
             {/* Placeholder for YouTube Embed */}
             <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                <img 
                  src="https://picsum.photos/1920/1080?grayscale&blur=2" 
                  alt="Video background" 
                  className="w-full h-full object-cover opacity-60 transition-opacity group-hover:opacity-40" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                
                <div className="absolute z-10 flex flex-col items-center">
                  <div className="w-24 h-24 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300 cursor-pointer shadow-xl">
                    <Play className="w-10 h-10 text-white ml-1" fill="currentColor" />
                  </div>
                  <h3 className="text-2xl text-white font-bold tracking-wide">OFFICIAL MUSIC VIDEO</h3>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Spotify Drops List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
                 <h2 className="text-2xl text-white font-bold mb-8 flex items-center gap-3">
                    <span className="w-2 h-8 bg-blue-600 rounded-sm"></span>
                    NEW DROPS
                 </h2>
                 <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
                     De nieuwste tracks direct vanuit de studio. Beschikbaar op alle grote streaming platforms.
                 </p>
            </div>
          
          <div className="space-y-4">
            {latestDrops.map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
                className="group flex items-center bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                  <img src={song.coverUrl} alt={song.title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-8 h-8 text-white drop-shadow-lg" fill="currentColor" />
                  </div>
                </div>
                
                <div className="ml-6 flex-grow">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{song.title}</h3>
                  <p className="text-gray-400 text-sm">{song.artist}</p>
                </div>

                <a 
                  href={song.link} 
                  className="p-3 rounded-full bg-white/5 hover:bg-green-600 text-gray-400 hover:text-white transition-all duration-300"
                  aria-label="Listen on Spotify"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;