import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';

const Portfolio = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
};

const ProtectedRoute = ({ children }) => {
  const session = localStorage.getItem('isAdmin'); // Simple client-side check for now, real auth happens in component or context
  if (!session) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<Login />} />
        <Route 
          path="/admin/dashboard" 
          element={
             <Dashboard />
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
