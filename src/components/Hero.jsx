import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import ParticleBackground from './ui/ParticleBackground';
import TextReveal from './ui/TextReveal';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Particle System */}
      <ParticleBackground />

      {/* Background Gradients (Subtle Overlay) */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xl md:text-2xl font-medium text-indigo-400 mb-4 tracking-wide">
            Hello, I'm
          </h2>
           <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight">
             <TextReveal className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent animate-text-gradient pb-2 inline-block">
               Balirwa Alvin Daniel
             </TextReveal>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            A passionate <span className="text-white font-semibold">Software Engineer</span> crafting magical digital experiences with code.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#projects"
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/25 z-20 pointer-events-auto"
            >
              View Work <ArrowRight size={20} />
            </a>
            <a
              href="#"
              className="px-8 py-3 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white rounded-full font-medium transition-all flex items-center gap-2 backdrop-blur-sm bg-slate-900/50 z-20 pointer-events-auto"
            >
              Resume <Download size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
