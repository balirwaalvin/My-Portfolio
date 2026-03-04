import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Server, Zap, Sparkles } from 'lucide-react';
import ScrollReveal from './ui/ScrollReveal';
import { useRef } from 'react';

const About = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const stats = [
    { value: '3+', label: 'Years Experience' },
    { value: '15+', label: 'Projects Built' },
    { value: '99.9%', label: 'Code Accuracy' },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Floating decorative elements */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute top-0 right-0 w-96 h-96 bg-red-500/[0.03] rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 w-40 h-40 border border-red-500/5 rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 left-20 w-32 h-32 border border-white/5 rounded-full pointer-events-none"
      />

      {/* Decorative Background Icons */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 right-16 text-red-500/[0.06]"
      >
        <Code size={140} strokeWidth={1} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-24 left-16 text-white/[0.03]"
      >
        <Server size={120} strokeWidth={1} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Image with creative frame */}
          <ScrollReveal direction="left">
            <div className="relative group">
              {/* Red accent border */}
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-br from-red-600/30 via-red-500/10 to-transparent rounded-3xl blur-sm group-hover:blur-md transition-all duration-700"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Corner accents */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-red-500/50 rounded-tl-lg" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-red-500/50 rounded-br-lg" />
              
              <img 
                src="/badd%20at%20google.png" 
                alt="Balirwa at Google" 
                className="relative rounded-2xl shadow-2xl border border-white/5 grayscale hover:grayscale-0 transition-all duration-700"
              />

              {/* Stats overlay card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute -bottom-6 -right-6 bg-[#0a0a0a]/90 backdrop-blur-xl border border-red-500/10 rounded-2xl p-5 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
                    <Sparkles size={20} className="text-red-400" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">Passionate</div>
                    <div className="text-gray-500 text-sm">About Clean Code</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Content */}
          <div>
            <ScrollReveal>
              <span className="text-red-500 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">About Me</span>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-8 leading-tight">
                Who is <span className="text-red-500">Balirwa</span>
                <span className="text-red-500">?</span>
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                I'm a software engineer with a passion for building scalable, high-performance applications. With a deep understanding of modern web & mobile technologies, I treat code like an art form—crafting solutions that are not only functional but also beautiful and intuitive.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-gray-500 text-lg mb-10 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to open source, or optimizing my development workflow and furthermore, love for adventure.
              </p>
            </ScrollReveal>

            {/* Stats row */}
            <ScrollReveal delay={0.4}>
              <div className="flex gap-8 mb-10">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-white font-display">{stat.value}</div>
                    <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            {/* Skill badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ScrollReveal delay={0.5}>
                <motion.div 
                  whileHover={{ scale: 1.02, borderColor: 'rgba(220, 38, 38, 0.3)' }}
                  className="p-5 bg-[#0a0a0a] rounded-2xl border border-white/5 flex items-center gap-4 transition-all duration-300 group"
                >
                  <div className="p-3 bg-red-500/10 rounded-xl text-red-400 group-hover:bg-red-500/20 transition-colors">
                    <Code size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Full Stack</h4>
                    <p className="text-sm text-gray-500">Frontend & Backend</p>
                  </div>
                </motion.div>
              </ScrollReveal>

              <ScrollReveal delay={0.6}>
                <motion.div 
                  whileHover={{ scale: 1.02, borderColor: 'rgba(220, 38, 38, 0.3)' }}
                  className="p-5 bg-[#0a0a0a] rounded-2xl border border-white/5 flex items-center gap-4 transition-all duration-300 group"
                >
                  <div className="p-3 bg-white/5 rounded-xl text-gray-300 group-hover:bg-red-500/10 group-hover:text-red-400 transition-colors">
                    <Server size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">System Design</h4>
                    <p className="text-sm text-gray-500">Scalable Architecture</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
