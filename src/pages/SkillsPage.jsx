import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Zap, Server, Wrench, Layers, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SpotlightCard from '../components/ui/SpotlightCard';

/* ── skill data with proficiency levels ── */
const skillCategories = [
  {
    id: 'frontend',
    category: 'Frontend',
    icon: Zap,
    color: 'red',
    description: 'Crafting pixel-perfect, accessible interfaces with modern frameworks and animation libraries.',
    skills: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 85 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Next.js', level: 80 },
      { name: 'Framer Motion', level: 88 },
      { name: 'Redux', level: 78 },
    ],
  },
  {
    id: 'backend',
    category: 'Backend',
    icon: Server,
    color: 'amber',
    description: 'Building robust APIs and scalable server-side systems that power great products.',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'FastAPI', level: 75 },
      { name: 'PostgreSQL', level: 82 },
      { name: 'GraphQL', level: 70 },
      { name: 'Firebase', level: 78 },
    ],
  },
  {
    id: 'devops',
    category: 'Tools & DevOps',
    icon: Wrench,
    color: 'emerald',
    description: 'Streamlining development workflows with containerisation, cloud, and CI/CD pipelines.',
    skills: [
      { name: 'Git', level: 95 },
      { name: 'Docker', level: 80 },
      { name: 'AWS', level: 72 },
      { name: 'Linux', level: 85 },
      { name: 'Jest', level: 76 },
      { name: 'CI/CD', level: 78 },
    ],
  },
];

/* ── colour maps for theming per category ── */
const colorMap = {
  red:     { bar: 'bg-red-500',    glow: 'shadow-red-500/30',    text: 'text-red-400',    bg: 'bg-red-500/10',    border: 'border-red-500/20',    ring: 'ring-red-500/20' },
  amber:   { bar: 'bg-amber-500',  glow: 'shadow-amber-500/30',  text: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/20',  ring: 'ring-amber-500/20' },
  emerald: { bar: 'bg-emerald-500',glow: 'shadow-emerald-500/30',text: 'text-emerald-400',bg: 'bg-emerald-500/10',border: 'border-emerald-500/20',ring: 'ring-emerald-500/20' },
};

/* ── animated proficiency bar ── */
const ProficiencyBar = ({ level, color, delay = 0 }) => {
  const c = colorMap[color];
  return (
    <div className="relative h-2 w-full rounded-full bg-white/[0.04] overflow-hidden">
      <motion.div
        className={`absolute inset-y-0 left-0 rounded-full ${c.bar}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Shine effect */}
      <motion.div
        className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileInView={{ x: '500%' }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: delay + 0.6, ease: 'easeInOut' }}
      />
    </div>
  );
};

/* ── individual skill row ── */
const SkillRow = ({ skill, color, index }) => {
  const c = colorMap[color];
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
          {skill.name}
        </span>
        <motion.span
          className={`text-xs font-mono ${c.text} opacity-0 group-hover:opacity-100 transition-opacity`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 + 0.4 }}
        >
          {skill.level}%
        </motion.span>
      </div>
      <ProficiencyBar level={skill.level} color={color} delay={index * 0.08} />
    </motion.div>
  );
};

/* ── orbiting dots decoration ── */
const OrbitRing = ({ radius, duration, dotCount, color }) => (
  <motion.div
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    style={{ width: radius * 2, height: radius * 2 }}
    animate={{ rotate: 360 }}
    transition={{ duration, repeat: Infinity, ease: 'linear' }}
  >
    {[...Array(dotCount)].map((_, i) => {
      const angle = (360 / dotCount) * i;
      const rad = (angle * Math.PI) / 180;
      const x = Math.cos(rad) * radius;
      const y = Math.sin(rad) * radius;
      return (
        <div
          key={i}
          className={`absolute w-1.5 h-1.5 rounded-full ${color} opacity-30`}
          style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: 'translate(-50%, -50%)' }}
        />
      );
    })}
  </motion.div>
);

/* ── main page ── */
const SkillsPage = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const active = skillCategories.find((c) => c.id === activeCategory);
  const ac = colorMap[active.color];

  return (
    <div className="min-h-screen bg-[#050505] pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background blurs */}
      <div className="absolute top-40 -left-40 w-[500px] h-[500px] bg-red-600/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-amber-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Header ── */}
        <div className="mb-16">
          <Link
            to="/"
            className="inline-flex items-center text-red-400 hover:text-red-300 mb-8 transition-colors group"
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <span className="text-red-500 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">What I Work With</span>
            <h1 className="text-4xl md:text-6xl font-bold font-display text-white mb-6">
              Technical <span className="text-red-500">Arsenal</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-xl text-gray-500 max-w-2xl"
          >
            A deep dive into the technologies and tools I use every day to build high-quality digital experiences.
          </motion.p>
        </div>

        {/* ── Category Tabs ── */}
        <div className="flex flex-wrap gap-3 mb-14">
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon;
            const isActive = cat.id === activeCategory;
            const c = colorMap[cat.color];
            return (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? `${c.bg} ${c.border} ${c.text} shadow-lg ${c.glow}`
                    : 'bg-white/[0.02] border-white/5 text-gray-500 hover:text-white hover:border-white/10'
                }`}
              >
                <Icon size={18} />
                {cat.category}
              </motion.button>
            );
          })}
        </div>

        {/* ── Active Category Details ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left — visual showcase */}
              <div className="lg:col-span-2">
                <SpotlightCard className="h-full">
                  <div className="p-8 md:p-10 flex flex-col items-center justify-center h-full relative min-h-[360px]">
                    {/* Orbit decoration */}
                    <OrbitRing radius={100} duration={30} dotCount={8} color={ac.bar} />
                    <OrbitRing radius={140} duration={45} dotCount={12} color={ac.bar} />

                    {/* Centre icon */}
                    <motion.div
                      key={active.id + '-icon'}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      className={`relative z-10 w-24 h-24 rounded-2xl ${ac.bg} flex items-center justify-center mb-8 shadow-xl ${ac.glow}`}
                    >
                      <active.icon size={40} className={ac.text} />
                    </motion.div>

                    <h3 className="text-2xl font-bold font-display text-white mb-3 text-center relative z-10">
                      {active.category}
                    </h3>
                    <p className="text-gray-500 text-center text-sm leading-relaxed max-w-xs relative z-10">
                      {active.description}
                    </p>

                    {/* Stat chip */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className={`mt-6 px-4 py-2 rounded-full ${ac.bg} ${ac.text} text-xs font-semibold flex items-center gap-1.5 relative z-10`}
                    >
                      <Layers size={14} />
                      {active.skills.length} Technologies
                    </motion.div>
                  </div>
                </SpotlightCard>
              </div>

              {/* Right — proficiency bars */}
              <div className="lg:col-span-3">
                <SpotlightCard>
                  <div className="p-8 md:p-10">
                    <div className="flex items-center gap-2 mb-8">
                      <Star size={18} className={ac.text} />
                      <h4 className="text-lg font-semibold text-white">Proficiency Breakdown</h4>
                    </div>

                    <div className="space-y-6">
                      {active.skills.map((skill, i) => (
                        <SkillRow key={skill.name} skill={skill} color={active.color} index={i} />
                      ))}
                    </div>

                    {/* Average score */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between"
                    >
                      <span className="text-gray-500 text-sm">Average Proficiency</span>
                      <span className={`text-lg font-bold font-mono ${ac.text}`}>
                        {Math.round(active.skills.reduce((sum, s) => sum + s.level, 0) / active.skills.length)}%
                      </span>
                    </motion.div>
                  </div>
                </SpotlightCard>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── All Skills Grid (quick glance) ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold font-display text-white mb-10 flex items-center gap-3">
            <ChevronRight size={22} className="text-red-500" />
            Full Stack at a Glance
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {skillCategories.flatMap((cat) =>
              cat.skills.map((skill) => {
                const c = colorMap[cat.color];
                return (
                  <motion.div
                    key={skill.name}
                    whileHover={{
                      scale: 1.08,
                      y: -4,
                      borderColor: `${cat.color === 'red' ? 'rgba(220,38,38,0.4)' : cat.color === 'amber' ? 'rgba(245,158,11,0.4)' : 'rgba(16,185,129,0.4)'}`,
                    }}
                    className="flex flex-col items-center gap-2 p-5 bg-[#0a0a0a] rounded-2xl border border-white/5 cursor-default group transition-all duration-300"
                  >
                    <span className={`text-2xl font-bold font-mono ${c.text} opacity-80 group-hover:opacity-100 transition-opacity`}>
                      {skill.level}
                    </span>
                    <span className="text-xs text-gray-500 group-hover:text-white text-center transition-colors font-medium">
                      {skill.name}
                    </span>
                    <div className="w-8 h-0.5 rounded-full bg-white/5 group-hover:bg-current transition-colors" style={{ color: cat.color === 'red' ? '#ef4444' : cat.color === 'amber' ? '#f59e0b' : '#10b981' }} />
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillsPage;
