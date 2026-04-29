'use client';

import React, { useState, useEffect } from 'react';
import {
  Github,
  ExternalLink,
  GraduationCap,
  Star,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Project, fetchProjects, getIcon } from '@/lib/projects';

export default function Page() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 99) return 99;
          return prev + Math.floor(Math.random() * 15) + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    } else {
      setProgress(100);
    }
  }, [loading]);

  useEffect(() => {
    async function loadProjects() {
      const data = await fetchProjects();
      setProjectList(data);
      setLoading(false);
    }
    loadProjects();
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="min-h-screen bg-brand-bg font-sans selection:bg-brand-red/20 selection:text-brand-red transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1c1c1c] px-6 lg:px-12 h-16 flex items-center justify-between border-b-4 border-[#1c1c1c]">
        <a href="#" className="flex items-center gap-3 text-white font-display font-bold tracking-wider hover:text-brand-red transition-colors">
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            className="w-2.5 h-2.5 bg-brand-red"
          />
          JIRAYUS.EXE
        </a>
        <div className="hidden md:flex gap-8 items-center">
          {['ABOUT', 'PROJECTS', 'SKILLS', 'CONTACT'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[10px] font-mono font-medium text-gray-400 hover:text-white transition-colors tracking-[0.2em]"
            >
              {item}
            </a>
          ))}
          <Link
            href="/about-info"
            className="text-[10px] font-mono font-bold text-brand-red border border-brand-red/30 px-2 py-1 hover:bg-brand-red hover:text-white transition-all tracking-[0.2em]"
          >
            SITE_INFO
          </Link>
          <button
            onClick={toggleTheme}
            className="text-white hover:text-brand-red transition-colors p-2"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>
        <a
          href="#contact"
          className="bg-white text-[#1c1c1c] px-4 py-1.5 text-xs font-mono font-bold hover:bg-brand-red hover:text-white transition-all shadow-[4px_4px_0_0_#d63b2a]"
        >
          [ CONTACT ]
        </a>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 px-6 lg:px-12 flex flex-col items-center justify-center text-center border-b-4 border-brand-ink bg-brand-card overflow-hidden">
        {/* Subtle dot grid bg */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--ink) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-mono text-brand-ink-soft tracking-[0.3em] mb-8"
        >
          ▶ LOADING PORTFOLIO... {progress}% {progress === 100 ? 'DONE' : ''}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-tight tracking-tight mb-6"
        >
          JIRAYUS <br /> MOOLSART
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="w-32 h-1 bg-brand-ink mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl font-display font-medium text-brand-ink-mid tracking-[0.2em] mb-12 uppercase"
        >
          Full Stack Developer
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mb-16"
        >
          {[
            { label: '7 MONTHS', sub: 'INTERNSHIP' },
            { label: '3.31 GPA', sub: 'KMUTNB' },
            { label: 'MAY 2026', sub: 'GRADUATION' }
          ].map((stat, i) => (
            <div key={i} className="bg-brand-bg border-2 border-brand-ink px-6 py-4 shadow-[4px_4px_0_0_var(--shadow)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
              <p className="text-xl font-display font-bold">{stat.label}</p>
              <p className="text-[10px] font-mono font-bold text-brand-ink-soft uppercase mt-1 tracking-wider">{stat.sub}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a href="#projects" className="bg-[#1c1c1c] text-white px-8 py-3.5 font-display font-extrabold tracking-widest text-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-transform flex items-center gap-2 group shadow-[4px_4px_0_0_#d63b2a]">
            ▶ VIEW PROJECTS
          </a>
          <a href="https://github.com/fermfirxzer" target="_blank" className="bg-transparent border-2 border-brand-ink text-brand-ink px-6 py-3.5 font-display font-extrabold tracking-widest text-sm hover:bg-brand-bg transition-colors flex items-center gap-2">
            <Github className="w-4 h-4" /> GITHUB
          </a>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 lg:px-12 border-b-4 border-brand-ink">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="ABOUT ME" />
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-brand-card border-2 border-brand-ink p-8 shadow-[6px_6px_0_0_var(--shadow)]">
              <h3 className="text-[10px] font-mono font-bold text-brand-ink-soft tracking-[0.2em] border-b-2 border-brand-ink pb-4 mb-6 uppercase">// PROFILE</h3>
              <p className="leading-relaxed text-base italic text-brand-ink-mid">
                Computer Science student at King Mongkut's University of Technology North Bangkok (KMUTNB).
              </p>
              <p className="leading-relaxed text-base mt-4 font-medium text-brand-ink-mid">
                I am a dedicated developer focused on building scalable, modern web applications that solve real-world problems. With hands-on industry experience from internship, I bring production-ready coding practices to every project.
              </p>
            </div>
            <div className="bg-brand-card border-2 border-brand-ink p-8 shadow-[6px_6px_0_0_var(--shadow)]">
              <h3 className="text-[10px] font-mono font-bold text-brand-ink-soft tracking-[0.2em] border-b-2 border-brand-ink pb-4 mb-6 uppercase">// EDUCATION</h3>
              <div className="flex items-start gap-4">
                <GraduationCap className="w-8 h-8 text-brand-red flex-shrink-0" />
                <div>
                  <p className="font-display font-bold text-lg text-brand-ink">B.Sc. Computer Science</p>
                  <p className="text-sm font-medium text-brand-ink-mid mt-1">Faculty of Applied Science, KMUTNB</p>
                  <p className="text-xs font-mono font-bold text-brand-ink-soft mt-2 tracking-widest uppercase">2022 — 2026</p>
                  <div className="inline-flex items-center gap-2 bg-brand-bg border border-brand-ink mt-4 px-3 py-1 text-xs font-bold tracking-wider">
                    <Star className="w-3 h-3 text-brand-red fill-brand-red" />
                    GPA 3.31 / 4.00
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 lg:px-12 bg-brand-card/50 border-b-4 border-brand-ink">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="EXPERIENCE" />
          <div className="mt-12 bg-brand-card border-2 border-brand-ink p-8 shadow-[8px_8px_0_0_var(--shadow)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-[10px] font-mono font-bold text-brand-ink-soft tracking-[0.2em] mb-2 uppercase">Software Developer Intern</h3>
                <p className="text-2xl font-display font-black text-brand-ink">SCICAP CO., LTD.</p>
              </div>
              <div className="text-right">
                <p className="bg-[#1c1c1c] text-white px-4 py-1 text-[10px] font-mono font-bold tracking-widest inline-block uppercase">7 Months</p>
                <p className="text-xs font-mono font-medium text-brand-ink-soft mt-2 tracking-widest uppercase">Bangkok, Thailand</p>
              </div>
            </div>
            <ul className="space-y-4">
              {[
                'Developed internal banking web applications using Java, Spring Boot, and Thymeleaf.',
                'Maintained enterprise modules on Java Struts 2 framework, focusing on stability and security.',
                'Designed and implemented a Telegram Bot for workflow automation and automated reporting.',
                'Collaborated with QA teams to resolve critical bugs and improve system efficiency.'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-brand-ink-mid leading-relaxed group">
                  <span className="text-brand-red mt-1 font-bold">▶</span>
                  <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 lg:px-12 border-b-4 border-brand-ink">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="PROJECTS" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-brand-card border-2 border-brand-ink p-8 h-[400px] animate-pulse">
                  <div className="w-12 h-4 bg-brand-ink/10 mb-6" />
                  <div className="w-10 h-10 bg-brand-ink/10 mb-8" />
                  <div className="w-3/4 h-6 bg-brand-ink/10 mb-4" />
                  <div className="w-full h-20 bg-brand-ink/10 mb-8" />
                </div>
              ))
            ) : (
              projectList
                .slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage)
                .map((project) => (
                  <div
                    key={project.id}
                    className="bg-brand-card border-2 border-brand-ink p-8 flex flex-col h-full shadow-[6px_6px_0_0_var(--shadow)] hover:-translate-y-1 transition-all group relative"
                  >
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-6">
                        <p className="text-[10px] font-mono font-bold text-brand-ink-soft tracking-[0.2em]">{project.num}</p>
                        <Link 
                          href={`/admin/projects/${project.id}`}
                          className="text-[10px] font-mono font-bold text-brand-ink-soft border border-brand-ink/20 px-2 py-1 hover:bg-brand-ink hover:text-brand-card transition-colors z-10 relative uppercase"
                        >
                          EDIT
                        </Link>
                      </div>
                      <Link href={`/${project.id}`} className="block group-hover:cursor-pointer z-0">
                        <div className="mb-8">{getIcon(project.icon)}</div>
                        <h3 className="text-xl font-display font-black mb-4 leading-tight group-hover:text-brand-red transition-colors">{project.title}</h3>
                        <p className="text-sm text-brand-ink-mid font-medium leading-relaxed mb-8 line-clamp-3">{project.description}</p>
                      </Link>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8 relative z-0">
                      {project.tech.slice(0, 3).map(t => (
                        <span key={t} className="text-[9px] font-mono font-bold border border-brand-rule bg-brand-bg px-2 py-0.5 text-brand-ink-soft uppercase tracking-tighter shadow-[1px_1px_0_0_var(--shadow)]">
                          {t}
                        </span>
                      ))}
                    </div>

                    <Link href={`/${project.id}`} className="bg-[#1c1c1c] text-white font-mono text-[10px] font-bold py-2.5 px-4 w-full text-center flex items-center justify-center gap-2 hover:bg-brand-red transition-colors relative z-10">
                      [ VIEW PROJECT DETAIL ]
                    </Link>
                  </div>
                ))
            )}
          </div>

          {/* Pagination Controls */}
          {!loading && projectList.length > projectsPerPage && (
            <div className="mt-16 flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  setCurrentPage(prev => Math.max(prev - 1, 1));
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-6 py-3 font-mono text-xs font-bold border-2 border-brand-ink transition-all ${currentPage === 1
                  ? 'opacity-30 cursor-not-allowed'
                  : 'bg-brand-bg hover:bg-brand-ink hover:text-brand-bg shadow-[4px_4px_0_0_var(--shadow)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5'
                  }`}
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                PREVIOUS
              </button>

              <div className="flex items-center gap-2 px-4 py-2 bg-brand-card border-2 border-brand-ink font-mono text-xs font-black">
                {String(currentPage).padStart(2, '0')} / {String(Math.ceil(projectList.length / projectsPerPage)).padStart(2, '0')}
              </div>

              <button
                onClick={() => {
                  setCurrentPage(prev => Math.min(prev + 1, Math.ceil(projectList.length / projectsPerPage)));
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                disabled={currentPage === Math.ceil(projectList.length / projectsPerPage)}
                className={`flex items-center gap-2 px-6 py-3 font-mono text-xs font-bold border-2 border-brand-ink transition-all ${currentPage === Math.ceil(projectList.length / projectsPerPage)
                  ? 'opacity-30 cursor-not-allowed'
                  : 'bg-brand-bg hover:bg-brand-ink hover:text-brand-bg shadow-[4px_4px_0_0_var(--shadow)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5'
                  }`}
              >
                NEXT
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 lg:px-12 bg-brand-card border-b-4 border-brand-ink">
        <div className="max-w-4xl mx-auto">
          <SectionHeader title="TECH STACK" />
          <div className="mt-12 space-y-1">
            {[
              { cat: 'FRONT-END', items: ['HTML', 'CSS', 'React.js', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'Thymeleaf'] },
              { cat: 'BACK-END', items: ['Node.js', 'Express.js', 'PHP', 'Spring Boot', 'REST API', 'Struts 2'] },
              { cat: 'DATABASE', items: ['MySQL', 'MongoDB'] },
              { cat: 'TOOLS', items: ['Git', 'GitHub', 'Docker', 'Postman', 'Figma'] }
            ].map((row, i) => (
              <div key={i} className="grid md:grid-cols-[180px_1fr] border-t-2 border-brand-ink py-8 gap-6 group">
                <p className="text-xs font-mono font-bold text-brand-ink-soft tracking-[0.2em] pt-1 uppercase group-hover:text-brand-ink transition-colors">{row.cat}</p>
                <div className="flex flex-wrap gap-3">
                  {row.items.map(skill => (
                    <span
                      key={skill}
                      className="bg-brand-bg border-2 border-brand-ink px-4 py-1.5 text-xs font-mono font-bold text-brand-ink shadow-[2px_2px_0_0_var(--shadow)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <div className="border-t-2 border-brand-ink" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 lg:px-12 border-b-4 border-brand-ink">
        <div className="max-w-2xl mx-auto text-center">
          <SectionHeader title="CONTACT" />
          <p className="mt-8 text-brand-ink-mid font-medium mb-12">
            OPEN TO FULL-STACK & BACK-END ROLES<br />
            AVAILABLE FULL-TIME FROM MAY 2026
          </p>

          <div className="flex flex-col border-2 border-brand-ink divide-y-2 divide-brand-ink shadow-[8px_8px_0_0_var(--shadow)]">
            <ContactItem label="PHONE" value="080-057-3832" href="tel:0800573832" />
            <ContactItem label="EMAIL" value="jirayusfirxzer@gmail.com" href="mailto:jirayusfirxzer@gmail.com" />
            <ContactItem label="GITHUB" value="fermfirxzer" href="https://github.com/fermfirxzer" target="_blank" />
          </div>
        </div>
      </section>

      <footer className="bg-[#1c1c1c] py-10 px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-[10px] font-mono font-bold text-gray-500 tracking-widest uppercase">
          © 2026 JIRAYUS MOOLSART. BUILT WITH TYPE-SAFE COMPONENTS.
        </p>
        <div className="flex gap-6">
          <a href="https://github.com/fermfirxzer" target="_blank" className="text-[10px] font-mono font-bold text-gray-400 hover:text-white transition-colors tracking-widest uppercase">
            GITHUB.COM/FERMFIRXZER ↗
          </a>
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-4 border-4 border-brand-ink px-10 py-5 bg-brand-bg shadow-[8px_8px_0_0_var(--shadow)]"
      >
        <span className="w-2 h-2 bg-brand-ink" />
        <h2 className="text-xl md:text-2xl font-display font-black tracking-[0.1em] uppercase text-brand-ink">{title}</h2>
        <span className="w-2 h-2 bg-brand-ink" />
      </motion.div>
    </div>
  );
}

function ContactItem({ label, value, href, target }: { label: string, value: string, href: string, target?: string }) {
  return (
    <a
      href={href}
      target={target}
      className="group bg-brand-card hover:bg-[#1c1c1c] transition-colors flex items-center justify-between p-6 md:p-8"
    >
      <div className="flex items-center gap-8 text-left">
        <p className="w-20 text-[10px] font-mono font-bold text-brand-ink-soft tracking-[0.2em] group-hover:text-white/40 transition-colors uppercase">{label}</p>
        <p className="text-lg md:text-xl font-display font-bold text-brand-ink group-hover:text-white transition-colors uppercase">{value}</p>
      </div>
      <ExternalLink className="w-5 h-5 text-brand-ink-soft group-hover:text-brand-red transition-colors" />
    </a>
  );
}
