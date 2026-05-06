'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '@/lib/i18n';

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => any;
  tObj: any;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'th' || savedLang === 'jp')) {
      setLangState(savedLang);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
  };

  const tObj = translations[lang];

  const t = (key: string): any => {
    const keys = key.split('.');
    let current: any = tObj;
    
    for (const k of keys) {
      if (current === undefined || current[k] === undefined) {
        // Fallback to English if key not found in current language
        let fallback: any = translations['en'];
        for (const fk of keys) {
          if (fallback === undefined || fallback[fk] === undefined) {
             console.warn(`Translation key not found: ${key}`);
             return key;
          }
          fallback = fallback[fk];
        }
        return fallback;
      }
      current = current[k];
    }
    
    return current;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tObj }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
