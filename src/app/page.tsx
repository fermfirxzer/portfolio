'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Github, ExternalLink, GraduationCap, Star, ChevronRight, ChevronDown, Sun, Moon, MapPin, Mail, Phone, Download } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { Project, projects } from '@/lib/projects';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ProjectDetailDrawer, { ProjectIcon } from '@/components/ProjectDetailDrawer';

const fadeUp = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.1 }, transition: { duration: 0.6, ease: 'easeOut' } };

export default function Page() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { tObj: t } = useLanguage();
  const [projectList] = useState<Project[]>(projects);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeProfileItem, setActiveProfileItem] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Split-reveal: draggable vertical line inside hero
  const [splitPct, setSplitPct] = useState(70); // line position as % from left
  const heroRef = useRef<HTMLElement>(null);
  const draggingLine = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark';
    const initialTheme = saved || 'light';
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
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

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const published = projectList.filter(p => p.isPublished);

  const marqueeItems = ['FULL-STACK DEV', 'NEXT.JS', 'REACT', 'NODE.JS', 'SPRING BOOT', 'JAVA', 'MONGODB', 'OPEN TO WORK'];

  // Hero split colors per theme
  const heroLeft = theme === 'dark' ? '#0f0f0f' : '#e8ddcf';
  const heroRight = theme === 'dark' ? '#73120d' : '#b65443';
  const heroLeftGradient = theme === 'dark'
    ? 'linear-gradient(135deg, #0c0d0f 0%, #14171b 45%, #1b2026 100%)'
    : 'radial-gradient(circle at top left, rgba(255,250,243,0.95) 0%, rgba(255,250,243,0.7) 22%, rgba(0,0,0,0) 48%), linear-gradient(135deg, #fbf5ec 0%, #efe3d3 42%, #dcc8b2 100%)';
  const heroRightGradient = theme === 'dark'
    ? 'linear-gradient(135deg, #5e120f 0%, #7d1d17 50%, #a83728 100%)'
    : 'linear-gradient(135deg, #9f4337 0%, #bb5a48 45%, #d88662 100%)';
  const heroTextColor = theme === 'dark' ? '#f0f0f0' : '#1f1a16';
  const heroTextLight = theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(31,26,22,0.72)';
  const heroTextMuted = theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(31,26,22,0.52)';
  const heroLineColor = theme === 'dark' ? 'rgba(255,255,255,0.25)' : 'rgba(31,26,22,0.18)';
  const heroLineHover = theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)';
  const heroHandleBg = theme === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(255,248,240,0.78)';
  const heroHandleBorder = theme === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(31,26,22,0.22)';
  const heroHandleText = theme === 'dark' ? '#fff' : '#1f1a16';
  const isLightTheme = theme === 'light';
  const chromeBg = isLightTheme ? 'rgba(231,220,205,0.95)' : 'rgba(26,29,33,0.95)';
  const navBorder = isLightTheme ? 'rgba(29,27,25,0.1)' : 'rgba(240,106,90,0.22)';
  const navText = isLightTheme ? 'text-brand-ink hover:text-brand-red' : 'text-brand-bg/92 hover:text-brand-red';
  const navLink = isLightTheme ? 'text-brand-ink-soft hover:text-brand-ink' : 'text-brand-bg/72 hover:text-brand-bg';
  const navMeta = isLightTheme ? 'text-brand-ink-soft hover:text-brand-red' : 'text-brand-bg/72 hover:text-brand-red';
  const navInfoButton = isLightTheme
    ? 'text-brand-red border-brand-red/45 hover:bg-brand-red hover:text-brand-bg'
    : 'text-brand-red border-brand-red/45 hover:bg-brand-red hover:text-[#1a1d21]';
  const navContactButton = isLightTheme
    ? 'bg-brand-ink text-brand-bg hover:bg-brand-red'
    : 'bg-brand-red text-brand-bg hover:bg-[#f6ede4] hover:text-[#171717]';
  const resumeHref = '/Resume_jirayus.pdf';
  const inversePanelBg = isLightTheme ? '#d8c5b1' : 'var(--ink)';
  const inversePanelText = isLightTheme ? 'var(--ink)' : 'var(--bg)';
  const inversePanelMuted = isLightTheme ? 'rgba(29,27,25,0.72)' : 'rgba(244,239,231,0.8)';
  const inversePanelSoft = isLightTheme ? 'rgba(29,27,25,0.56)' : 'rgba(244,239,231,0.65)';
  const footerBg = isLightTheme ? '#d2bfaa' : '#0d0f11';
  const footerText = isLightTheme ? 'rgba(29,27,25,0.68)' : 'rgba(244,239,231,0.84)';
  const footerLink = isLightTheme ? 'rgba(29,27,25,0.82)' : 'rgba(244,239,231,0.94)';
  const marqueeText = isLightTheme ? '#fff7f0' : '#ffffff';
  const projectCardBg = isLightTheme ? 'rgba(247,241,232,0.84)' : 'rgba(24,27,32,0.8)';
  const drawerBg = isLightTheme ? 'rgba(251,246,238,0.95)' : 'rgba(17,20,24,0.95)';
  const drawerBorder = isLightTheme ? 'rgba(29,27,25,0.16)' : 'rgba(240,106,90,0.3)';
  const profileHighlights = t.about.highlights ?? [];

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
      <nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur border-b-2 px-8 lg:px-16 h-14 flex items-center justify-between transition-colors"
        style={{ backgroundColor: chromeBg, borderColor: navBorder }}
      >
        <a href="#hero" onClick={handleScrollToTop} className={`flex items-center gap-3 font-display font-black tracking-widest text-sm transition-colors ${navText}`}>
          <motion.div animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }} className="w-2 h-2 bg-brand-red" />
          JIRAYUS.EXE
        </a>
        <div className="hidden md:flex gap-8 items-center">
          {[{ id: 'about', label: t.nav.about }, { id: 'projects', label: t.nav.projects }, { id: 'skills', label: t.nav.skills }, { id: 'contact', label: t.nav.contact }].map(item => (
            <a key={item.id} href={`#${item.id}`} className={`text-[11px] font-mono font-bold transition-colors tracking-[0.25em] uppercase ${navLink}`}>{item.label}</a>
          ))}
          <Link href="/about-info" className={`text-[11px] font-mono font-bold border px-2.5 py-1 transition-all tracking-widest ${navInfoButton}`}>{t.nav.site_info}</Link>
          <a
            href={resumeHref}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 text-[11px] font-mono font-bold border px-2.5 py-1 transition-all tracking-widest ${navInfoButton}`}
            aria-label="View resume PDF"
          >
            <Download className="w-3.5 h-3.5" />
            VIEW RESUME
          </a>
          <button onClick={toggleTheme} className={`transition-colors p-1.5 ${navMeta}`} aria-label="Toggle theme">
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <LanguageSwitcher isLightNav={isLightTheme} />
        </div>
        <div className="flex items-center gap-2">
          <a
            href={resumeHref}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 text-[11px] font-mono font-bold transition-all tracking-widest ${navInfoButton}`}
            aria-label="View resume PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">VIEW RESUME</span>
            <span className="sm:hidden">VIEW</span>
          </a>
          <a href="#contact" className={`px-5 py-1.5 text-[11px] font-mono font-bold transition-all tracking-widest ${navContactButton}`}>
            [{t.nav.contact}]
          </a>
        </div>
      </nav>

      {/* ── HERO (split-reveal) ──────────────────────────── */}
      <section
        ref={heroRef}
        id="hero"
        className="relative min-h-screen flex flex-col justify-center pt-14 overflow-hidden border-b-4 border-brand-ink"
      >
        {/* ===== LEFT LAYER (base) ===== */}
        <div className="absolute inset-0" style={{ backgroundColor: heroLeft, backgroundImage: heroLeftGradient }} />
        <div className="absolute inset-0 dot-grid opacity-[0.06] pointer-events-none" />

        {/* ===== RIGHT LAYER (reveal — clipped from line to right) ===== */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${splitPct}%)` }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: heroRight, backgroundImage: heroRightGradient }} />
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
            <a
              href={resumeHref}
              target="_blank"
              rel="noreferrer"
              className="px-10 py-4 font-display font-black tracking-widest text-sm transition-all border-2 flex items-center gap-2 shadow-[6px_6px_0_0_var(--red)]"
              style={{ backgroundColor: heroTextColor, color: heroLeft, borderColor: heroTextColor }}
              aria-label="View resume PDF"
            >
              <Download className="w-4 h-4" /> VIEW RESUME
            </a>
            <a href="#projects" className="px-10 py-4 font-display font-black tracking-widest text-sm hover:opacity-90 transition-all shadow-[6px_6px_0_0_var(--red)]" style={{ backgroundColor: heroTextColor, color: heroLeft }}>
              {t.hero.viewProjects} →
            </a>
            <a href="https://github.com/fermfirxzer" target="_blank" rel="noreferrer" className="border-2 bg-transparent px-8 py-4 font-display font-black tracking-widest text-sm hover:opacity-80 transition-all flex items-center gap-2" style={{ borderColor: heroLineColor, color: heroTextColor }}>
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
      <div className="py-3 overflow-hidden border-y-2 border-brand-ink" style={{ backgroundColor: 'var(--red)' }}>
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="font-display font-black text-sm tracking-[0.3em] uppercase mx-10 shrink-0" style={{ color: marqueeText }}>
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
              <p className="text-base leading-relaxed text-brand-ink-mid mb-8">{t.about.desc2}</p>
              <div className="border-t border-brand-rule/50 pt-6">
                <p className="font-mono text-[10px] font-bold text-brand-red tracking-[0.28em] uppercase mb-4">
                  {t.about.highlightsTitle}
                </p>
                <div className="space-y-3">
                  {profileHighlights.map((item, index) => {
                    const isOpen = activeProfileItem === index;
                    return (
                      <div key={item.title} className="border border-brand-rule/70 bg-brand-bg/60 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setActiveProfileItem(isOpen ? null : index)}
                          aria-expanded={isOpen}
                          className="w-full flex items-start gap-4 px-4 py-3 text-left hover:bg-brand-card/60 transition-colors"
                        >
                          <span className="mt-1.5 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-brand-red" />
                          <span className="flex-1 min-w-0">
                            <span className="block font-display font-bold text-sm text-brand-ink leading-tight">
                              {item.title}
                            </span>
                            <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.22em] text-brand-ink-soft">
                              Click to toggle details
                            </span>
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-brand-red transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: 'easeOut' }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 pl-10 pr-5">
                                <div className="h-px w-full bg-brand-rule/50 mb-3" />
                                <p className="text-sm leading-relaxed text-brand-ink-mid">
                                  {item.detail}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* education card */}
            <div className="border-2 border-brand-ink p-10 shadow-[8px_8px_0_0_var(--red)] flex flex-col gap-6" style={{ backgroundColor: inversePanelBg, color: inversePanelText }}>
              <GraduationCap className="w-10 h-10 text-brand-red" />
              <div>
                <p className="font-mono text-xs font-bold text-brand-red tracking-[0.25em] uppercase mb-3">{t.about.education}</p>
                <p className="font-display font-black text-xl leading-tight mb-2">{t.about.degree}</p>
                <p className="text-sm font-medium mb-4" style={{ color: inversePanelMuted }}>{t.about.faculty}</p>
                <p className="font-mono text-xs text-brand-bg/65 tracking-widest mb-5">2022 — 2026</p>
                <div className="inline-flex items-center gap-2 bg-brand-red px-4 py-1.5 text-xs font-mono font-black tracking-wider">
                  <Star className="w-3 h-3" style={{ fill: inversePanelText, color: inversePanelText }} /> {t.about.gpa}
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
              <a
                href="https://www.sycapt.com/"
                target="_blank"
                rel="noreferrer"
                className="font-display font-black text-3xl text-brand-ink mb-6 leading-tight hover:text-brand-red transition-colors inline-block"
                aria-label="Open SCICAP company website"
              >
                SCICAP<br />CO., LTD.
              </a>
              <p className="inline-block px-4 py-1.5 font-mono text-xs font-bold tracking-widest uppercase mb-2" style={{ backgroundColor: inversePanelBg, color: inversePanelText }}>{t.experience.duration}</p>
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
            {published.map((project, idx) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06, duration: 0.45 }}
                viewport={{ once: true }}
                onClick={() => setActiveProject(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveProject(project);
                  }
                }}
                role="button"
                tabIndex={0}
                className="group relative text-left border border-brand-rule/60 overflow-hidden p-6 md:p-7 backdrop-blur-sm hover:-translate-y-1 hover:shadow-[10px_14px_24px_rgba(0,0,0,0.2)] transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/70"
                style={{ backgroundColor: projectCardBg }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ background: isLightTheme ? 'radial-gradient(circle at top right, rgba(169,71,57,0.15), transparent 45%)' : 'radial-gradient(circle at top right, rgba(240,106,90,0.2), transparent 45%)' }} />
                <div className="relative z-10 flex items-start justify-between gap-4 mb-5">
                  <ProjectIcon project={project} size="md" />
                  <span className="font-mono text-[10px] font-bold tracking-[0.22em] text-brand-red">{project.num}</span>
                </div>
                <h3 className="relative z-10 font-display font-black text-xl leading-tight text-brand-ink mb-3 line-clamp-2 group-hover:text-brand-red transition-colors">{project.title}</h3>
                <p className="relative z-10 text-sm text-brand-ink-mid leading-relaxed mb-5 line-clamp-3">{project.description}</p>
                <div className="relative z-10 flex flex-wrap gap-2 mb-6">
                  {project.tech.slice(0, 4).map(tech => (
                    <span key={tech} className="font-mono text-[10px] font-bold border border-brand-rule bg-brand-bg px-2.5 py-1 text-brand-ink-soft uppercase tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="relative z-10 mt-auto flex items-center gap-2.5">
                  <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-brand-ink-soft group-hover:text-brand-ink transition-colors">
                    View details <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <div className="ml-auto flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-9 h-9 border border-brand-rule hover:border-brand-red hover:text-brand-red inline-flex items-center justify-center transition-colors"
                        aria-label={`Open GitHub for ${project.title}`}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl?.trim() && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-9 h-9 border border-brand-rule hover:border-brand-red hover:text-brand-red inline-flex items-center justify-center transition-colors"
                        aria-label={`Open live demo for ${project.title}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                {isLoggedIn && (
                  <Link
                    href={`/admin/projects/${project.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="relative z-10 inline-flex mt-5 font-mono text-[10px] font-bold text-brand-ink-soft border border-brand-rule px-2 py-0.5 hover:bg-brand-ink hover:text-brand-bg transition-all uppercase"
                  >
                    EDIT
                  </Link>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <ProjectDetailDrawer
        project={activeProject}
        onClose={() => setActiveProject(null)}
        drawerBg={drawerBg}
        drawerBorder={drawerBorder}
      />

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
                    <span key={skill} className={`border-2 border-brand-ink bg-brand-bg px-4 py-1.5 font-mono text-xs font-bold text-brand-ink shadow-[2px_2px_0_0_var(--shadow)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-default ${
                      isLightTheme ? 'hover:bg-[#d8c5b1] hover:text-brand-ink' : 'hover:bg-brand-ink hover:text-brand-bg'
                    }`}>
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
                <a key={label} href={href} target={target} rel={target === '_blank' ? 'noreferrer' : undefined} className={`group bg-brand-card transition-colors flex items-center justify-between p-6 md:p-8 ${
                  isLightTheme ? 'hover:bg-[#e4d5c4]' : 'hover:bg-brand-ink'
                }`}>
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 border-2 border-brand-ink group-hover:border-brand-red flex items-center justify-center shrink-0 transition-colors">
                      <Icon className="w-4 h-4 text-brand-red" />
                    </div>
                    <div>
                      <p className={`font-mono text-[9px] font-bold text-brand-ink-soft tracking-[0.25em] uppercase transition-colors ${
                        isLightTheme ? 'group-hover:text-brand-ink-soft' : 'group-hover:text-brand-bg/70'
                      }`}>{label}</p>
                      <p className={`font-display font-bold text-lg text-brand-ink transition-colors ${
                        isLightTheme ? 'group-hover:text-brand-ink' : 'group-hover:text-brand-bg'
                      }`}>{value}</p>
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
      <footer className="py-10 px-8 lg:px-16" style={{ backgroundColor: footerBg }}>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs font-bold tracking-widest uppercase" style={{ color: footerText }}>{t.footer.copy}</p>
          <a href="https://github.com/fermfirxzer" target="_blank" rel="noreferrer" className="font-mono text-xs font-bold hover:text-brand-red transition-colors tracking-widest uppercase" style={{ color: footerLink }}>
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
