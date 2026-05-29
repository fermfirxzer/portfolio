import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
  { code: 'th', label: 'ภาษาไทย', flag: 'https://flagcdn.com/w40/th.png' },
  { code: 'jp', label: '日本語', flag: 'https://flagcdn.com/w40/jp.png' },
];

export default function LanguageSwitcher({ isLightNav = false }: { isLightNav?: boolean }) {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find(l => l.code === lang) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2.5 text-xs font-mono font-bold transition-colors p-2 rounded border hover:border-brand-red/50 ${
          isLightNav
            ? 'text-brand-ink/80 hover:text-brand-red bg-black/0 border-brand-ink/15'
            : 'text-brand-bg/82 hover:text-brand-red bg-brand-bg/5 border-brand-bg/12'
        }`}
        aria-label="Select Language"
      >
        <img src={currentLang.flag} alt={currentLang.label} className="w-5 h-auto shadow-sm" />
        <span className="hidden sm:inline">{currentLang.code.toUpperCase()}</span>
        <ChevronDown className={`w-3 h-3 opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full right-0 mt-3 w-40 bg-brand-card border-2 border-brand-ink shadow-[6px_6px_0_0_var(--shadow)] z-50 overflow-hidden"
          >
            {languages.map(l => (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-mono font-bold text-left hover:bg-brand-ink hover:text-brand-bg transition-all ${
                  lang === l.code ? 'bg-brand-bg text-brand-red' : 'text-brand-ink'
                }`}
              >
                <img src={l.flag} alt={l.label} className="w-5 h-auto shadow-sm" />
                <div className="flex flex-col">
                  <span>{l.label}</span>
                  <span className="text-[9px] opacity-50 uppercase">{l.code}</span>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
