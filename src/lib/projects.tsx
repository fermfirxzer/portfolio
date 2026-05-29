import React from 'react';
import { Layout, Layers, Box } from 'lucide-react';

export interface Contributor {
  name: string;
  github: string;
}

export type ProjectFeatureBlock =
  | {
      type: 'text';
      text: string;
    }
  | {
      type: 'image';
      src: string;
      alt: string;
      caption?: string;
    }
  | {
      type: 'spacer';
    };

export interface ProjectFeature {
  id: string;
  title: string;
  summary?: string;
  detail?: string;
  image?: string | null;
  blocks?: ProjectFeatureBlock[];
}

export interface Project {
  id: string;
  num: string;
  title: string;
  description: string;
  longDesc: string;
  icon: 'layout' | 'layers' | 'box';
  iconUrl?: string | null;
  features: string[];
  featureDetails?: ProjectFeature[];
  tech: string[];
  github: string;
  liveUrl?: string;
  createdAt?: string;
  contributors: Contributor[];
  isPublished: boolean;
}

/** Normalize features for list + detail UI */
export function getProjectFeatures(project: Project): ProjectFeature[] {
  if (project.featureDetails?.length) {
    return project.featureDetails;
  }

  return project.features.map((title, index) => ({
    id: `${project.id}-feature-${index}`,
    title,
    summary: title,
    detail: title,
    image: null,
  }));
}

export function getFeatureBlocks(feature: ProjectFeature): ProjectFeatureBlock[] {
  if (feature.blocks?.length) {
    return feature.blocks;
  }

  const blocks: ProjectFeatureBlock[] = [];

  if (feature.detail?.trim()) {
    blocks.push({ type: 'text', text: feature.detail });
  } else if (feature.summary?.trim()) {
    blocks.push({ type: 'text', text: feature.summary });
  }

  if (feature.image) {
    blocks.push({
      type: 'image',
      src: feature.image,
      alt: feature.title,
      caption: feature.summary,
    });
  }

  return blocks;
}

export const projects: Project[] = [
  {
    id: 'movie-ticket-booking',
    num: 'PROJECT_01',
    title: 'MOVIE TICKET BOOKING SYSTEM',
    description: 'Full-stack movie booking platform with seat selection, Stripe checkout, and ticket verification.',
    longDesc:
      'A production-style movie booking platform that guides users from browsing showtimes to selecting seats, paying securely, and receiving a verifiable ticket. The system also includes booking history and admin tools for showtime management, making it easy to understand both the customer flow and the operational side of the application.',
    icon: 'layout',
    iconUrl: '/projects/movie_ticket/icon.png',
    features: [
      'Movie browsing and showtime discovery',
      'Interactive seat selection',
      'Stripe payment processing',
      'QR-based ticket verification',
      'Admin showtime management',
    ],
    featureDetails: [
      {
        id: 'movie-browse',
        title: 'Browse movies and showtimes',
        summary: 'Users can quickly compare films, posters, and available showtimes.',
        blocks: [
          {
            type: 'text',
            text: 'This screen is the first step in the booking journey. Users can scan current movies, view poster art, and move into a showtime selection flow without extra clicks.',
          },
          {
            type: 'image',
            src: '/projects/movie_ticket/main-page.png',
            alt: 'Movie browsing main page',
            caption: 'Main browsing interface',
          },
          {
            type: 'text',
            text: 'The layout is optimized for quick decision-making on desktop and mobile. Showtimes are organized clearly so users can compare options before they commit to a booking.',
          },
        ],
      },
      {
        id: 'seat-selection',
        title: 'Choose seats visually',
        summary: 'An auditorium map shows availability, selection, and price context.',
        blocks: [
          {
            type: 'text',
            text: 'Users select seats from a clear auditorium map that reflects available, held, and booked states. The interface gives immediate visual feedback, which reduces mistakes and makes the booking flow easier to understand at a glance.',
          },
          {
            type: 'image',
            src: '/projects/movie_ticket/seat-selection.png',
            alt: 'Interactive seat selection',
            caption: 'Seat map and selection flow',
          },
          {
            type: 'text',
            text: 'This is the most interaction-heavy part of the project, so I focused on clarity, contrast, and responsive touch targets.',
          },
        ],
      },
      {
        id: 'stripe-payment',
        title: 'Process payments securely',
        summary: 'Stripe handles payment flow with a clear checkout summary.',
        blocks: [
          {
            type: 'text',
            text: 'The checkout flow summarizes the showtime, selected seats, and total price before payment. That reduces user error and creates a cleaner handoff to Stripe for secure card processing.',
          },
          {
            type: 'image',
            src: '/projects/movie_ticket/stripe-payment.png',
            alt: 'Stripe payment checkout',
            caption: 'Payment confirmation step',
          },
          {
            type: 'text',
            text: 'The payment state is tracked so a successful purchase can generate a ticket, while failed payments can be handled without losing the booking context.',
          },
        ],
      },
      {
        id: 'ticket-qr',
        title: 'Generate tickets and QR verification',
        summary: 'After payment, the system produces a digital ticket for entry validation.',
        blocks: [
          {
            type: 'text',
            text: 'After payment, users receive a digital ticket that can be checked at the cinema. The flow closes the loop from browsing to booking confirmation and makes it easy to verify entry with a QR-based check.',
          },
          {
            type: 'image',
            src: '/projects/movie_ticket/buy%20ticket.png',
            alt: 'Ticket purchase confirmation',
            caption: 'Digital ticket output',
          },
        ],
      },
      {
        id: 'booking-history',
        title: 'Review booking history',
        summary: 'Signed-in users can revisit past bookings and ticket details.',
        blocks: [
          {
            type: 'text',
            text: 'The booking history page gives users a simple way to revisit past reservations, confirm details, and access tickets again if needed. It adds trust and makes the application feel complete beyond the initial purchase.',
          },
          {
            type: 'image',
            src: '/projects/movie_ticket/history.png',
            alt: 'Booking history screen',
            caption: 'Past bookings and ticket access',
          },
        ],
      },
      {
        id: 'showtime-admin',
        title: 'Manage showtimes',
        summary: 'Admins can create and maintain showtimes tied to movies and auditoriums.',
        blocks: [
          {
            type: 'text',
            text: 'The admin side supports operational tasks such as creating showtimes, matching capacity to seat maps, and keeping the public booking view in sync with what is actually available.',
          },
          {
            type: 'image',
            src: '/projects/movie_ticket/showtime.png',
            alt: 'Showtime management interface',
            caption: 'Admin showtime management',
          },
        ],
      },
    ],
    tech: ['Next.js', 'Tailwind CSS', 'MongoDB', 'Stripe', 'Vercel'],
    github: 'https://github.com/fermfirxzer',
    liveUrl: 'https://movie-ticket-nextjs-projects.vercel.app/',
    createdAt: '2026-04-29T13:18:39.365891+00:00',
    contributors: [
      { name: 'fermfirxzer', github: 'https://github.com/fermfirxzer' },
      { name: 'jirayus', github: 'https://github.com/fermfirxzer' },
    ],
    isPublished: true,
  },
  {
    id: 'novel-platform',
    num: 'PROJECT_02',
    title: 'NOVEL READING & WRITING PLATFORM',
    description: 'A reading and writing platform with publishing tools, social features, and author profiles.',
    longDesc:
      'This project focuses on the full content lifecycle for novels: writing chapters, publishing stories, discovering books, and engaging with other readers through likes, bookmarks, and comments. It demonstrates how I structure a social product around user accounts, content management, and responsive UI patterns.',
    icon: 'layers',
    features: [
      'Authentication and author profiles',
      'Chapter-based publishing workflow',
      'Reader engagement features',
      'RESTful API architecture',
      'Mobile-first responsive UI',
    ],
    featureDetails: [
      {
        id: 'novel-auth',
        title: 'Authentication and author profiles',
        summary: 'Users can sign in, manage their profiles, and create a personal writing identity.',
        detail:
          'The platform includes user authentication and profile management so readers and writers can have a clear identity on the site. This gives the application a stronger product structure and supports future features such as saved reading lists or personalized recommendations.',
      },
      {
        id: 'novel-chapters',
        title: 'Chapter publishing workflow',
        summary: 'Stories are organized into chapters for easier writing and reading.',
        detail:
          'The chapter-based model makes long-form content easier to manage. Writers can publish content in a structured way, and readers can move through a story without losing context.',
      },
      {
        id: 'novel-social',
        title: 'Reader engagement features',
        summary: 'Bookmarks, likes, and comments help users interact with content.',
        detail:
          'Social actions such as likes, bookmarks, and comments make the platform feel active rather than static. These interactions are important because they show that the application supports both content consumption and community engagement.',
      },
      {
        id: 'novel-api',
        title: 'API-driven architecture',
        summary: 'The application is built around a RESTful backend structure.',
        detail:
          'A RESTful API keeps the frontend and backend cleanly separated. That makes the project easier to maintain, easier to scale, and easier to extend with additional client experiences later.',
      },
    ],
    tech: ['React.js', 'Node.js', 'Express', 'Bootstrap'],
    github: 'https://github.com/fermfirxzer',
    liveUrl: '',
    createdAt: '2026-04-29T13:18:39.365891+00:00',
    contributors: [
      { name: 'fermfirxzer', github: 'https://github.com/fermfirxzer' },
      { name: 's6504062630057', github: 'https://github.com/s6504062630057' },
    ],
    isPublished: true,
  },
  {
    id: 'numerical-calculator',
    num: 'PROJECT_03',
    title: 'NUMERICAL METHODS CALCULATOR',
    description: 'An educational calculator that explains numerical methods with live graphs and step-by-step solutions.',
    longDesc:
      'This application helps users understand numerical methods by showing both the calculations and the visual outcome. It is designed as an educational tool, so the focus is not just on producing answers, but on making the solving process easier to follow.',
    icon: 'box',
    features: [
      'Multiple numerical solving methods',
      'Real-time graph visualization',
      'Step-by-step solution breakdowns',
      'Fast client-side calculation',
    ],
    featureDetails: [
      {
        id: 'calc-methods',
        title: 'Multiple solving methods',
        summary: 'Supports Bisection, Newton-Raphson, and Secant methods.',
        detail:
          'The calculator lets users compare different numerical methods in one interface. That makes it useful for learning, because the behavior and tradeoffs of each method become easier to understand.',
      },
      {
        id: 'calc-visualization',
        title: 'Real-time visualization',
        summary: 'Results are shown visually through Chart.js graphs.',
        detail:
          'Graphing is important in educational tools because it connects the math to a visual result. The live chart helps users see how the algorithm behaves while the calculation is running.',
      },
      {
        id: 'calc-breakdown',
        title: 'Step-by-step output',
        summary: 'Each solution includes a breakdown of the process.',
        detail:
          'Instead of only returning a final answer, the app shows the intermediate steps. That makes the tool more useful in an academic setting and easier for a recruiter to understand as a thoughtful UX choice.',
      },
      {
        id: 'calc-performance',
        title: 'Client-side performance',
        summary: 'The application keeps calculations responsive in the browser.',
        detail:
          'By handling the calculations on the client side, the tool stays responsive and simple to use. It also keeps the experience lightweight for educational demos and presentations.',
      },
    ],
    tech: ['React.js', 'Chart.js', 'Tailwind CSS'],
    github: 'https://github.com/fermfirxzer',
    liveUrl: '',
    createdAt: '2026-04-29T13:18:39.365891+00:00',
    contributors: [
      { name: 'fermfirxzer', github: 'https://github.com/fermfirxzer' },
    ],
    isPublished: true,
  },
  {
    id: 'java-mining-game',
    num: 'PROJECT_04',
    title: 'JAVA MINING GAME (Object Oriented Programming Subject)',
    description: 'A Java desktop game built for an OOP subject, focused on gameplay logic and reusable architecture.',
    longDesc:
      'This project was built as part of an object-oriented programming course and demonstrates how I structure classes, game logic, and player interactions in Java. It shows practical use of core OOP concepts while keeping the game simple enough to understand and demonstrate clearly.',
    icon: 'box',
    features: [
      'Object-oriented game architecture',
      'Interactive desktop gameplay',
      'Core Java OOP concepts',
      'Structured game loop and controls',
    ],
    featureDetails: [
      {
        id: 'game-oop',
        title: 'Object-oriented architecture',
        summary: 'The game is organized into reusable classes and entities.',
        detail:
          'The project was designed around reusable classes to keep the game logic manageable. That makes it a clear example of how I apply inheritance, encapsulation, and class-based structure in Java.',
      },
      {
        id: 'gameplay',
        title: 'Interactive gameplay',
        summary: 'Players can interact with the game through desktop controls.',
        detail:
          'The gameplay loop includes player actions and interactive mechanics, which makes the project feel like a real application instead of only a classroom exercise.',
      },
      {
        id: 'game-java',
        title: 'Core Java concepts',
        summary: 'The code demonstrates inheritance, encapsulation, and event handling.',
        detail:
          'This project is useful to recruiters because it shows practical Java fundamentals, not just UI work. It reflects a solid understanding of how to organize logic and respond to user actions in a desktop program.',
      },
      {
        id: 'game-loop',
        title: 'Structured game loop',
        summary: 'The game uses a consistent loop and control flow.',
        detail:
          'A predictable game loop keeps the desktop experience stable and easy to reason about. It also shows that the project was built with maintainability in mind.',
      },
    ],
    tech: ['Java', 'OOP', 'Desktop UI'],
    github: 'https://github.com/fermfirxzer/JAVA_GAME',
    liveUrl: '',
    createdAt: '2026-04-29T21:48:46.710977+00:00',
    contributors: [
      { name: 'fermfirxzer', github: 'https://github.com/fermfirxzer' },
    ],
    isPublished: true,
  },
];

export const getIcon = (icon: string) => {
  const cls = 'w-6 h-6 text-brand-red transition-colors duration-200';
  switch (icon) {
    case 'layout':
      return <Layout className={cls} />;
    case 'layers':
      return <Layers className={cls} />;
    case 'box':
      return <Box className={cls} />;
    default:
      return <Box className={cls} />;
  }
};

export async function fetchProjectById(id: string) {
  const localProject = projects.find(project => project.id === id);
  if (localProject) return localProject;

  try {
    const response = await fetch(`/api/projects/${id}`);
    if (!response.ok) throw new Error('Project not found');
    const data = (await response.json()) as Project;
    if (data && data.id) return data;
    return null;
  } catch (error) {
    console.error('Error fetching project from DB:', error);
    return null;
  }
}

export function getProjectLink(project: Project) {
  return project.liveUrl?.trim() || project.github;
}
