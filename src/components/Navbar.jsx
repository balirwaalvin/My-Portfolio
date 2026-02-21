import React, { useState } from 'react';
import { Menu, X, Home, FolderOpen, BookOpen, Wrench, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const { scrollY } = useScroll();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Projects', href: '/projects', icon: FolderOpen },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'Skills', href: '/skills', icon: Wrench },
    { name: 'Contact', href: '/contact', icon: MessageCircle },
  ];

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 200) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setAtTop(latest < 50);
  });

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Floating Navigation Card */}
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500`}
      >
        {/* Desktop Floating Card */}
        <div className="hidden md:block">
          <motion.div
            initial={{ y: -50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`flex items-center gap-1 px-2 py-2 rounded-2xl border transition-all duration-500 ${
              atTop 
                ? 'bg-black/40 border-white/5 backdrop-blur-sm' 
                : 'bg-black/80 border-red-500/10 backdrop-blur-xl shadow-lg shadow-red-500/5'
            }`}
          >
            {/* Logo */}
            <Link to="/" className="px-4 py-2 mr-2">
              <motion.span 
                className="text-xl font-bold font-display tracking-tight"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-red-500">B</span>
                <span className="text-white">alirwa</span>
              </motion.span>
            </Link>

            {/* Divider */}
            <div className="w-px h-6 bg-white/10" />

            {/* Nav Links */}
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <div key={link.name} className="relative group">
                  <Link to={link.href}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        active 
                          ? 'text-white bg-red-600/20' 
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon size={16} className={active ? 'text-red-400' : 'text-gray-500 group-hover:text-red-400 transition-colors'} />
                      {link.name}
                    </motion.div>
                  </Link>
                  {active && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile Floating Button */}
        <div className="md:hidden">
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="p-3 bg-black/80 backdrop-blur-xl border border-red-500/20 rounded-2xl text-white shadow-lg shadow-red-500/10"
          >
            {isOpen ? <X className="h-6 w-6 text-red-400" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Card */}
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-sm"
            >
              <div className="bg-[#0a0a0a] border border-red-500/10 rounded-3xl p-8 shadow-2xl shadow-red-500/5">
                {/* Logo at top */}
                <div className="text-center mb-8">
                  <span className="text-3xl font-bold font-display">
                    <span className="text-red-500">B</span>
                    <span className="text-white">alirwa</span>
                  </span>
                  <div className="w-12 h-0.5 bg-red-500/50 mx-auto mt-3" />
                </div>

                {/* Links */}
                <div className="space-y-2">
                  {navLinks.map((link, i) => {
                    const Icon = link.icon;
                    return (
                      <motion.div
                        key={link.name}
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.08, duration: 0.3 }}
                      >
                        <Link
                          to={link.href}
                          onClick={() => setIsOpen(false)}
                          className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-gray-300 hover:text-white hover:bg-red-500/10 transition-all group"
                        >
                          <Icon size={20} className="text-red-500/50 group-hover:text-red-400 transition-colors" />
                          <span className="text-lg font-medium">{link.name}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
