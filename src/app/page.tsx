'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Github, ExternalLink, GraduationCap, Star, ChevronRight, Sun, Moon, MapPin, Mail, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Project, fetchProjects, getIcon } from '@/lib/projects';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const fadeUp = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.1 }, transition: { duration: 0.6, ease: 'easeOut' } };

export default function Page() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { tObj: t } = useLanguage();
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Split-reveal: draggable vertical line inside hero
  const [splitPct, setSplitPct] = useState(70); // line position as % from left
  const heroRef = useRef<HTMLElement>(null);
  const draggingLine = useRef(false);

  useEffect(() => {
    fetchProjects().then(data => { setProjectList(data); setLoading(false); });
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark';
    if (saved) { setTheme(saved); document.documentElement.setAttribute('data-theme', saved); }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const published = projectList.filter(p => p.isPublished);
  const totalPages = Math.ceil(published.length / projectsPerPage);
  const paginated = published.slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage);

  const marqueeItems = ['FULL-STACK DEV', 'NEXT.JS', 'REACT', 'NODE.JS', 'SPRING BOOT', 'JAVA', 'MONGODB', 'OPEN TO WORK'];

  // Hero split colors per theme
  const heroLeft = theme === 'dark' ? '#0f0f0f' : '#f5f5f0';
  const heroRight = '#73120d';
  const heroTextColor = theme === 'dark' ? '#f0f0f0' : '#1c1c1c';
  const heroTextLight = theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.55)';
  const heroTextMuted = theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)';
  const heroLineColor = theme === 'dark' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.15)';
  const heroLineHover = theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)';
  const heroHandleBg = theme === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)';
  const heroHandleBorder = theme === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)';
  const heroHandleText = theme === 'dark' ? '#fff' : '#1c1c1c';

  // Compute split position for cursor on hero
  const updateSplit = useCallback((clientX: number) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSplitPct(Math.max(0, Math.min(100, pct)));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!draggingLine.current) return;
      e.preventDefault();
      updateSplit(e.clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!draggingLine.current) return;
      updateSplit(e.touches[0].clientX);
    };
    const onUp = () => { draggingLine.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [updateSplit]);

  return (
    <div className="min-h-screen bg-brand-bg font-sans transition-colors duration-300">

      {/* ── NAV ───────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1c1c1c] border-b-2 border-brand-red/40 px-8 lg:px-16 h-14 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 text-white font-display font-black tracking-widest text-sm hover:text-brand-red transition-colors">
          <motion.div animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }} className="w-2 h-2 bg-brand-red" />
          JIRAYUS.EXE
        </a>
        <div className="hidden md:flex gap-8 items-center">
          {[{ id: 'about', label: t.nav.about }, { id: 'projects', label: t.nav.projects }, { id: 'skills', label: t.nav.skills }, { id: 'contact', label: t.nav.contact }].map(item => (
            <a key={item.id} href={`#${item.id}`} className="text-[11px] font-mono font-bold text-gray-400 hover:text-white transition-colors tracking-[0.25em] uppercase">{item.label}</a>
          ))}
          <Link href="/about-info" className="text-[11px] font-mono font-bold text-brand-red border border-brand-red/40 px-2.5 py-1 hover:bg-brand-red hover:text-white transition-all tracking-widest">{t.nav.site_info}</Link>
          <button onClick={toggleTheme} className="text-gray-400 hover:text-brand-red transition-colors p-1.5" aria-label="Toggle theme">
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <LanguageSwitcher />
        </div>
        <a href="#contact" className="bg-brand-red text-white px-5 py-1.5 text-[11px] font-mono font-bold hover:bg-white hover:text-[#1c1c1c] transition-all tracking-widest">
          [{t.nav.contact}]
        </a>
      </nav>

      {/* ── HERO (split-reveal) ──────────────────────────── */}
      <section
        ref={heroRef}
        id="hero"
        className="relative min-h-screen flex flex-col justify-center pt-14 overflow-hidden border-b-4 border-brand-ink"
      >
        {/* ===== LEFT LAYER (base) ===== */}
        <div className="absolute inset-0" style={{ backgroundColor: heroLeft }} />
        <div className="absolute inset-0 dot-grid opacity-[0.06] pointer-events-none" />

        {/* ===== RIGHT LAYER (reveal — clipped from line to right) ===== */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${splitPct}%)` }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: heroRight }} />
          <div className="absolute inset-0 dot-grid opacity-[0.06] pointer-events-none" />
        </div>

        {/* ===== DRAGGABLE LINE ===== */}
        <div
          className="absolute top-0 bottom-0 z-30 flex flex-col items-center cursor-ew-resize select-none"
          style={{ left: `${splitPct}%`, transform: 'translateX(-50%)' }}
          onMouseDown={e => { e.preventDefault(); draggingLine.current = true; }}
          onTouchStart={() => { draggingLine.current = true; }}
        >
          <div className="w-[2px] h-full transition-colors" style={{ backgroundColor: heroLineColor }} />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 backdrop-blur-sm flex items-center justify-center transition-all"
            style={{ backgroundColor: heroHandleBg, borderColor: heroHandleBorder }}
          >
            <span className="text-xs font-mono select-none" style={{ color: heroHandleText }}>⟷</span>
          </div>
        </div>

        {/* ===== HERO CONTENT ===== */}
        <div className="relative z-10 px-8 lg:px-16 max-w-[1400px] mx-auto w-full py-24 pointer-events-none">
          <motion.p {...fadeUp} className="font-mono text-xs tracking-[0.4em] mb-6 flex items-center gap-3 pointer-events-auto" style={{ color: 'var(--red)' }}>
            <span className="w-8 h-px inline-block" style={{ backgroundColor: 'var(--red)' }} />
            PORTFOLIO 2026 — AVAILABLE FOR HIRE
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-display font-black leading-[0.9] tracking-tight mb-8"
            style={{ color: heroTextColor }}
          >
            <span className="block text-[clamp(4rem,12vw,10rem)]">JIRAYUS</span>
            <span className="block text-[clamp(4rem,12vw,10rem)]">MOOLSART</span>
          </motion.h1>

          <motion.div {...fadeUp} transition={{ delay: 0.2, duration: 0.6 }} className="flex flex-wrap items-center gap-6 mb-12 pointer-events-auto">
            <p className="font-display font-bold text-xl md:text-2xl tracking-[0.15em] uppercase" style={{ color: heroTextLight }}>{t.hero.role}</p>
            <span className="hidden md:block w-px h-8" style={{ backgroundColor: heroLineColor }} />
            <div className="flex items-center gap-2 font-mono text-xs tracking-wider" style={{ color: heroTextMuted }}>
              <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--red)' }} /> BANGKOK, THAILAND
            </div>
          </motion.div>

          {/* stat chips */}
          <motion.div {...fadeUp} transition={{ delay: 0.3, duration: 0.6 }} className="flex flex-wrap gap-4 mb-14 pointer-events-auto">
            {[{ label: t.hero.stats.months, sub: t.hero.stats.internship }, { label: t.hero.stats.gpa, sub: t.hero.stats.university }, { label: t.hero.stats.gradDate, sub: t.hero.stats.graduation }].map((s, i) => (
              <div key={i} className="px-6 py-4 border-2 shadow-[4px_4px_0_0_rgba(0,0,0,0.15)]" style={{ borderColor: heroLineColor, backgroundColor: heroTextColor + '0A' }}>
                <p className="text-2xl font-display font-black leading-none" style={{ color: heroTextColor }}>{s.label}</p>
                <p className="text-xs font-mono font-bold uppercase tracking-widest mt-1" style={{ color: 'var(--red)' }}>{s.sub}</p>
              </div>
            ))}
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.4, duration: 0.6 }} className="flex flex-wrap gap-4 pointer-events-auto">
            <a href="#projects" className="px-10 py-4 font-display font-black tracking-widest text-sm hover:opacity-90 transition-all shadow-[6px_6px_0_0_var(--red)]" style={{ backgroundColor: heroTextColor, color: heroLeft }}>
              {t.hero.viewProjects} →
            </a>
            <a href="https://github.com/fermfirxzer" target="_blank" className="border-2 bg-transparent px-8 py-4 font-display font-black tracking-widest text-sm hover:opacity-80 transition-all flex items-center gap-2" style={{ borderColor: heroLineColor, color: heroTextColor }}>
              <Github className="w-4 h-4" /> {t.hero.github}
            </a>
          </motion.div>
        </div>

        {/* drag hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <motion.div animate={{ x: [-6, 6, -6] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="font-mono text-[10px] tracking-[0.3em] uppercase select-none" style={{ color: heroTextMuted }}>
            ⟵ DRAG THE LINE ⟶
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE ───────────────────────────────────────── */}
      <div className="bg-brand-red py-3 overflow-hidden border-y-2 border-brand-ink">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="text-white font-display font-black text-sm tracking-[0.3em] uppercase mx-10 shrink-0">
              {item} <span className="text-white/40">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ─────────────────────────────────────────── */}
      <motion.section id="about" className="py-28 px-8 lg:px-16 border-b-4 border-brand-ink" {...fadeUp}>
        <div className="max-w-[1400px] mx-auto">
          <SectionLabel label={t.about.title} num="01" />
          <div className="grid lg:grid-cols-3 gap-6 mt-14">
            {/* big text card */}
            <div className="lg:col-span-2 bg-brand-card border-2 border-brand-ink p-10 shadow-[8px_8px_0_0_var(--shadow)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 diagonal-lines opacity-30" />
              <h3 className="font-mono text-xs font-bold text-brand-red tracking-[0.25em] uppercase mb-6">{t.about.profile}</h3>
              <p className="text-lg font-medium leading-relaxed text-brand-ink-mid mb-4 italic">{t.about.desc1}</p>
              <p className="text-base leading-relaxed text-brand-ink-mid">{t.about.desc2}</p>
            </div>
            {/* education card */}
            <div className="bg-[#1c1c1c] text-white border-2 border-brand-ink p-10 shadow-[8px_8px_0_0_var(--red)] flex flex-col gap-6">
              <GraduationCap className="w-10 h-10 text-brand-red" />
              <div>
                <p className="font-mono text-xs font-bold text-brand-red tracking-[0.25em] uppercase mb-3">{t.about.education}</p>
                <p className="font-display font-black text-xl leading-tight mb-2">{t.about.degree}</p>
                <p className="text-sm text-gray-400 font-medium mb-4">{t.about.faculty}</p>
                <p className="font-mono text-xs text-gray-500 tracking-widest mb-5">2022 — 2026</p>
                <div className="inline-flex items-center gap-2 bg-brand-red px-4 py-1.5 text-xs font-mono font-black tracking-wider">
                  <Star className="w-3 h-3 fill-white text-white" /> {t.about.gpa}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── EXPERIENCE ────────────────────────────────────── */}
      <motion.section id="experience" className="py-28 px-8 lg:px-16 bg-brand-card/40 border-b-4 border-brand-ink" {...fadeUp}>
        <div className="max-w-[1400px] mx-auto">
          <SectionLabel label={t.experience.title} num="02" />
          <div className="mt-14 grid lg:grid-cols-[1fr_2fr] gap-8">
            {/* left meta */}
            <div className="border-2 border-brand-ink bg-brand-card p-8 shadow-[6px_6px_0_0_var(--shadow)] self-start sticky top-20">
              <p className="font-mono text-xs font-bold text-brand-red tracking-[0.25em] uppercase mb-2">{t.experience.role}</p>
              <p className="font-display font-black text-3xl text-brand-ink mb-6 leading-tight">SCICAP<br />CO., LTD.</p>
              <p className="inline-block bg-[#1c1c1c] text-white px-4 py-1.5 font-mono text-xs font-bold tracking-widest uppercase mb-2">{t.experience.duration}</p>
              <p className="font-mono text-xs text-brand-ink-soft tracking-widest uppercase">{t.experience.location}</p>
            </div>
            {/* right bullets */}
            <div className="space-y-4">
              {[
                'Developed internal banking web applications using Java, Spring Boot, and Thymeleaf.',
                'Maintained enterprise modules on Java Struts 2 framework, focusing on stability and security.',
                'Designed and implemented a Telegram Bot for workflow automation and automated reporting.',
                'Collaborated with QA teams to resolve critical bugs and improve system efficiency.'
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex gap-5 items-start border-2 border-brand-ink bg-brand-card p-6 shadow-[4px_4px_0_0_var(--shadow)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all group"
                >
                  <span className="font-mono text-xs font-black text-brand-red tracking-widest shrink-0 pt-1">{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-brand-ink-mid text-sm font-medium leading-relaxed group-hover:text-brand-ink transition-colors">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── PROJECTS ──────────────────────────────────────── */}
      <motion.section id="projects" className="py-28 px-8 lg:px-16 border-b-4 border-brand-ink" {...fadeUp}>
        <div className="max-w-[1400px] mx-auto">
          <SectionLabel label={t.projects.title} num="03" />
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-14">
            {loading
              ? [1, 2, 3].map(i => <div key={i} className="border-2 border-brand-ink bg-brand-card p-8 h-96 animate-pulse" />)
              : paginated.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.07, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group relative bg-brand-card border-2 border-brand-ink flex flex-col shadow-[6px_6px_0_0_var(--shadow)] hover:shadow-[10px_10px_0_0_var(--red)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300"
                >
                  {/* top stripe */}
                  <div className="h-1.5 w-full bg-brand-ink group-hover:bg-brand-red transition-colors" />
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-6">
                      <p className="font-mono text-xs font-bold text-brand-red tracking-[0.25em]">{project.num}</p>
                      {isLoggedIn && (
                        <Link href={`/admin/projects/${project.id}`} className="font-mono text-xs font-bold text-brand-ink-soft border border-brand-rule px-2 py-0.5 hover:bg-brand-ink hover:text-brand-bg transition-all uppercase z-10 relative">EDIT</Link>
                      )}
                    </div>
                    <Link href={`/${project.id}`} className="block flex-1 z-0">
                      <div className="mb-6 w-14 h-14 border-2 border-brand-ink flex items-center justify-center bg-brand-bg group-hover:bg-brand-red group-hover:border-brand-red transition-all group-hover:[&_svg]:text-white">
                        {getIcon(project.icon)}
                      </div>
                      <h3 className="font-display font-black text-xl leading-tight mb-3 group-hover:text-brand-red transition-colors">{project.title}</h3>
                      <p className="text-sm text-brand-ink-mid leading-relaxed line-clamp-3 mb-6">{project.description}</p>
                    </Link>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.slice(0, 3).map(tech => (
                        <span key={tech} className="font-mono text-xs font-bold border border-brand-rule bg-brand-bg px-2.5 py-1 text-brand-ink-soft uppercase tracking-wide">{tech}</span>
                      ))}
                    </div>
                    <Link href={`/${project.id}`} className="mt-auto bg-[#1c1c1c] text-white font-mono text-xs font-bold py-3 px-4 w-full text-center flex items-center justify-center gap-2 hover:bg-brand-red transition-colors z-10 relative group-hover:tracking-[0.15em]">
                      {t.projects.viewDetail} <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))
            }
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-4">
              <button
                onClick={() => { setCurrentPage(p => Math.max(p - 1, 1)); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-6 py-3 font-mono text-xs font-bold border-2 border-brand-ink transition-all ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-brand-ink hover:text-brand-bg shadow-[4px_4px_0_0_var(--shadow)] hover:shadow-none'}`}
              >
                <ChevronRight className="w-4 h-4 rotate-180" /> {t.projects.prev}
              </button>
              <div className="px-6 py-3 bg-[#1c1c1c] text-white border-2 border-brand-ink font-mono text-xs font-black">
                {String(currentPage).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
              </div>
              <button
                onClick={() => { setCurrentPage(p => Math.min(p + 1, totalPages)); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-6 py-3 font-mono text-xs font-bold border-2 border-brand-ink transition-all ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-brand-ink hover:text-brand-bg shadow-[4px_4px_0_0_var(--shadow)] hover:shadow-none'}`}
              >
                {t.projects.next} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </motion.section>

      {/* ── SKILLS ────────────────────────────────────────── */}
      <motion.section id="skills" className="py-28 px-8 lg:px-16 bg-brand-card/40 border-b-4 border-brand-ink" {...fadeUp}>
        <div className="max-w-[1400px] mx-auto">
          <SectionLabel label={t.skills.title} num="04" />
          <div className="mt-14 divide-y-2 divide-brand-ink border-y-2 border-brand-ink">
            {[
              { cat: t.skills.front, items: ['HTML', 'CSS', 'React.js', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'Thymeleaf'] },
              { cat: t.skills.back, items: ['Node.js', 'Express.js', 'PHP', 'Spring Boot', 'REST API', 'Struts 2'] },
              { cat: t.skills.db, items: ['MySQL', 'MongoDB'] },
              { cat: t.skills.tools, items: ['Git', 'GitHub', 'Docker', 'Postman', 'Figma'] }
            ].map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-[200px_1fr] py-8 gap-6 group hover:bg-brand-card transition-colors px-4 -mx-4"
              >
                <p className="font-mono text-[10px] font-black text-brand-red tracking-[0.3em] uppercase pt-1.5">{row.cat}</p>
                <div className="flex flex-wrap gap-3">
                  {row.items.map(skill => (
                    <span key={skill} className="border-2 border-brand-ink bg-brand-bg px-4 py-1.5 font-mono text-xs font-bold text-brand-ink shadow-[2px_2px_0_0_var(--shadow)] hover:shadow-none hover:bg-brand-ink hover:text-brand-bg hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── CONTACT ───────────────────────────────────────── */}
      <motion.section id="contact" className="py-28 px-8 lg:px-16 border-b-4 border-brand-ink" {...fadeUp}>
        <div className="max-w-[1400px] mx-auto">
          <SectionLabel label={t.contact.title} num="05" />
          <div className="mt-14 grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-xl font-display font-bold text-brand-ink-mid leading-relaxed mb-2">{t.contact.subtitle1}</p>
              <p className="text-base font-medium text-brand-ink-soft">{t.contact.subtitle2}</p>
            </div>
            <div className="border-2 border-brand-ink divide-y-2 divide-brand-ink shadow-[10px_10px_0_0_var(--shadow)]">
              {[
                { label: t.contact.phone, value: '080-057-3832', href: 'tel:0800573832', Icon: Phone },
                { label: t.contact.email, value: 'jirayusfirxzer@gmail.com', href: 'mailto:jirayusfirxzer@gmail.com', Icon: Mail },
                { label: t.contact.github, value: 'fermfirxzer', href: 'https://github.com/fermfirxzer', Icon: Github, target: '_blank' }
              ].map(({ label, value, href, Icon, target }) => (
                <a key={label} href={href} target={target} className="group bg-brand-card hover:bg-[#1c1c1c] transition-colors flex items-center justify-between p-6 md:p-8">
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 border-2 border-brand-ink group-hover:border-brand-red flex items-center justify-center shrink-0 transition-colors">
                      <Icon className="w-4 h-4 text-brand-red" />
                    </div>
                    <div>
                      <p className="font-mono text-[9px] font-bold text-brand-ink-soft group-hover:text-white/40 tracking-[0.25em] uppercase transition-colors">{label}</p>
                      <p className="font-display font-bold text-lg text-brand-ink group-hover:text-white transition-colors">{value}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-brand-ink-soft group-hover:text-brand-red transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="bg-[#1c1c1c] py-10 px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs font-bold text-gray-500 tracking-widest uppercase">{t.footer.copy}</p>
          <a href="https://github.com/fermfirxzer" target="_blank" className="font-mono text-xs font-bold text-gray-400 hover:text-brand-red transition-colors tracking-widest uppercase">
            GITHUB.COM/FERMFIRXZER ↗
          </a>
        </div>
      </footer>
    </div>
  );
}

function SectionLabel({ label, num }: { label: string; num: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-6"
    >
      <span className="font-mono text-[10px] font-black text-brand-red tracking-[0.4em]">{num} /</span>
      <h2 className="font-display font-black text-3xl md:text-4xl tracking-tight text-brand-ink uppercase">{label}</h2>
      <div className="flex-1 h-px bg-brand-rule hidden md:block" />
    </motion.div>
  );
}

