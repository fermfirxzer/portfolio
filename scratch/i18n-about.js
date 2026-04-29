const fs = require('fs');
let content = fs.readFileSync('src/app/about-info/page.tsx', 'utf8');

// Imports
content = content.replace(/import Link from 'next\/link';/, 
  "import Link from 'next/link';\nimport { Language, translations } from '@/lib/i18n';");

// State
content = content.replace(/const \[theme, setTheme\] = useState<'light' \| 'dark'\>\('light'\);/,
  "const [theme, setTheme] = useState<'light' | 'dark'>('light');\n  const [lang, setLang] = useState<Language>('en');\n  const t = translations[lang];");

// Effect
content = content.replace(/const savedTheme = localStorage.getItem\('theme'\) as 'light' \| 'dark';/,
  "const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';\n    const savedLang = localStorage.getItem('lang') as Language;\n    if (savedLang) setLang(savedLang);");

// Navbar switcher
content = content.replace(/\{theme === 'light' \? <Moon className="w-5 h-5" \/> : <Sun className="w-5 h-5" \/>\}\n          <\/button>/,
  `{theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <div className="flex gap-2 text-xs font-mono font-bold">
            {(['en', 'th', 'jp'] as Language[]).map(l => (
              <button key={l} onClick={() => { setLang(l); localStorage.setItem('lang', l); }} className={\`hover:text-brand-red transition-colors uppercase \${lang === l ? 'text-brand-red' : 'text-gray-400'}\`}>{l}</button>
            ))}
          </div>`);

fs.writeFileSync('src/app/about-info/page.tsx', content);
console.log('Updated about-info');
