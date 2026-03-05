import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Github, Linkedin, Send, Loader2, MapPin, Clock, ArrowUpRight, Sparkles, MessageSquare, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { databases } from '../lib/appwrite';
import { ID } from 'appwrite';
import SpotlightCard from '../components/ui/SpotlightCard';

/* ── Appwrite helpers (reused from Contact component) ── */
const hasAppwriteConfig = () => {
  const required = [
    import.meta.env.VITE_APPWRITE_ENDPOINT,
    import.meta.env.VITE_APPWRITE_PROJECT_ID,
    import.meta.env.VITE_APPWRITE_DATABASE_ID,
    import.meta.env.VITE_APPWRITE_COLLECTION_ID,
  ];
  return required.every((v) => Boolean(v));
};

const openMailClientFallback = ({ name, email, message }) => {
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:support@balirwalvin.me?subject=${subject}&body=${body}`;
};

/* ── floating decoration blobs ── */
const FloatingBlob = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full pointer-events-none ${className}`}
    animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
    transition={{ duration: 6, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

/* ── social links ── */
const socialLinks = [
  { icon: Github, href: 'https://github.com/balirwaalvin', label: 'GitHub', desc: '@balirwaalvin' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/balirwa-alvin', label: 'LinkedIn', desc: 'Balirwa Alvin' },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    href: 'https://x.com/badd_ug',
    label: 'X (Twitter)',
    desc: '@badd_ug',
  },
];

/* ── info cards data ── */
const infoCards = [
  { icon: Mail, title: 'Email', value: 'support@balirwalvin.me', href: 'mailto:support@balirwalvin.me' },
  { icon: MapPin, title: 'Location', value: 'Kampala, Uganda', href: null },
  { icon: Clock, title: 'Timezone', value: 'EAT (UTC +3)', href: null },
  { icon: MessageSquare, title: 'Response Time', value: 'Within 24 hours', href: null },
];

/* ── main page ── */
const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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

  return (
    <div className="min-h-screen bg-[#050505] pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient decorations */}
      <FloatingBlob className="top-32 -right-32 w-[500px] h-[500px] bg-red-600/[0.03] blur-[140px]" delay={0} />
      <FloatingBlob className="bottom-40 -left-40 w-[400px] h-[400px] bg-purple-500/[0.02] blur-[120px]" delay={2} />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Header ── */}
        <div className="mb-16">
          <Link to="/" className="inline-flex items-center text-red-400 hover:text-red-300 mb-8 transition-colors group">
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <span className="text-red-500 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">Get In Touch</span>
            <h1 className="text-4xl md:text-6xl font-bold font-display text-white mb-6">
              Let's Start a <span className="text-red-500">Conversation</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-xl text-gray-500 max-w-2xl"
          >
            Have a project in mind, a question, or just want to connect? I'd love to hear from you.
            Fill out the form below or reach out through any of my socials.
          </motion.p>
        </div>

        {/* ── Info Cards Row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {infoCards.map((card, i) => {
            const Icon = card.icon;
            const Wrapper = card.href ? 'a' : 'div';
            const wrapperProps = card.href ? { href: card.href, target: card.href.startsWith('mailto') ? undefined : '_blank', rel: 'noopener noreferrer' } : {};
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Wrapper {...wrapperProps}>
                  <SpotlightCard className="h-full">
                    <div className="p-5 flex flex-col items-center text-center gap-2">
                      <div className="p-3 rounded-xl bg-red-500/10 mb-1">
                        <Icon size={20} className="text-red-400" />
                      </div>
                      <span className="text-xs text-gray-600 uppercase tracking-wider font-semibold">{card.title}</span>
                      <span className="text-sm text-gray-300 font-medium">{card.value}</span>
                    </div>
                  </SpotlightCard>
                </Wrapper>
              </motion.div>
            );
          })}
        </div>

        {/* ── Main Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left — Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <SpotlightCard>
              <div className="p-8 md:p-10 relative">
                {/* Glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 rounded-xl bg-red-500/10">
                    <Send size={20} className="text-red-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Send a Message</h2>
                    <p className="text-gray-600 text-sm">I'll get back to you as soon as possible.</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                        className={`w-full px-5 py-4 bg-white/[0.02] border rounded-xl focus:ring-2 focus:ring-red-500/30 focus:border-red-500/30 outline-none text-white transition-all placeholder-gray-700 ${focusedField === 'name' ? 'border-red-500/30' : 'border-white/5'}`}
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
                        className={`w-full px-5 py-4 bg-white/[0.02] border rounded-xl focus:ring-2 focus:ring-red-500/30 focus:border-red-500/30 outline-none text-white transition-all placeholder-gray-700 ${focusedField === 'email' ? 'border-red-500/30' : 'border-white/5'}`}
                        placeholder="wanja@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-500 mb-2 tracking-wide">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-5 py-4 bg-white/[0.02] border rounded-xl focus:ring-2 focus:ring-red-500/30 focus:border-red-500/30 outline-none text-white transition-all placeholder-gray-700 resize-none ${focusedField === 'message' ? 'border-red-500/30' : 'border-white/5'}`}
                      placeholder="Tell me about your project, ideas, or anything you'd like to discuss..."
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
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-green-500/5 border border-green-500/10 rounded-xl text-green-400 text-center text-sm flex items-center justify-center gap-2">
                      <Sparkles size={16} />
                      Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}

                  {submitStatus === 'fallback' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl text-amber-300 text-center text-sm flex items-center justify-center gap-2">
                      <Sparkles size={16} />
                      Your email app was opened to send the message directly.
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl text-red-400 text-center text-sm">
                      Something went wrong. Please try again later.
                    </motion.div>
                  )}
                </form>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Right — Socials & extra */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-6"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Connect Card */}
            <SpotlightCard className="flex-1">
              <div className="p-8 md:p-10 flex flex-col h-full">
                <h3 className="text-lg font-bold text-white mb-2">Connect With Me</h3>
                <p className="text-gray-500 text-sm mb-8">Find me on these platforms — DMs are always open.</p>

                <div className="space-y-4 flex-1">
                  {socialLinks.map((social, i) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                        whileHover={{ x: 4, backgroundColor: 'rgba(220, 38, 38, 0.05)' }}
                        className="flex items-center gap-4 p-4 rounded-xl border border-white/5 hover:border-red-500/20 transition-all group"
                      >
                        <div className="p-2.5 rounded-lg bg-white/[0.03] group-hover:bg-red-500/10 transition-colors">
                          <Icon size={20} className="text-gray-400 group-hover:text-red-400 transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white">{social.label}</p>
                          <p className="text-xs text-gray-600 truncate">{social.desc}</p>
                        </div>
                        <ArrowUpRight size={16} className="text-gray-700 group-hover:text-red-400 transition-colors shrink-0" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </SpotlightCard>

            {/* CTA card */}
            <SpotlightCard>
              <div className="p-8 md:p-10 text-center relative overflow-hidden">
                {/* Rad gradient blob */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-red-500/10 flex items-center justify-center"
                >
                  <Phone size={28} className="text-red-400" />
                </motion.div>

                <h4 className="text-lg font-bold text-white mb-2">Prefer a Call?</h4>
                <p className="text-gray-500 text-sm mb-5 leading-relaxed">
                  Schedule a quick intro call and let's talk through your ideas face to face.
                </p>

                <motion.a
                  href="mailto:support@balirwalvin.me?subject=Schedule a Call"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.03] hover:bg-red-500/10 text-white text-sm font-semibold rounded-xl border border-white/5 hover:border-red-500/20 transition-all"
                >
                  <Mail size={16} />
                  Book a Time
                </motion.a>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
