import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SpotlightCard from '../components/ui/SpotlightCard';
import { projectsData } from '../data/projects';

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <Link 
            to="/" 
            className="inline-flex items-center text-red-400 hover:text-red-300 mb-8 transition-colors group"
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-red-500 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">All Work</span>
            <h1 className="text-4xl md:text-6xl font-bold font-display text-white mb-6">
              All <span className="text-red-500">Projects</span>
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-xl text-gray-500 max-w-2xl"
          >
             A detailed showcase of my technical projects, featuring web applications, system designs, and creative experiments.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-10">
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <SpotlightCard className="overflow-hidden">
                <div className="flex flex-col lg:flex-row gap-8 p-6 md:p-8">
                  {/* Image Section */}
                  <div className="lg:w-1/2">
                    <div className="aspect-video rounded-xl overflow-hidden shadow-2xl relative group">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-75"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      
                      {/* Project number overlay */}
                      <div className="absolute top-4 left-4 text-white/10 font-display text-6xl font-black">
                        0{index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="lg:w-1/2 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold font-display text-white mb-4">{project.title}</h2>
                    <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm font-medium text-red-400/70 bg-red-500/5 rounded-lg border border-red-500/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.03] hover:bg-white/[0.06] text-white rounded-xl transition-all border border-white/5 hover:border-white/10"
                      >
                        <Github size={20} />
                        View Code
                      </motion.a>
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(220, 38, 38, 0.2)' }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl transition-all shadow-lg shadow-red-500/10"
                      >
                        <ExternalLink size={20} />
                        Live
                      </motion.a>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
