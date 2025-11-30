import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, CheckCircle, ChevronRight, ChevronLeft, Sparkles, Upload, User, PenTool, Image as ImageIcon } from 'lucide-react';
import { TattooItem } from '../types';
import { generateTattooConcept } from '../services/geminiService';

const Tattoo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'booking'>('gallery');
  
  // Booking Form State
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    placement: '',
    size: '',
    description: '',
    date: '',
    time: ''
  });
  
  // AI Helper State
  const [aiIdea, setAiIdea] = useState('');
  const [generatedConcept, setGeneratedConcept] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const portfolio: TattooItem[] = [
    { id: '1', title: 'Geometric Wolf', style: 'Dotwork', imageUrl: 'https://picsum.photos/600/800?grayscale&random=10' },
    { id: '2', title: 'Japanese Sleeve', style: 'Irezumi', imageUrl: 'https://picsum.photos/600/800?grayscale&random=11' },
    { id: '3', title: 'Abstract Lines', style: 'Fineline', imageUrl: 'https://picsum.photos/600/800?grayscale&random=12' },
    { id: '4', title: 'Skull Study', style: 'Realism', imageUrl: 'https://picsum.photos/600/800?grayscale&random=13' },
    { id: '5', title: 'Floral Piece', style: 'Blackwork', imageUrl: 'https://picsum.photos/600/800?grayscale&random=14' },
    { id: '6', title: 'Script', style: 'Lettering', imageUrl: 'https://picsum.photos/600/800?grayscale&random=15' },
  ];

  const handleGenerate = async () => {
    if (!aiIdea.trim()) return;
    setIsGenerating(true);
    const result = await generateTattooConcept(aiIdea);
    setGeneratedConcept(result);
    // Auto-fill description if empty
    if (!formData.description) {
        setFormData(prev => ({ ...prev, description: result }));
    }
    setIsGenerating(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const submitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
        setBookingSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-nomad-black relative">
       {/* Gradient Background */}
       <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-nomad-black via-nomad-dark to-blue-900/10 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6">INK & ART</h1>
          
          <div className="inline-flex p-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
            <button 
              onClick={() => setActiveTab('gallery')}
              className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === 'gallery' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-gray-400 hover:text-white'}`}
            >
              Portfolio
            </button>
            <button 
              onClick={() => setActiveTab('booking')}
              className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === 'booking' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-gray-400 hover:text-white'}`}
            >
              Booking
            </button>
          </div>
        </motion.div>

        {activeTab === 'gallery' ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {portfolio.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4] border border-white/5 hover:border-blue-500/30 transition-all duration-500"
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-2">{item.style}</p>
                  <h3 className="text-white text-2xl font-bold">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl mx-auto"
          >
            {!bookingSuccess ? (
                <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden">
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                        <motion.div 
                            className="h-full bg-gradient-to-r from-blue-600 to-indigo-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${(step / 4) * 100}%` }}
                        />
                    </div>

                    <form onSubmit={submitBooking}>
                        <AnimatePresence mode="wait">
                            
                            {/* STEP 1: Personal Info */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                                            <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm">1</span>
                                            Jouw gegevens
                                        </h2>
                                        <p className="text-gray-400 text-sm ml-11">We hebben deze info nodig om contact op te nemen.</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="group">
                                            <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider group-focus-within:text-blue-400 transition-colors">Volledige Naam</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                                                <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-blue-500 focus:bg-blue-900/10 outline-none transition-all" placeholder="John Doe" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Email</label>
                                                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 focus:bg-blue-900/10 outline-none transition-all" placeholder="john@example.com" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Telefoon</label>
                                                <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 focus:bg-blue-900/10 outline-none transition-all" placeholder="06 12345678" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 2: Tattoo Concept */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                                            <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm">2</span>
                                            Het Ontwerp
                                        </h2>
                                        <p className="text-gray-400 text-sm ml-11">Beschrijf wat je wilt. Gebruik AI als je inspiratie zoekt.</p>
                                    </div>

                                    {/* AI Tool */}
                                    <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 p-6 rounded-2xl border border-blue-500/20 mb-8">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Sparkles className="w-4 h-4 text-blue-400" />
                                            <span className="text-sm font-bold text-blue-100 uppercase tracking-wide">AI Concept Generator</span>
                                        </div>
                                        <div className="flex gap-2 mb-2">
                                            <input 
                                                type="text" 
                                                value={aiIdea}
                                                onChange={(e) => setAiIdea(e.target.value)}
                                                placeholder="Bv: Een geometrische leeuw met bloemen..."
                                                className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-blue-400 outline-none"
                                            />
                                            <button 
                                                type="button"
                                                onClick={handleGenerate}
                                                disabled={isGenerating || !aiIdea}
                                                className="bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
                                            >
                                                {isGenerating ? '...' : 'Generate'}
                                            </button>
                                        </div>
                                        {generatedConcept && (
                                            <div className="mt-4 p-3 bg-black/40 rounded border-l-2 border-blue-500 text-gray-300 text-sm italic">
                                                "{generatedConcept}"
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Plaatsing</label>
                                            <select name="placement" value={formData.placement} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none appearance-none">
                                                <option value="" disabled>Kies locatie...</option>
                                                <option value="arm_full">Arm (Full Sleeve)</option>
                                                <option value="arm_half">Arm (Half Sleeve)</option>
                                                <option value="forearm">Onderarm</option>
                                                <option value="chest">Borst</option>
                                                <option value="back">Rug</option>
                                                <option value="leg">Been</option>
                                                <option value="other">Anders</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Grootte (cm)</label>
                                            <input type="text" name="size" value={formData.size} onChange={handleInputChange} placeholder="Bv: 15x10 cm" className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Beschrijving</label>
                                        <textarea 
                                            name="description" 
                                            rows={4} 
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            placeholder="Beschrijf je idee in detail..."
                                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 focus:bg-blue-900/10 outline-none transition-all resize-none"
                                        />
                                    </div>
                                    
                                    <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-blue-500/50 hover:bg-white/5 transition-all cursor-pointer">
                                        <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                                        <p className="text-gray-400 text-sm">Sleep referentiefoto's hierheen of klik om te uploaden</p>
                                    </div>
                                </motion.div>
                            )}

                             {/* STEP 3: Date & Time */}
                             {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                                            <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm">3</span>
                                            Datum & Tijd
                                        </h2>
                                        <p className="text-gray-400 text-sm ml-11">Selecteer een voorkeursdatum. De artiest zal dit bevestigen.</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <label className="block text-xs font-bold uppercase text-gray-400 tracking-wider">Kies een datum</label>
                                            <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                                                <input 
                                                    type="date" 
                                                    name="date"
                                                    value={formData.date}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-transparent text-white p-2 outline-none [color-scheme:dark]"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="block text-xs font-bold uppercase text-gray-400 tracking-wider">Voorkeurstijd</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {['10:00', '13:00', '16:00', '19:00'].map(time => (
                                                    <button
                                                        key={time}
                                                        type="button"
                                                        onClick={() => setFormData({...formData, time})}
                                                        className={`p-3 rounded-lg border text-sm font-medium transition-all
                                                            ${formData.time === time 
                                                                ? 'bg-blue-600 border-blue-600 text-white' 
                                                                : 'border-white/10 text-gray-400 hover:border-white/30'
                                                            }`}
                                                    >
                                                        {time}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                             {/* STEP 4: Summary */}
                             {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                                            <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm">4</span>
                                            Controleer Aanvraag
                                        </h2>
                                        <p className="text-gray-400 text-sm ml-11">Klop alles? Verstuur dan je aanvraag.</p>
                                    </div>

                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4">
                                        <div className="flex justify-between border-b border-white/5 pb-4">
                                            <span className="text-gray-400">Naam</span>
                                            <span className="text-white font-medium">{formData.name}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/5 pb-4">
                                            <span className="text-gray-400">Email</span>
                                            <span className="text-white font-medium">{formData.email}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/5 pb-4">
                                            <span className="text-gray-400">Plaatsing</span>
                                            <span className="text-white font-medium capitalize">{formData.placement || '-'}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/5 pb-4">
                                            <span className="text-gray-400">Datum</span>
                                            <span className="text-white font-medium">{formData.date || '-'}</span>
                                        </div>
                                        <div>
                                            <span className="block text-gray-400 mb-2">Idee</span>
                                            <p className="text-gray-300 text-sm bg-black/20 p-3 rounded">{formData.description || 'Geen beschrijving'}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8 pt-8 border-t border-white/10">
                            {step > 1 ? (
                                <button type="button" onClick={prevStep} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                                    <ChevronLeft className="w-5 h-5" /> Back
                                </button>
                            ) : <div></div>}

                            {step < 4 ? (
                                <button 
                                    type="button" 
                                    onClick={nextStep} 
                                    className="bg-white text-black px-6 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2"
                                >
                                    Next Step <ChevronRight className="w-4 h-4" />
                                </button>
                            ) : (
                                <button 
                                    type="submit" 
                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:shadow-lg hover:shadow-blue-600/30 transition-all flex items-center gap-2"
                                >
                                    Confirm Booking <CheckCircle className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-panel p-12 rounded-3xl text-center"
                >
                    <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                        <CheckCircle className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Aanvraag Ontvangen!</h2>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">
                        Bedankt {formData.name}. We hebben je aanvraag voor {formData.date} succesvol ontvangen. De artiest zal je concept bekijken en de boeking per email bevestigen.
                    </p>
                    <button onClick={() => window.location.reload()} className="text-blue-400 hover:text-white font-medium uppercase text-sm tracking-widest">
                        Terug naar Home
                    </button>
                </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Tattoo;