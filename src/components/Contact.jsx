import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import ScrollReveal from './ui/ScrollReveal';

const Contact = () => {
  return (
    <footer id="contact" className="bg-slate-950 pt-20 pb-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 flex flex-col items-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Let's Build Something Amazing
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
              Im currently looking for new opportunities. Whether you have a question or just want to say hi, I'll do my best to get back to you!
            </p>
          </ScrollReveal>
          
          <motion.a
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            href="mailto:hello@alvin.dev"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-indigo-500/25"
          >
            <Mail size={20} />
            Say Hello
          </motion.a>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-slate-900 mt-10">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Balirwa Alvin Daniel. All rights reserved.
          </p>

          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
