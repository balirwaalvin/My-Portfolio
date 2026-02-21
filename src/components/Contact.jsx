import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, Loader2, ArrowUpRight, Sparkles } from 'lucide-react';
import ScrollReveal from './ui/ScrollReveal';
import { databases } from '../lib/appwrite';
import { ID } from 'appwrite';

const hasAppwriteConfig = () => {
  const required = [
    import.meta.env.VITE_APPWRITE_ENDPOINT,
    import.meta.env.VITE_APPWRITE_PROJECT_ID,
    import.meta.env.VITE_APPWRITE_DATABASE_ID,
    import.meta.env.VITE_APPWRITE_COLLECTION_ID,
  ];
  return required.every((value) => Boolean(value));
};

const openMailClientFallback = ({ name, email, message }) => {
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:hello@alvin.dev?subject=${subject}&body=${body}`;
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'fallback' | 'error' | null
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!hasAppwriteConfig()) {
      openMailClientFallback(formData);
      setSubmitStatus('fallback');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      return;
    }

    try {
      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        ID.unique(),
        formData
      );
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      openMailClientFallback(formData);
      setSubmitStatus('fallback');
      setFormData({ name: '', email: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/balirwaalvin', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/balirwa-alvin', label: 'LinkedIn' },
    { 
      icon: () => (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ), 
      href: 'https://x.com/badd_ug', 
      label: 'X' 
    },
  ];

  return (
    <footer id="contact" className="bg-[#050505] pt-32 pb-10 relative overflow-hidden">
      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
      
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-600/[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Text Section */}
          <div className="flex flex-col justify-center">
            <ScrollReveal>
              <span className="text-red-500 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">Get In Touch</span>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <h2 className="text-4xl md:text-6xl font-bold font-display text-white mb-8 leading-tight">
                Let's Build Something{' '}
                <span className="text-red-500 relative">
                  Amazing
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-red-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </span>{' '}
                Together
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <p className="text-gray-500 text-lg mb-10 leading-relaxed max-w-md">
                I'm currently looking for new opportunities. Whether you have a project in mind, a question, or just want to say hi, I'll do my best to get back to you!
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <a 
                href="mailto:hello@alvin.dev" 
                className="inline-flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors group mb-10"
              >
                <div className="p-3 bg-red-500/10 rounded-xl group-hover:bg-red-500/20 transition-colors">
                  <Mail size={20} className="text-red-400" />
                </div>
                <span className="text-lg">hello@alvin.dev</span>
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </ScrollReveal>

            {/* Social Links */}
            <ScrollReveal delay={0.4}>
              <div className="flex gap-3">
                {socialLinks.map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-white/[0.03] border border-white/5 rounded-xl text-gray-400 hover:text-white hover:border-red-500/20 hover:bg-red-500/5 transition-all duration-300"
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#0a0a0a] backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden"
          >
            {/* Form card glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-500 mb-2 tracking-wide">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-5 py-4 bg-white/[0.02] border rounded-xl focus:ring-2 focus:ring-red-500/30 focus:border-red-500/30 outline-none text-white transition-all placeholder-gray-700 ${
                    focusedField === 'name' ? 'border-red-500/30' : 'border-white/5'
                  }`}
                  placeholder="Wanja Grace"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-500 mb-2 tracking-wide">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-5 py-4 bg-white/[0.02] border rounded-xl focus:ring-2 focus:ring-red-500/30 focus:border-red-500/30 outline-none text-white transition-all placeholder-gray-700 ${
                    focusedField === 'email' ? 'border-red-500/30' : 'border-white/5'
                  }`}
                  placeholder="wanja@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-500 mb-2 tracking-wide">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-5 py-4 bg-white/[0.02] border rounded-xl focus:ring-2 focus:ring-red-500/30 focus:border-red-500/30 outline-none text-white transition-all placeholder-gray-700 resize-none ${
                    focusedField === 'message' ? 'border-red-500/30' : 'border-white/5'
                  }`}
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(220, 38, 38, 0.2)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-red-600 hover:bg-red-500 disabled:bg-red-600/30 text-white rounded-xl font-semibold transition-all shadow-lg shadow-red-500/10 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/5 border border-green-500/10 rounded-xl text-green-400 text-center text-sm flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} />
                  Message sent successfully via Appwrite! I'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'fallback' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl text-amber-300 text-center text-sm flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} />
                  Appwrite unavailable, so your email app was opened to send the message.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl text-red-400 text-center text-sm"
                >
                  Something went wrong. Please try again later.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-white/5 mt-24">
          <p className="text-gray-600 text-sm mb-4 md:mb-0 relative group">
            © {new Date().getFullYear()} Balirwa Alvin Daniel. All rights reserved.
            <a href="/admin" className="absolute -right-4 top-0 w-2 h-2 opacity-20 hover:opacity-100 cursor-pointer transition-opacity">.</a>
          </p>

          <div className="flex space-x-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a 
                  key={social.label}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-red-400 transition-colors"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
