import React from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Zap } from 'lucide-react';
import ScrollReveal from './ui/ScrollReveal';

const About = () => {
  return (
    <section id="about" className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 text-indigo-500/10"
      >
        <Code size={120} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-10 text-purple-500/10"
      >
        <Server size={100} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-lg opacity-30 transform -rotate-6"></div>
            <img 
              src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=800&q=80" 
              alt="Programming Setup" 
              className="relative rounded-2xl shadow-2xl border border-slate-800"
            />
          </motion.div>

          <div>
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Who is <span className="text-indigo-500">Balirwa?</span>
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                I'm a software engineer with a passion for building scalable, high-performance applications. With a deep understanding of modern web technologies, I treat code like an art form—crafting solutions that are not only functional but also beautiful and intuitive.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to open source, or optimizing my development workflow.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ScrollReveal delay={0.6}>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-4 hover:border-indigo-500/50 transition-colors">
                  <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400">
                    <Code size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Full Stack</h4>
                    <p className="text-sm text-gray-400">Frontend & Backend</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.7}>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-4 hover:border-purple-500/50 transition-colors">
                  <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                    <Server size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">System Design</h4>
                    <p className="text-sm text-gray-400">Scalable Architecture</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
