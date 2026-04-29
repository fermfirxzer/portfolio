const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Add imports
content = content.replace(/import \{ Project, fetchProjects, getIcon \} from '@\/lib\/projects';/, 
  "import { Project, fetchProjects, getIcon } from '@/lib/projects';\nimport { Language, translations } from '@/lib/i18n';");

// 2. Add lang state
content = content.replace(/const \[theme, setTheme\] = useState<'light' \| 'dark'\>\('light'\);/,
  "const [theme, setTheme] = useState<'light' | 'dark'>('light');\n  const [lang, setLang] = useState<Language>('en');\n  const t = translations[lang];");

// 3. Add lang persistence to useEffect
content = content.replace(/const savedTheme = localStorage.getItem\('theme'\) as 'light' \| 'dark';/,
  "const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';\n    const savedLang = localStorage.getItem('lang') as Language;\n    if (savedLang) setLang(savedLang);");

// 4. Update Navigation
content = content.replace(/\{theme === 'light' \? <Moon className="w-4 h-4" \/> : <Sun className="w-4 h-4" \/>\}/,
  `{theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <div className="flex gap-2 text-xs font-mono font-bold">
            {(['en', 'th', 'jp'] as Language[]).map(l => (
              <button key={l} onClick={() => { setLang(l); localStorage.setItem('lang', l); }} className={\`hover:text-brand-red transition-colors uppercase \${lang === l ? 'text-brand-red' : 'text-gray-400'}\`}>{l}</button>
            ))}
          </div>`);

// 5. Replace Hero static text
content = content.replace(/▶ LOADING PORTFOLIO\.\.\./g, '{t.hero.loading}');
content = content.replace(/Full Stack Developer/, '{t.hero.role}');
content = content.replace(/'7 MONTHS'/g, 't.hero.stats.months');
content = content.replace(/'INTERNSHIP'/g, 't.hero.stats.internship');
content = content.replace(/'3\.31 GPA'/g, 't.hero.stats.gpa');
content = content.replace(/'KMUTNB'/g, 't.hero.stats.university');
content = content.replace(/'MAY 2026'/g, 't.hero.stats.gradDate');
content = content.replace(/'GRADUATION'/g, 't.hero.stats.graduation');
content = content.replace(/▶ VIEW PROJECTS/, '{t.hero.viewProjects}');
// GITHUB in hero is tricky because of the icon
content = content.replace(/> GITHUB/g, '> {t.hero.github}');

// 6. Replace Nav text
content = content.replace(/\['ABOUT', 'PROJECTS', 'SKILLS', 'CONTACT'\]/, "[{id: 'about', label: t.nav.about}, {id: 'projects', label: t.nav.projects}, {id: 'skills', label: t.nav.skills}, {id: 'contact', label: t.nav.contact}]");
content = content.replace(/item\.toLowerCase\(\)/g, "item.id");
content = content.replace(/>\s*\{item\}\s*<\/a>/g, ">{item.label}</a>");
content = content.replace(/>\s*SITE_INFO\s*<\/Link>/g, ">{t.nav.site_info}</Link>");
content = content.replace(/\[ CONTACT \]/g, "[ {t.nav.contact} ]");

// 7. Replace Sections headers
content = content.replace(/<SectionHeader title="ABOUT ME" \/>/g, "<SectionHeader title={t.about.title} />");
content = content.replace(/<SectionHeader title="EXPERIENCE" \/>/g, "<SectionHeader title={t.experience.title} />");
content = content.replace(/<SectionHeader title="PROJECTS" \/>/g, "<SectionHeader title={t.projects.title} />");
content = content.replace(/<SectionHeader title="TECH STACK" \/>/g, "<SectionHeader title={t.skills.title} />");
content = content.replace(/<SectionHeader title="CONTACT" \/>/g, "<SectionHeader title={t.contact.title} />");

// 8. Replace other texts
content = content.replace(/\/\/ PROFILE/g, "{t.about.profile}");
content = content.replace(/Computer Science student at King Mongkut's University of Technology North Bangkok \(KMUTNB\)\./g, "{t.about.desc1}");
content = content.replace(/I am a dedicated developer focused on building scalable, modern web applications that solve real-world problems\. With hands-on industry experience from internship, I bring production-ready coding practices to every project\./g, "{t.about.desc2}");
content = content.replace(/\/\/ EDUCATION/g, "{t.about.education}");
content = content.replace(/B\.Sc\. Computer Science/g, "{t.about.degree}");
content = content.replace(/Faculty of Applied Science, KMUTNB/g, "{t.about.faculty}");
content = content.replace(/GPA 3\.31 \/ 4\.00/g, "{t.about.gpa}");

content = content.replace(/Software Developer Intern/g, "{t.experience.role}");
content = content.replace(/>7 Months</g, ">{t.experience.duration}<");
content = content.replace(/>Bangkok, Thailand</g, ">{t.experience.location}<");
// Replace tasks
content = content.replace(/\['Developed internal banking web applications using Java, Spring Boot, and Thymeleaf\.', 'Maintained enterprise modules on Java Struts 2 framework, focusing on stability and security\.', 'Designed and implemented a Telegram Bot for workflow automation and automated reporting\.', 'Collaborated with QA teams to resolve critical bugs and improve system efficiency\.'\]/g, "t.experience.tasks");

content = content.replace(/\[ VIEW PROJECT DETAIL \]/g, "{t.projects.viewDetail}");
content = content.replace(/>\s*PREVIOUS\s*</g, "> {t.projects.prev} <");
content = content.replace(/>\s*NEXT\s*</g, "> {t.projects.next} <");

content = content.replace(/'FRONT-END'/g, "t.skills.front");
content = content.replace(/'BACK-END'/g, "t.skills.back");
content = content.replace(/'DATABASE'/g, "t.skills.db");
content = content.replace(/'TOOLS'/g, "t.skills.tools");

content = content.replace(/OPEN TO FULL-STACK & BACK-END ROLES/g, "{t.contact.subtitle1}");
content = content.replace(/AVAILABLE FULL-TIME FROM MAY 2026/g, "{t.contact.subtitle2}");
content = content.replace(/"PHONE"/g, "{t.contact.phone}");
content = content.replace(/"EMAIL"/g, "{t.contact.email}");
content = content.replace(/"GITHUB"/g, "{t.contact.github}");

content = content.replace(/© 2026 JIRAYUS MOOLSART\. BUILT WITH TYPE-SAFE COMPONENTS\./g, "{t.footer.copy}");

fs.writeFileSync('src/app/page.tsx', content);
console.log('Successfully updated page.tsx with i18n');
