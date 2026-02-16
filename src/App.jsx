import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';
import ProjectsPage from './pages/ProjectsPage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
};

const Portfolio = () => {
  return (
    <motion.div {...pageTransition}>
      <Navbar />
      <main className="grain">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </motion.div>
  );
};

const ProtectedRoute = ({ children }) => {
  const session = localStorage.getItem('isAdmin');
  if (!session) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Portfolio />} />
        <Route path="/projects" element={
          <motion.div {...pageTransition}>
            <Navbar />
            <ProjectsPage />
          </motion.div>
        } />
        <Route path="/blog" element={
          <motion.div {...pageTransition}>
            <Navbar />
            <BlogListPage />
          </motion.div>
        } />
        <Route path="/blog/:id" element={
          <motion.div {...pageTransition}>
            <Navbar />
            <BlogPostPage />
          </motion.div>
        } />
        <Route path="/admin" element={<Login />} />
        <Route 
          path="/admin/dashboard" 
          element={<Dashboard />} 
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
};

export default App;
