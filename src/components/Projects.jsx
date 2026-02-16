import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import SpotlightCard from './ui/SpotlightCard';
import ScrollReveal from './ui/ScrollReveal';

import { projectsData } from '../data/projects';
// Use first 3 projects for featured section
const projects = projectsData.slice(0, 3);

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
    >
      <SpotlightCard className="h-full group">
        {/* Image with overlay */}
        <div className="aspect-video overflow-hidden relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-50"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
          
          {/* Hover overlay with buttons */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 backdrop-blur-[2px]">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3.5 bg-white/10 hover:bg-white/20 rounded-2xl text-white backdrop-blur-md transition-all border border-white/10"
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3.5 bg-red-600 hover:bg-red-500 rounded-2xl text-white transition-all shadow-lg shadow-red-500/25"
            >
              <ExternalLink size={20} />
            </motion.a>
          </div>

          {/* Project number */}
          <div className="absolute top-4 right-4 text-white/10 font-display text-5xl font-black">
            0{index + 1}
          </div>
        </div>

        <div className="p-6 relative z-10">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300 font-display">
              {project.title}
            </h3>
            <ArrowUpRight size={18} className="text-gray-600 group-hover:text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0 mt-1" />
          </div>
          <p className="text-gray-500 mb-5 line-clamp-2 text-sm leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium text-red-400/70 bg-red-500/5 rounded-lg border border-red-500/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-32 bg-[#050505] relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 flex flex-col items-center">
          <ScrollReveal>
            <span className="text-red-500 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">Portfolio</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-5">
              Featured <span className="text-red-500">Projects</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              A diverse collection of projects showcasing my expertise in web development, system design, and creative problem solving.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="/projects"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(220, 38, 38, 0.15)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-red-500/20 text-red-400 hover:bg-red-500/5 hover:text-white hover:border-red-500/40 rounded-xl transition-all duration-500 font-semibold"
          >
            View All Projects
            <ArrowUpRight size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
