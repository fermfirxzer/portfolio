export type Language = 'en' | 'th' | 'jp';

export const translations = {
  en: {
    nav: {
      about: 'ABOUT',
      projects: 'PROJECTS',
      skills: 'SKILLS',
      contact: 'CONTACT',
      site_info: 'SITE_INFO',
    },
    hero: {
      loading: '▶ LOADING PORTFOLIO... ',
      role: 'Full Stack Developer',
      stats: {
        months: '7 MONTHS',
        internship: 'INTERNSHIP',
        gpa: '3.31 GPA',
        university: 'KMUTNB',
        gradDate: 'MAY 2026',
        graduation: 'GRADUATION'
      },
      viewProjects: '▶ VIEW PROJECTS',
      github: 'GITHUB',
    },
    about: {
      title: 'ABOUT ME',
      profile: '// PROFILE',
      desc1: "Computer Science student at King Mongkut's University of Technology North Bangkok (KMUTNB).",
      desc2: "I am a dedicated developer focused on building scalable, modern web applications that solve real-world problems. With hands-on industry experience from internship, I bring production-ready coding practices to every project.",
      education: '// EDUCATION',
      degree: 'B.Sc. Computer Science',
      faculty: 'Faculty of Applied Science, KMUTNB',
      gpa: 'GPA 3.31 / 4.00'
    },
    experience: {
      title: 'EXPERIENCE',
      role: 'Software Developer Intern',
      company: 'SCICAP CO., LTD.',
      duration: '7 Months',
      location: 'Bangkok, Thailand',
      tasks: [
        'Developed internal banking web applications using Java, Spring Boot, and Thymeleaf.',
        'Maintained enterprise modules on Java Struts 2 framework, focusing on stability and security.',
        'Designed and implemented a Telegram Bot for workflow automation and automated reporting.',
        'Collaborated with QA teams to resolve critical bugs and improve system efficiency.'
      ]
    },
    projects: {
      title: 'PROJECTS',
      viewDetail: '[ VIEW PROJECT DETAIL ]',
      prev: 'PREVIOUS',
      next: 'NEXT'
    },
    skills: {
      title: 'TECH STACK',
      front: 'FRONT-END',
      back: 'BACK-END',
      db: 'DATABASE',
      tools: 'TOOLS'
    },
    contact: {
      title: 'CONTACT',
      subtitle1: 'OPEN TO FULL-STACK & BACK-END ROLES',
      subtitle2: 'AVAILABLE FULL-TIME FROM MAY 2026',
      phone: 'PHONE',
      email: 'EMAIL',
      github: 'GITHUB'
    },
    footer: {
      copy: '© 2026 JIRAYUS MOOLSART. BUILT WITH TYPE-SAFE COMPONENTS.'
    }
  },
  th: {
    nav: {
      about: 'เกี่ยวกับ',
      projects: 'ผลงาน',
      skills: 'ทักษะ',
      contact: 'ติดต่อ',
      site_info: 'ข้อมูลเว็บไซต์',
    },
    hero: {
      loading: '▶ กำลังโหลดพอร์ตโฟลิโอ... ',
      role: 'นักพัฒนา Full Stack',
      stats: {
        months: '7 เดือน',
        internship: 'ฝึกงาน',
        gpa: 'เกรดเฉลี่ย 3.31',
        university: 'มจพ.',
        gradDate: 'พฤษภาคม 2569',
        graduation: 'จบการศึกษา'
      },
      viewProjects: '▶ ดูผลงาน',
      github: 'กิตฮับ',
    },
    about: {
      title: 'เกี่ยวกับฉัน',
      profile: '// โปรไฟล์',
      desc1: "นักศึกษาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ (มจพ.)",
      desc2: "ผมเป็นนักพัฒนาที่มุ่งเน้นการสร้างเว็บแอปพลิเคชันที่รองรับการขยายตัวและใช้งานได้จริง จากประสบการณ์การฝึกงาน ผมพร้อมนำวิธีการเขียนโค้ดระดับ Production มาใช้ในทุกโปรเจกต์",
      education: '// การศึกษา',
      degree: 'วท.บ. วิทยาการคอมพิวเตอร์',
      faculty: 'คณะวิทยาศาสตร์ประยุกต์ มจพ.',
      gpa: 'เกรดเฉลี่ย 3.31 / 4.00'
    },
    experience: {
      title: 'ประสบการณ์',
      role: 'นักศึกษาฝึกงาน Software Developer',
      company: 'SCICAP CO., LTD.',
      duration: '7 เดือน',
      location: 'กรุงเทพมหานคร',
      tasks: [
        'พัฒนาเว็บแอปพลิเคชันระบบธนาคารภายในโดยใช้ Java, Spring Boot, และ Thymeleaf',
        'ดูแลระบบโมดูลสำหรับองค์กรบนเฟรมเวิร์ก Java Struts 2 โดยเน้นความเสถียรและความปลอดภัย',
        'ออกแบบและพัฒนา Telegram Bot เพื่อจัดการ Workflow และทำรายงานอัตโนมัติ',
        'ทำงานร่วมกับทีม QA เพื่อแก้ไขบั๊กและเพิ่มประสิทธิภาพของระบบ'
      ]
    },
    projects: {
      title: 'ผลงาน',
      viewDetail: '[ ดูรายละเอียดโปรเจกต์ ]',
      prev: 'ก่อนหน้า',
      next: 'ถัดไป'
    },
    skills: {
      title: 'เทคโนโลยีที่ใช้',
      front: 'ส่วนหน้า',
      back: 'ส่วนหลัง',
      db: 'ฐานข้อมูล',
      tools: 'เครื่องมือ'
    },
    contact: {
      title: 'ติดต่อ',
      subtitle1: 'เปิดรับตำแหน่ง FULL-STACK & BACK-END',
      subtitle2: 'พร้อมเริ่มงานเต็มเวลา พฤษภาคม 2569',
      phone: 'โทรศัพท์',
      email: 'อีเมล',
      github: 'กิตฮับ'
    },
    footer: {
      copy: '© 2569 จิรายุส มูลศาสตร์. สร้างด้วยส่วนประกอบที่ปลอดภัยต่อชนิดข้อมูล'
    }
  },
  jp: {
    nav: {
      about: '概要',
      projects: 'プロジェクト',
      skills: 'スキル',
      contact: '連絡先',
      site_info: 'サイト情報',
    },
    hero: {
      loading: '▶ ポートフォリオを読み込み中... ',
      role: 'フルスタック開発者',
      stats: {
        months: '7ヶ月',
        internship: 'インターン',
        gpa: 'GPA 3.31',
        university: 'KMUTNB',
        gradDate: '2026年5月',
        graduation: '卒業予定'
      },
      viewProjects: '▶ プロジェクトを見る',
      github: 'ギットハブ',
    },
    about: {
      title: '私について',
      profile: '// プロフィール',
      desc1: "キングモンクット工科大学ノースバンコク校 (KMUTNB) コンピュータサイエンス専攻。",
      desc2: "私は、現実世界の問題を解決する、スケーラブルでモダンなウェブアプリケーションの構築に注力している開発者です。インターンシップでの実践的な業界経験を活かし、すべてのプロジェクトで本番環境レベルのコーディングを実践します。",
      education: '// 学歴',
      degree: '理学士 コンピュータサイエンス',
      faculty: '応用科学部、KMUTNB',
      gpa: 'GPA 3.31 / 4.00'
    },
    experience: {
      title: '職歴',
      role: 'ソフトウェア開発インターン',
      company: 'SCICAP CO., LTD.',
      duration: '7ヶ月',
      location: 'バンコク、タイ',
      tasks: [
        'Java、Spring Boot、Thymeleafを使用して行内向けウェブアプリケーションを開発。',
        '安定性とセキュリティに重点を置き、Java Struts 2フレームワーク上のエンタープライズモジュールを保守。',
        'ワークフローの自動化と自動レポート作成のためのTelegram Botを設計および実装。',
        'QAチームと協力して致命的なバグを解決し、システムの効率を向上。'
      ]
    },
    projects: {
      title: 'プロジェクト',
      viewDetail: '[ プロジェクトの詳細を見る ]',
      prev: '前へ',
      next: '次へ'
    },
    skills: {
      title: '技術スタック',
      front: 'フロントエンド',
      back: 'バックエンド',
      db: 'データベース',
      tools: 'ツール'
    },
    contact: {
      title: '連絡先',
      subtitle1: 'フルスタックおよびバックエンドの求人を募集しています',
      subtitle2: '2026年5月からフルタイムで勤務可能',
      phone: '電話番号',
      email: 'メール',
      github: 'ギットハブ'
    },
    footer: {
      copy: '© 2026 JIRAYUS MOOLSART. 型安全なコンポーネントで構築。'
    }
  }
};
