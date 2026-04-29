'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Project, fetchProjectById, getIcon } from '@/lib/projects';
import {
  Github,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Users,
  Sun,
  Moon
} from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 99) return 99;
          return prev + Math.floor(Math.random() * 20) + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    } else {
      setProgress(100);
    }
  }, [loading]);

  useEffect(() => {
    async function loadProject() {
      if (slug) {
        const data = await fetchProjectById(slug);
        setProject(data);
        setLoading(false);
      }
    }
    loadProject();
  }, [slug]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg font-sans">
        <div className="text-center">
          <motion.div
            animate={{ scale: [1, 0.8, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 bg-brand-red mx-auto mb-4"
          />
          <p className="text-xs font-mono text-brand-ink-soft tracking-[0.3em] uppercase">Loading Project... {progress}%</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg font-sans">
        <div className="text-center">
          <h1 className="text-4xl font-display font-black mb-4 uppercase">Project Not Found</h1>
          <Link href="/" className="text-brand-red font-mono font-bold hover:underline tracking-widest">[ BACK TO HOME ]</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg font-sans pb-24 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1c1c1c] px-6 lg:px-12 h-16 flex items-center justify-between border-b-4 border-[#1c1c1c]">
        <Link href="/" className="flex items-center gap-3 text-white font-display font-bold tracking-wider hover:text-brand-red transition-colors group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          BACK_TO_HOME
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/about-info"
            className="text-[10px] font-mono font-bold text-brand-red border border-brand-red/30 px-2 py-1 hover:bg-brand-red hover:text-white transition-all tracking-[0.2em]"
          >
            SITE_INFO
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 text-white hover:text-brand-red transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <a
            href="#contact"
            className="bg-white text-[#1c1c1c] px-4 py-1.5 text-xs font-mono font-bold hover:bg-brand-red hover:text-white transition-all shadow-[4px_4px_0_0_#d63b2a]"
          >
            [ CONTACT ]
          </a>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="pt-32 pb-16 px-6 lg:px-12 bg-brand-card border-b-4 border-brand-ink overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--ink) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-mono font-bold text-brand-ink-soft tracking-[0.3em] mb-4 uppercase"
          >
            {project.num}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-black leading-tight mb-8"
          >
            {project.title}
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1.5 bg-brand-red mb-8"
          />
          <div className="flex flex-wrap gap-3">
            {project.tech.map(t => (
              <span key={t} className="bg-brand-bg border-2 border-brand-ink px-3 py-1 text-[10px] font-mono font-bold text-brand-ink uppercase shadow-[2px_2px_0_0_var(--shadow)]">
                {t}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 lg:px-12 mt-16 grid md:grid-cols-[1fr_320px] gap-12">
        {/* Left Column: Info */}
        <div className="space-y-12">
          <section>
            <h2 className="text-[10px] font-mono font-bold text-brand-ink tracking-[0.2em] mb-6 border-b-2 border-brand-ink pb-4 uppercase flex items-center gap-3">
              <ChevronRight className="w-4 h-4 text-brand-red" />
              Overview
            </h2>
            <p className="text-lg md:text-xl font-medium leading-relaxed text-brand-ink-mid">
              {project.longDesc}
            </p>
          </section>

          <section>
            <h2 className="text-[10px] font-mono font-bold text-brand-ink tracking-[0.2em] mb-6 border-b-2 border-brand-ink pb-4 uppercase flex items-center gap-3">
              <ChevronRight className="w-4 h-4 text-brand-red" />
              Key Features
            </h2>
            <ul className="space-y-4">
              {project.features.map((f, i) => (
                <li key={i} className="flex gap-4 p-4 bg-brand-card border-2 border-brand-ink shadow-[4px_4px_0_0_var(--shadow)] group hover:translate-x-1 transition-all">
                  <span className="text-brand-red font-mono font-bold">0{i + 1}</span>
                  <span className="text-brand-ink-mid font-medium">{f}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column: Cooperation & Links */}
        <aside className="space-y-12">
          <section>
            <h2 className="text-[10px] font-mono font-bold text-brand-ink tracking-[0.2em] mb-6 border-b-2 border-brand-ink pb-4 uppercase flex items-center gap-3">
              <Users className="w-4 h-4 text-brand-red" />
              Cooperation
            </h2>
            <div className="flex flex-col border-2 border-brand-ink divide-y-2 divide-brand-ink shadow-[6px_6px_0_0_var(--shadow)]">
              {project.contributors.map((c, i) => (
                <a
                  key={i}
                  href={c.github}
                  target="_blank"
                  className="p-4 bg-brand-card hover:bg-[#1c1c1c] group transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={`https://github.com/${c.name}.png`} 
                      alt={`${c.name}'s avatar`} 
                      className="w-8 h-8 rounded-full border-2 border-brand-ink bg-white object-cover group-hover:border-brand-red transition-colors"
                      onError={(e) => {
                        e.currentTarget.src = '/avatar-guest.png';
                      }}
                    />
                    <p className="text-sm font-display font-bold group-hover:text-white transition-colors">{c.name}</p>
                  </div>
                  <Github className="w-4 h-4 text-brand-ink-soft group-hover:text-brand-red transition-colors" />
                </a>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[10px] font-mono font-bold text-brand-ink tracking-[0.2em] mb-6 border-b-2 border-brand-ink pb-4 uppercase flex items-center gap-3">
              <Github className="w-4 h-4 text-brand-red" />
              Source Code
            </h2>
            <a
              href={project.github}
              target="_blank"
              className="block bg-[#1c1c1c] text-white p-6 text-center font-display font-black tracking-widest text-sm hover:bg-brand-red transition-colors shadow-[6px_6px_0_0_var(--shadow)]"
            >
              ▶ REPOSITORY ↗
            </a>
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
