'use client';

import React, { useEffect, useState } from 'react';
import { 
  Info, 
  Code2, 
  Cpu, 
  Globe, 
  Github, 
  ChevronLeft, 
  Terminal,
  Zap,
  Server,
  Layout,
  Moon,
  Sun
} from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Language, translations } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

export default function AboutSitePage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang];
  const [commits, setCommits] = useState<Commit[]>([]);
  const [commitsLoading, setCommitsLoading] = useState(true);

  useEffect(() => {
    async function fetchCommits() {
      try {
        const res = await fetch('https://api.github.com/repos/fermfirxzer/portfolio/commits?per_page=4');
        if (res.ok) {
          const data = await res.json();
          setCommits(data);
        }
      } catch (e) {
        console.error('Failed to fetch commits');
      } finally {
        setCommitsLoading(false);
      }
    }
    fetchCommits();
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const savedLang = localStorage.getItem('lang') as Language;
    if (savedLang) setLang(savedLang);
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

  const techStack = [
    { name: 'Next.js 15', icon: <Globe className="w-5 h-5" />, desc: 'React framework for production grade applications.' },
    { name: 'Tailwind CSS', icon: <Layout className="w-5 h-5" />, desc: 'Utility-first CSS framework for rapid UI development.' },
    { name: 'TypeScript', icon: <Code2 className="w-5 h-5" />, desc: 'Static typing for better developer experience and reliability.' },
    { name: 'Framer Motion', icon: <Zap className="w-5 h-5" />, desc: 'Animation library for fluid, interactive components.' },
    { name: 'Supabase', icon: <Server className="w-5 h-5" />, desc: 'Open source Firebase alternative for database and auth.' },
    { name: 'Lucide Icons', icon: <Cpu className="w-5 h-5" />, desc: 'Beautifully simple, pixel-perfect icon library.' },
  ];

  return (
    <div className="min-h-screen bg-brand-bg font-sans pb-24 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1c1c1c] px-6 lg:px-12 h-16 flex items-center justify-between border-b-4 border-[#1c1c1c]">
        <Link href="/" className="flex items-center gap-3 text-white font-display font-bold tracking-wider hover:text-brand-red transition-colors group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          BACK_TO_HOME
        </Link>
        <div className="flex items-center gap-6">
          <button
            onClick={toggleTheme}
            className="p-2 text-white hover:text-brand-red transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <LanguageSwitcher lang={lang} setLang={setLang} />
          <a
            href="https://github.com/fermfirxzer/portfolio-v2" 
            target="_blank"
            className="bg-brand-red text-white px-4 py-1.5 text-xs font-mono font-bold hover:bg-white hover:text-[#1c1c1c] transition-all shadow-[4px_4px_0_0_#000]"
          >
            [ REPO ↗ ]
          </a>
        </div>
      </nav>

      {/* Header */}
      <header className="pt-32 pb-16 px-6 lg:px-12 bg-brand-card border-b-4 border-brand-ink overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--ink) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-mono font-bold text-brand-ink-soft tracking-[0.3em] mb-4 uppercase"
          >
            META_INFORMATION
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-black leading-tight mb-8"
          >
            ABOUT THIS <br /> ARCHITECTURE
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1.5 bg-brand-red mb-8"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 lg:px-12 mt-16 grid md:grid-cols-[1fr_320px] gap-12">
        <div className="space-y-16">
          {/* Concept */}
          <section>
            <h2 className="text-xs font-mono font-bold text-brand-ink tracking-[0.2em] mb-8 border-b-2 border-brand-ink pb-4 uppercase flex items-center gap-3">
              <Terminal className="w-4 h-4 text-brand-red" />
              Design Concept
            </h2>
            <div className="bg-brand-card border-2 border-brand-ink p-8 shadow-[8px_8px_0_0_var(--shadow)] space-y-6">
              <p className="text-lg font-medium leading-relaxed text-brand-ink-mid">
                This portfolio is designed with a <span className="text-brand-red font-bold">"Retro-Futuristic Brutalist"</span> aesthetic, inspired by early computer interfaces and modern high-contrast design systems.
              </p>
              <p className="text-brand-ink-mid leading-relaxed">
                The objective was to create a digital CV that doesn't just list skills but demonstrates them through performance, accessibility, and unique visual identity. It features a custom theme engine, responsive layouts, and type-safe data fetching.
              </p>
              <p className="text-brand-ink-mid leading-relaxed p-4 bg-brand-bg border border-brand-ink/20 rounded-sm">
                Furthermore, this project embraces <span className="text-brand-red font-bold">"Vibe Coding"</span>, having been built in active collaboration with the <span className="font-bold text-brand-ink">Antigravity UI Architect</span> AI agent. This advanced agentic approach allowed for rapid prototyping and iteration—blending production-grade code quality with striking aesthetics and flawless user experience.
              </p>
            </div>
          </section>

          {/* Tech Stack Details */}
          <section>
            <h2 className="text-xs font-mono font-bold text-brand-ink tracking-[0.2em] mb-8 border-b-2 border-brand-ink pb-4 uppercase flex items-center gap-3">
              <Code2 className="w-4 h-4 text-brand-red" />
              Technology Stack
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {techStack.map((tech, i) => (
                <div key={i} className="p-6 bg-brand-card border-2 border-brand-ink shadow-[4px_4px_0_0_var(--shadow)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-brand-bg border border-brand-ink text-brand-red">
                      {tech.icon}
                    </div>
                    <h3 className="font-display font-bold text-brand-ink">{tech.name}</h3>
                  </div>
                  <p className="text-xs text-brand-ink-mid font-medium leading-relaxed">{tech.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Commits */}
          <section>
            <h2 className="text-xs font-mono font-bold text-brand-ink tracking-[0.2em] mb-8 border-b-2 border-brand-ink pb-4 uppercase flex items-center gap-3">
              <Github className="w-4 h-4 text-brand-red" />
              Recent Commits
            </h2>
            <div className="bg-brand-card border-2 border-brand-ink shadow-[8px_8px_0_0_var(--shadow)] divide-y-2 divide-brand-ink">
              {commitsLoading ? (
                <div className="p-8 text-center text-brand-ink-soft text-xs font-mono font-bold uppercase tracking-widest flex justify-center items-center gap-3">
                  <div className="w-2 h-2 bg-brand-red animate-pulse" />
                  LOADING_COMMITS...
                </div>
              ) : commits.length > 0 ? (
                commits.map((commit) => (
                  <a
                    key={commit.sha}
                    href={commit.html_url}
                    target="_blank"
                    className="block p-6 hover:bg-[#1c1c1c] group transition-colors"
                  >
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h3 className="font-mono text-xs font-bold text-brand-ink group-hover:text-white transition-colors truncate">
                        {commit.commit.message.split('\n')[0]}
                      </h3>
                      <span className="text-xs font-mono text-brand-ink-soft bg-brand-bg px-2 py-0.5 border border-brand-ink/20 group-hover:border-transparent group-hover:bg-brand-red group-hover:text-white transition-colors flex-shrink-0">
                        {commit.sha.substring(0, 7)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-brand-bg border border-brand-ink flex items-center justify-center text-[8px] font-bold">
                          {commit.commit.author.name.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="text-xs font-display font-bold text-brand-ink-mid group-hover:text-white/70 transition-colors">
                          {commit.commit.author.name}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-brand-ink-soft group-hover:text-white/50 transition-colors">
                        {new Date(commit.commit.author.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </a>
                ))
              ) : (
                <div className="p-8 text-center text-brand-ink-soft text-xs font-mono">
                  Unable to load recent commits.
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-12">
          <section>
            <h2 className="text-xs font-mono font-bold text-brand-ink tracking-[0.2em] mb-6 border-b-2 border-brand-ink pb-4 uppercase flex items-center gap-3">
              <Info className="w-4 h-4 text-brand-red" />
              Project Stats
            </h2>
            <div className="flex flex-col border-2 border-brand-ink divide-y-2 divide-brand-ink shadow-[6px_6px_0_0_var(--shadow)]">
              {[
                { label: 'VERSION', value: '2.0.4-STABLE' },
                { label: 'COMPONENTS', value: '24 CUSTOM' },
                { label: 'TYPE SAFETY', value: '100% STRICT' },
                { label: 'ANIMATIONS', value: 'FRAMER MOTION' }
              ].map((stat, i) => (
                <div key={i} className="p-4 bg-brand-card flex items-center justify-between">
                  <p className="text-xs font-mono font-bold text-brand-ink-soft uppercase">{stat.label}</p>
                  <p className="text-xs font-display font-black text-brand-ink">{stat.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-mono font-bold text-brand-ink tracking-[0.2em] mb-6 border-b-2 border-brand-ink pb-4 uppercase flex items-center gap-3">
              <Github className="w-4 h-4 text-brand-red" />
              Open Source
            </h2>
            <div className="bg-brand-card border-2 border-brand-ink p-6 shadow-[6px_6px_0_0_var(--shadow)] text-center">
              <p className="text-xs text-brand-ink-mid mb-6 font-medium">Want to see how this was built? The entire codebase is available on GitHub.</p>
              <a 
                href="https://github.com/fermfirxzer/portfolio-v2"
                target="_blank"
                className="inline-flex items-center gap-2 bg-[#1c1c1c] text-white px-6 py-3 text-xs font-display font-bold tracking-widest hover:bg-brand-red transition-colors w-full justify-center"
              >
                <Github className="w-4 h-4" /> REPOSITORY ↗
              </a>
            </div>
          </section>
        </aside>
      </main>

      {/* Breadcrumb footer */}
      <div className="max-w-5xl mx-auto px-6 lg:px-12 mt-24">
        <Link href="/" className="inline-flex items-center gap-3 bg-brand-card border-2 border-brand-ink px-6 py-3 font-mono font-bold text-xs tracking-widest hover:translate-x-1 hover:shadow-none shadow-[4px_4px_0_0_var(--shadow)] transition-all">
          <ChevronLeft className="w-4 h-4" />
          RETURN_TO_PORTFOLIO
        </Link>
      </div>
    </div>
  );
}
