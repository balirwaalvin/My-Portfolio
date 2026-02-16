import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, ChevronDown } from 'lucide-react';
import ParticleBackground from './ui/ParticleBackground';
import TextReveal from './ui/TextReveal';

const Hero = () => {
  const letterVariants = {
    hidden: { opacity: 0, y: 80, rotateX: -90 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const name = "Balirwa Alvin Daniel";

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Particle System */}
      <ParticleBackground />

      {/* Red gradient orbs */}
      <div className="absolute top-[-30%] right-[-15%] w-[600px] h-[600px] bg-red-600/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Horizontal accent line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '40%' }}
        transition={{ duration: 1.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-1/3 left-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Intro badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-red-500/20 bg-red-500/5 backdrop-blur-sm mb-8"
        >
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-400 font-medium tracking-wide">Available for work</span>
        </motion.div>

        {/* Name with letter-by-letter animation */}
        <div className="overflow-hidden mb-6">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-extrabold font-display tracking-tighter leading-none">
            {name.split('').map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className={letter === ' ' ? 'inline' : `inline-block ${i < 7 ? 'text-white' : 'text-red-500'}`}
                style={{ perspective: '1000px' }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Subtitle with stagger */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p className="text-lg md:text-2xl text-gray-500 max-w-2xl mx-auto mb-4 leading-relaxed font-light">
            A passionate <span className="text-white font-medium">Software Engineer</span> crafting 
          </p>
          <p className="text-lg md:text-2xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            magical digital experiences with <span className="text-red-400 font-medium">code</span>.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(220, 38, 38, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-semibold transition-all flex items-center gap-3 shadow-lg shadow-red-500/20 z-20 pointer-events-auto"
          >
            View Work <ArrowRight size={20} />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05, borderColor: 'rgba(220, 38, 38, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-white/10 hover:border-red-500/30 text-gray-300 hover:text-white rounded-xl font-semibold transition-all flex items-center gap-3 backdrop-blur-sm bg-white/[0.02] z-20 pointer-events-auto"
          >
            Resume <Download size={20} />
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-gray-600"
          >
            <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
