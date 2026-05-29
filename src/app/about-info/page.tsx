'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  Cpu,
  Github,
  Globe,
  Info,
  Layout,
  Moon,
  Server,
  Sun,
  Terminal,
  Zap,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
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

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, ease: 'easeOut' },
};

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="inline-flex items-center justify-center w-10 h-10 border-2 border-brand-ink bg-brand-red text-brand-bg font-mono text-xs font-black">
        {num}
      </span>
      <div>
        <p className="font-mono text-[10px] font-bold tracking-[0.35em] uppercase text-brand-ink-soft">{label}</p>
        <div className="mt-2 h-1.5 w-20 bg-brand-red" />
      </div>
    </div>
  );
}

function InfoTile({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="border-2 border-brand-ink bg-brand-card p-6 shadow-[6px_6px_0_0_var(--shadow)]">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2.5 border border-brand-ink bg-brand-bg text-brand-red">{icon}</div>
        <h3 className="font-display font-bold text-lg text-brand-ink">{title}</h3>
      </div>
      <p className="text-sm leading-relaxed text-brand-ink-mid">{description}</p>
    </div>
  );
}

export default function AboutSitePage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { t } = useLanguage();
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
      } catch {
        // keep the section usable even if GitHub rate limits
      } finally {
        setCommitsLoading(false);
      }
    }

    fetchCommits();
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const initialTheme = savedTheme || 'light';
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const techStack = [
    { name: 'Next.js', icon: <Globe className="w-5 h-5" />, desc: 'Production-ready React framework for this portfolio.' },
    { name: 'Tailwind CSS', icon: <Layout className="w-5 h-5" />, desc: 'Utility-first styling used to keep the system consistent.' },
    { name: 'TypeScript', icon: <Code2 className="w-5 h-5" />, desc: 'Strong typing for safer refactors and clearer data structures.' },
    { name: 'Motion', icon: <Zap className="w-5 h-5" />, desc: 'Animation layer used for the page transitions and reveals.' },
    { name: 'Supabase', icon: <Server className="w-5 h-5" />, desc: 'Authentication and backend services for the site.' },
    { name: 'Lucide Icons', icon: <Cpu className="w-5 h-5" />, desc: 'Clean icon set used across navigation and content blocks.' },
  ];

  return (
    <div className="min-h-screen bg-brand-bg font-sans transition-colors duration-300">
      <nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur border-b-2 px-8 lg:px-16 h-14 flex items-center justify-between transition-colors"
        style={{ backgroundColor: theme === 'light' ? 'rgba(231,220,205,0.95)' : 'rgba(26,29,33,0.95)', borderColor: theme === 'light' ? 'rgba(29,27,25,0.1)' : 'rgba(240,106,90,0.22)' }}
      >
        <Link href="/" className="flex items-center gap-3 font-display font-black tracking-widest text-sm text-brand-ink hover:text-brand-red transition-colors">
          <ChevronLeft className="w-4 h-4" />
          {t('about_info.back')}
        </Link>

        <div className="flex items-center gap-3 sm:gap-6">
          <a
            href="https://github.com/fermfirxzer/portfolio-v2"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-mono font-bold border border-brand-red/40 text-brand-red hover:bg-brand-red hover:text-brand-bg transition-colors tracking-widest"
          >
            <Github className="w-3.5 h-3.5" />
            {t('about_info.repo')}
          </a>
          <button
            onClick={toggleTheme}
            className="p-2 text-brand-ink-soft hover:text-brand-red transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <LanguageSwitcher isLightNav={theme === 'light'} />
        </div>
      </nav>

      <header className="relative pt-28 lg:pt-32 pb-16 border-b-4 border-brand-ink overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-[0.06] pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="max-w-4xl">
            <motion.p {...fadeUp} className="font-mono text-xs tracking-[0.4em] uppercase mb-5 text-brand-red">
              {t('about_info.meta')}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
              className="font-display font-black leading-[0.92] tracking-tight text-[clamp(3.4rem,8vw,7rem)] text-brand-ink"
            >
              ABOUT THIS
              <br />
              ARCHITECTURE
            </motion.h1>
            <motion.p {...fadeUp} transition={{ delay: 0.08 }} className="mt-8 max-w-3xl text-base md:text-lg leading-relaxed text-brand-ink-mid">
              A cleaner overview of how this portfolio is designed, what it is built with, and why the structure matters for recruiters reviewing the work.
            </motion.p>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-8 lg:px-16 py-16 space-y-16">
        <motion.section {...fadeUp} className="grid xl:grid-cols-[1.6fr_1fr] gap-8 items-start">
          <div className="border-2 border-brand-ink bg-brand-card p-8 md:p-10 shadow-[8px_8px_0_0_var(--shadow)]">
            <SectionLabel num="01" label={t('about_info.design.title')} />
            <div className="mt-8 space-y-5">
              <p className="text-lg md:text-xl leading-relaxed text-brand-ink-mid">
                {t('about_info.design.p1')}
              </p>
              <p className="text-base md:text-[17px] leading-relaxed text-brand-ink-mid">
                {t('about_info.design.p2')}
              </p>
              <div className="border-l-4 border-brand-red bg-brand-bg p-5 md:p-6">
                <p className="text-base md:text-[17px] leading-relaxed text-brand-ink-mid">
                  {t('about_info.design.p3')}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <InfoTile
              icon={<Info className="w-5 h-5" />}
              title="Readable layout"
              description="The page uses the same width system as the main page, so the content feels connected instead of like a separate old template."
            />
            <InfoTile
              icon={<Terminal className="w-5 h-5" />}
              title="Recruiter-friendly focus"
              description="Each section is written to explain the stack, the architecture, and the project intent without forcing the reader to parse too much visual noise."
            />
          </div>
        </motion.section>

        <motion.section {...fadeUp}>
          <SectionLabel num="02" label={t('about_info.tech.title')} />
          <div className="mt-8 grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {techStack.map((tech) => (
              <div key={tech.name} className="border-2 border-brand-ink bg-brand-card p-6 shadow-[6px_6px_0_0_var(--shadow)] hover:-translate-y-1 transition-transform">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 border border-brand-ink bg-brand-bg text-brand-red">{tech.icon}</div>
                  <h3 className="font-display font-bold text-lg text-brand-ink">{tech.name}</h3>
                </div>
                <p className="text-sm leading-relaxed text-brand-ink-mid">{tech.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section {...fadeUp} className="grid xl:grid-cols-[1.1fr_1fr] gap-8">
          <div>
            <SectionLabel num="03" label={t('about_info.commits.title')} />
            <div className="mt-8 border-2 border-brand-ink bg-brand-card shadow-[8px_8px_0_0_var(--shadow)] divide-y-2 divide-brand-ink overflow-hidden">
              {commitsLoading ? (
                <div className="p-8 text-center text-brand-ink-soft text-xs font-mono font-bold uppercase tracking-widest flex justify-center items-center gap-3">
                  <div className="w-2 h-2 bg-brand-red animate-pulse" />
                  {t('about_info.commits.loading')}
                </div>
              ) : commits.length > 0 ? (
                commits.map((commit) => (
                  <a
                    key={commit.sha}
                    href={commit.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="block p-6 bg-brand-card hover:bg-brand-bg transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display font-bold text-base md:text-lg text-brand-ink group-hover:text-brand-red transition-colors line-clamp-2">
                        {commit.commit.message.split('\n')[0]}
                      </h3>
                      <span className="shrink-0 text-[10px] font-mono font-bold tracking-widest text-brand-ink-soft bg-brand-bg px-2 py-1 border border-brand-ink/20 group-hover:bg-brand-red group-hover:text-brand-bg group-hover:border-brand-red transition-colors">
                        {commit.sha.substring(0, 7)}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-ink-soft group-hover:text-brand-ink-mid transition-colors">
                        {commit.commit.author.name}
                      </span>
                      <span className="text-xs font-mono text-brand-ink-soft group-hover:text-brand-ink-mid transition-colors">
                        {new Date(commit.commit.author.date).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </a>
                ))
              ) : (
                <div className="p-8 text-center text-brand-ink-soft text-xs font-mono">
                  {t('about_info.commits.error')}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <SectionLabel num="04" label={t('about_info.stats.title')} />
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { label: 'VERSION', value: '2.0.4-STABLE' },
                { label: 'COMPONENTS', value: '24 CUSTOM' },
                { label: 'TYPE SAFETY', value: '100% STRICT' },
                { label: 'ANIMATIONS', value: 'MOTION' },
              ].map((stat) => (
                <div key={stat.label} className="border-2 border-brand-ink bg-brand-card p-5 shadow-[6px_6px_0_0_var(--shadow)]">
                  <p className="text-[10px] font-mono font-bold text-brand-ink-soft tracking-[0.25em] uppercase mb-2">{stat.label}</p>
                  <p className="font-display font-black text-lg text-brand-ink leading-tight">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="border-2 border-brand-ink bg-brand-card p-6 md:p-8 shadow-[8px_8px_0_0_var(--shadow)]">
              <h2 className="font-display font-black text-2xl text-brand-ink mb-3">Open source</h2>
              <p className="text-sm md:text-base leading-relaxed text-brand-ink-mid mb-6">
                {t('about_info.open_source.desc')}
              </p>
              <a
                href="https://github.com/fermfirxzer/portfolio-v2"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-brand-red text-brand-bg font-mono text-xs font-black tracking-widest hover:opacity-90 transition-opacity"
              >
                <Github className="w-4 h-4" />
                {t('about_info.open_source.button')}
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.section>
      </main>

      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 pb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-3 border-2 border-brand-ink bg-brand-card px-6 py-3 font-mono font-bold text-xs tracking-widest text-brand-ink hover:-translate-y-1 hover:shadow-none shadow-[4px_4px_0_0_var(--shadow)] transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          {t('about_info.return')}
        </Link>
      </div>
    </div>
  );
}
