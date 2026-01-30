import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ui/ScrollReveal';

const skillsData = [
  {
    category: 'Frontend',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Framer Motion', 'Redux']
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'GraphQL', 'Firebase']
  },
  {
    category: 'Tools & DevOps',
    skills: ['Git', 'Docker', 'AWS', 'Linux', 'Jest', 'CI/CD']
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-slate-900/50 relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-3xl -z-10 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 flex flex-col items-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Technical Arsenal
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The tools and technologies I use to bring ideas to life.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillsData.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-colors group relative overflow-hidden"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              <h3 className="text-xl font-bold text-white mb-6 group-hover:text-purple-400 transition-colors relative z-10">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-3 relative z-10">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-slate-900 text-gray-300 rounded-lg text-sm font-medium border border-slate-800 group-hover:border-purple-500/20 group-hover:bg-purple-500/10 transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
