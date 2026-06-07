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
    },
    about_info: {
      back: 'BACK_TO_HOME',
      repo: '[ REPO ↗ ]',
      meta: 'META_INFORMATION',
      title: 'ABOUT THIS <br /> ARCHITECTURE',
      design: {
        title: 'Design Concept',
        p1: 'This portfolio is designed with a "Retro-Futuristic Brutalist" aesthetic, inspired by early computer interfaces and modern high-contrast design systems.',
        p2: "The objective was to create a digital CV that doesn't just list skills but demonstrates them through performance, accessibility, and unique visual identity. It features a custom theme engine, responsive layouts, and type-safe data fetching.",
        p3: 'Furthermore, this project embraces "Vibe Coding", having been built in active collaboration with the Antigravity UI Architect AI agent. This advanced agentic approach allowed for rapid prototyping and iteration—blending production-grade code quality with striking aesthetics and flawless user experience.'
      },
      tech: {
        title: 'Technology Stack'
      },
      commits: {
        title: 'Recent Commits',
        loading: 'LOADING_COMMITS...',
        error: 'Unable to load recent commits.'
      },
      stats: {
        title: 'Project Stats'
      },
      open_source: {
        title: 'Open Source',
        desc: 'Want to see how this was built? The entire codebase is available on GitHub.',
        button: 'REPOSITORY ↗'
      },
      return: 'RETURN_TO_PORTFOLIO'
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
    },
    about_info: {
      back: 'กลับสู่หน้าหลัก',
      repo: '[ ดูซอร์สโค้ด ↗ ]',
      meta: 'ข้อมูลเมตา',
      title: 'เกี่ยวกับ <br /> สถาปัตยกรรมนี้',
      design: {
        title: 'แนวคิดการออกแบบ',
        p1: 'พอร์ตโฟลิโอนี้ได้รับการออกแบบด้วยสไตล์ "Retro-Futuristic Brutalist" ซึ่งได้รับแรงบันดาลใจจากอินเทอร์เฟซคอมพิวเตอร์ยุคแรกและระบบการออกแบบที่มีความเปรียบต่างสูงในปัจจุบัน',
        p2: 'วัตถุประสงค์คือการสร้าง CV ดิจิทัลที่ไม่เพียงแค่แสดงทักษะ แต่ยังสาธิตทักษะเหล่านั้นผ่านประสิทธิภาพ การเข้าถึง และเอกลักษณ์ทางภาพที่เป็นเอกลักษณ์ มีระบบธีมที่กำหนดเอง เลย์เอาต์ที่ตอบสนอง และการดึงข้อมูลที่ปลอดภัยต่อชนิดข้อมูล',
        p3: 'นอกจากนี้ โปรเจกต์นี้ยังใช้แนวคิด "Vibe Coding" โดยสร้างขึ้นจากการทำงานร่วมกันอย่างใกล้ชิดกับ AI เอเจนต์ Antigravity UI Architect แนวทางเอเจนต์ขั้นสูงนี้ช่วยให้สามารถสร้างต้นแบบและทำซ้ำได้อย่างรวดเร็ว โดยผสมผสานคุณภาพโค้ดระดับการใช้งานจริงเข้ากับความสวยงามที่โดดเด่นและประสบการณ์ผู้ใช้งานที่ไร้ที่ติ'
      },
      tech: {
        title: 'เทคโนโลยีที่ใช้'
      },
      commits: {
        title: 'การอัปเดตล่าสุด',
        loading: 'กำลังโหลดข้อมูลการอัปเดต...',
        error: 'ไม่สามารถโหลดข้อมูลการอัปเดตได้'
      },
      stats: {
        title: 'สถิติโปรเจกต์'
      },
      open_source: {
        title: 'โอเพนซอร์ส',
        desc: 'อยากเห็นว่าสิ่งนี้ถูกสร้างขึ้นมาได้อย่างไร? โค้ดทั้งหมดมีให้ดูบน GitHub',
        button: 'คลังเก็บซอร์สโค้ด ↗'
      },
      return: 'กลับสู่หน้าพอร์ตโฟลิโอ'
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
    },
    about_info: {
      back: 'ホームに戻る',
      repo: '[ リポジトリ ↗ ]',
      meta: 'メタ情報',
      title: 'このアーキテクチャ <br /> について',
      design: {
        title: 'デザインコンセプト',
        p1: 'このポートフォリオは、初期のコンピュータインターフェースと現代の高コントラストなデザインシステムからインスピレーションを得た「レトロ・フューチャリスティック・ブルータリズム」の美学でデザインされています。',
        p2: '目的は、単にスキルを羅列するだけでなく、パフォーマンス、アクセシビリティ、そしてユニークな視覚的アイデンティティを通じてスキルを実証するデジタルCVを作成することでした。カスタムテーマエンジン、レスポンシブレイアウト、型安全なデータフェッチを備えています。',
        p3: 'さらに、このプロジェクトは「Vibe Coding」を取り入れ、Antigravity UI Architect AIエージェントとの積極的なコラボレーションによって構築されました。この高度なエージェントアプローチにより、本番環境レベルのコード品質と印象的な美学、そして完璧なユーザーエクスペリエンスを融合させた迅速なプロトタイピングとイテレーションが可能になりました。'
      },
      tech: {
        title: '技術スタック'
      },
      commits: {
        title: '最近のコミット',
        loading: 'コミットを読み込み中...',
        error: '最近のコミットを読み込めませんでした。'
      },
      stats: {
        title: 'プロジェクト統計'
      },
      open_source: {
        title: 'オープンソース',
        desc: 'これがどのように構築されたか見てみませんか？ 全コードはGitHubで公開されています。',
        button: 'リポジトリ ↗'
      },
      return: 'ポートフォリオに戻る'
    }
  }
};

