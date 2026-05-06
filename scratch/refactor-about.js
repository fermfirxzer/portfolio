const fs = require('fs');
let content = fs.readFileSync('src/app/about-info/page.tsx', 'utf8');

// 1. Update Imports
content = content.replace(/import Link from 'next\/link';\nimport \{ Language, translations \} from '@\/lib\/i18n';/,
  "import Link from 'next/link';\nimport { useLanguage } from '@/context/LanguageContext';");

// 2. State & Logic
content = content.replace(/const \[theme, setTheme\] = useState<'light' \| 'dark'\>\('light'\);\n  const \[lang, setLang\] = useState<Language>\('en'\);\n  const t = translations\[lang\];/,
  "const [theme, setTheme] = useState<'light' | 'dark'>('light');\n  const { lang, setLang, t } = useLanguage();");

// 3. Remove localStorage logic in useEffect
content = content.replace(/useEffect\(\(\) =\> \{\n    const savedTheme = localStorage\.getItem\('theme'\) as 'light' \| 'dark';\n    const savedLang = localStorage\.getItem\('lang'\) as Language;\n    if \(savedLang\) setLang\(savedLang\);\n    if \(savedTheme\) \{\n      setTheme\(savedTheme\);\n      document\.documentElement\.setAttribute\('data-theme', savedTheme\);\n    \}\n  \}, \[\]\);/,
  "useEffect(() => {\n    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';\n    if (savedTheme) {\n      setTheme(savedTheme);\n      document.documentElement.setAttribute('data-theme', savedTheme);\n    }\n  }, []);");

// 4. Content Translation
content = content.replace(/BACK_TO_HOME/g, "{t('about_info.back')}");
content = content.replace(/\[ REPO ↗ \]/g, "{t('about_info.repo')}");
content = content.replace(/META_INFORMATION/g, "{t('about_info.meta')}");
content = content.replace(/ABOUT THIS <br \/> ARCHITECTURE/g, "{t('about_info.title')}");

content = content.replace(/Design Concept/g, "{t('about_info.design.title')}");
content = content.replace(/Technology Stack/g, "{t('about_info.tech.title')}");
content = content.replace(/Recent Commits/g, "{t('about_info.commits.title')}");
content = content.replace(/LOADING_COMMITS\.\.\./g, "{t('about_info.commits.loading')}");
content = content.replace(/Unable to load recent commits\./g, "{t('about_info.commits.error')}");

content = content.replace(/Project Stats/g, "{t('about_info.stats.title')}");
content = content.replace(/Open Source/g, "{t('about_info.open_source.title')}");
content = content.replace(/Want to see how this was built\? The entire codebase is available on GitHub\./g, "{t('about_info.open_source.desc')}");
content = content.replace(/REPOSITORY ↗/g, "{t('about_info.open_source.button')}");

content = content.replace(/RETURN_TO_PORTFOLIO/g, "{t('about_info.return')}");

// Handle the long paragraphs with spans
content = content.replace(/<p className="text-lg font-medium leading-relaxed text-brand-ink-mid"\>\n                This portfolio is designed with a <span className="text-brand-red font-bold"\>"Retro-Futuristic Brutalist"<\/span\> aesthetic, inspired by early computer interfaces and modern high-contrast design systems\.\n              <\/p\>/,
  `<p className="text-lg font-medium leading-relaxed text-brand-ink-mid">
                {t('about_info.design.p1')}
              </p>`);

content = content.replace(/<p className="text-brand-ink-mid leading-relaxed"\>\n                The objective was to create a digital CV that doesn't just list skills but demonstrates them through performance, accessibility, and unique visual identity\. It features a custom theme engine, responsive layouts, and type-safe data fetching\.\n              <\/p\>/,
  `<p className="text-brand-ink-mid leading-relaxed">
                {t('about_info.design.p2')}
              </p>`);

content = content.replace(/<p className="text-brand-ink-mid leading-relaxed p-4 bg-brand-bg border border-brand-ink\/20 rounded-sm"\>\n                Furthermore, this project embraces <span className="text-brand-red font-bold"\>"Vibe Coding"<\/span\>, having been built in active collaboration with the <span className="font-bold text-brand-ink"\>Antigravity UI Architect<\/span\> AI agent\. This advanced agentic approach allowed for rapid prototyping and iteration—blending production-grade code quality with striking aesthetics and flawless user experience\.\n              <\/p\>/,
  `<p className="text-brand-ink-mid leading-relaxed p-4 bg-brand-bg border border-brand-ink/20 rounded-sm">
                {t('about_info.design.p3')}
              </p>`);

fs.writeFileSync('src/app/about-info/page.tsx', content);
console.log('Successfully refactored about-info/page.tsx');
