import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from './ui/ScrollReveal';

const skillsData = [
  {
    category: 'Frontend',
    icon: '⚡',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Framer Motion', 'Redux']
  },
  {
    category: 'Backend',
    icon: '🔧',
    skills: ['Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'GraphQL', 'Firebase']
  },
  {
    category: 'Tools & DevOps',
    icon: '🚀',
    skills: ['Git', 'Docker', 'AWS', 'Linux', 'Jest', 'CI/CD']
  }
];

const SkillPill = ({ skill, index }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8, y: 10 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ 
      scale: 1.08, 
      backgroundColor: 'rgba(220, 38, 38, 0.15)',
      borderColor: 'rgba(220, 38, 38, 0.4)',
      color: '#fff',
    }}
    className="px-4 py-2.5 bg-white/[0.02] text-gray-400 rounded-xl text-sm font-medium border border-white/5 cursor-default transition-all duration-300 inline-block"
  >
    {skill}
  </motion.span>
);

const Skills = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section id="skills" ref={sectionRef} className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Background elements */}
      <motion.div 
        style={{ y: parallaxY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-500/[0.02] rounded-full blur-[100px] pointer-events-none"
      />
      
      {/* Decorative lines */}
      <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-transparent to-red-500/10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-px h-32 bg-gradient-to-t from-transparent to-red-500/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 flex flex-col items-center">
          <ScrollReveal>
            <span className="text-red-500 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">What I Use</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-5">
              Technical <span className="text-red-500">Arsenal</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              The tools and technologies I use to bring ideas to life.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillsData.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              whileHover={{ y: -5, borderColor: 'rgba(220, 38, 38, 0.2)' }}
              className="bg-[#0a0a0a] p-8 rounded-2xl border border-white/5 group relative overflow-hidden transition-all duration-500"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Category header */}
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-xl font-bold text-white font-display group-hover:text-red-400 transition-colors duration-300">
                  {category.category}
                </h3>
              </div>

              {/* Red accent line */}
              <div className="w-12 h-0.5 bg-red-500/30 mb-8 group-hover:w-full transition-all duration-700" />

              {/* Skills */}
              <div className="flex flex-wrap gap-2.5 relative z-10">
                {category.skills.map((skill, skillIndex) => (
                  <SkillPill key={skill} skill={skill} index={skillIndex} />
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
