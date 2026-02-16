import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import SpotlightCard from './ui/SpotlightCard';
import ScrollReveal from './ui/ScrollReveal';

import { projectsData } from '../data/projects';
// Use first 3 projects for featured section
const projects = projectsData.slice(0, 3);

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <SpotlightCard className="h-full group">
        <div className="aspect-video overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
            <a
              href={project.github}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all transform hover:scale-110"
            >
              <Github size={20} />
            </a>
            <a
              href={project.demo}
              className="p-3 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white transition-all transform hover:scale-110 shadow-lg"
            >
              <ExternalLink size={20} />
            </a>
          </div>
        </div>

        <div className="p-6 relative z-10">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 mb-4 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium text-indigo-300 bg-indigo-500/10 rounded-full border border-indigo-500/20"
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
    <section id="projects" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 flex flex-col items-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured Projects
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A diverse collection of projects showcasing my expertise in web development, system design, and creative problem solving.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 hover:text-white rounded-full transition-all duration-300 transform hover:scale-105"
          >
            View All Projects
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
