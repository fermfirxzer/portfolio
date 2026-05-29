import React from 'react';
import { Layout, Layers, Box } from 'lucide-react';

export interface Contributor {
  name: string;
  github: string;
}

export interface ProjectFeature {
  id: string;
  title: string;
  summary?: string;
  detail?: string;
  image?: string | null;
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
  return project.features.map((title, i) => ({
    id: `${project.id}-feature-${i}`,
    title,
    summary: title,
    detail: title,
    image: null,
  }));
}

export const projects: Project[] = [
  {
    id: 'movie-ticket-booking',
    num: 'PROJECT_01',
    title: 'MOVIE TICKET BOOKING SYSTEM',
    description: 'A full-stack movie platform with seat selection and stripe payments.',
    longDesc: 'Complete web application for browsing movies, selecting seats, managing showtimes, and purchasing tickets with real payment processing and QR verification.',
    icon: 'layout',
    iconUrl: '/projects/movie_ticket/icon.png',
    features: [
      'Movie browsing with showtime scheduling',
      'Interactive seat selection map',
      'Secure online payments via Stripe API',
      'QR-based ticket verification system',
      'Admin dashboard for showtime management'
    ],
    featureDetails: [
      {
        id: 'movie-browse',
        title: 'Movie browsing & showtimes',
        summary: 'Browse films, posters, and available showtimes in one flow.',
        detail:
          'The home experience lets users explore currently showing movies with clear poster art, ratings, and quick access to schedules. Each movie page surfaces upcoming showtimes by date and auditorium so users can compare options before booking.\n\nThe layout is built for fast scanning on desktop and mobile, with responsive grids and consistent typography across the booking journey.',
        image: '/projects/movie_ticket/main-page.png',
      },
      {
        id: 'seat-selection',
        title: 'Interactive seat selection',
        summary: 'Visual seat map with real-time availability.',
        detail:
          'Users pick seats from an interactive auditorium map that reflects available, held, and booked seats. The UI highlights the selected seats, shows pricing context, and prevents double-booking by validating selection server-side before checkout.\n\nThis feature focuses on clarity—large touch targets, strong contrast for seat states, and immediate feedback when a seat is taken.',
        image: '/projects/movie_ticket/seat-selection.png',
      },
      {
        id: 'stripe-payment',
        title: 'Secure Stripe checkout',
        summary: 'Card payments handled through Stripe with a polished checkout step.',
        detail:
          'Ticket purchases go through Stripe for secure card processing. The checkout step summarizes showtime, seats, and total price before payment, reducing mistakes and abandoned carts.\n\nPayment state is tracked so successful bookings can generate tickets and failed payments can be handled gracefully without losing the user’s seat hold.',
        image: '/projects/movie_ticket/stripe-payment.png',
      },
      {
        id: 'ticket-qr',
        title: 'Ticket purchase & QR verification',
        summary: 'Complete purchase flow with ticket output for entry verification.',
        detail:
          'After payment, users receive a digital ticket they can present at the cinema. The buy-ticket flow confirms booking details and prepares verification data (such as QR codes) so staff or systems can validate entry quickly.\n\nThis closes the loop from browsing → seats → pay → proof of purchase.',
        image: '/projects/movie_ticket/buy%20ticket.png',
      },
      {
        id: 'booking-history',
        title: 'Booking history',
        summary: 'Past bookings and ticket access in one place.',
        detail:
          'Signed-in users can review previous bookings from a history view—useful for re-opening tickets, checking showtimes, or confirming past payments. The screen keeps a clean record-oriented layout with status cues and quick navigation back to active tickets.',
        image: '/projects/movie_ticket/history.png',
      },
      {
        id: 'showtime-admin',
        title: 'Showtime management',
        summary: 'Schedule and manage showtimes behind the scenes.',
        detail:
          'Administrators can configure showtimes tied to movies and auditoriums. The showtime UI supports operational workflows like adding slots, aligning capacity with seat maps, and keeping the public browse experience in sync with what is actually bookable.',
        image: '/projects/movie_ticket/showtime.png',
      },
    ],
    tech: ['Next.js', 'Tailwind CSS', 'MongoDB', 'Stripe', 'Vercel'],
    github: 'https://github.com/fermfirxzer',
    liveUrl: 'https://movie-ticket-nextjs-projects.vercel.app/',
    createdAt: '2026-04-29T13:18:39.365891+00:00',
    contributors: [
      { name: 'fermfirxzer', github: 'https://github.com/fermfirxzer' },
      { name: 'jirayus', github: 'https://github.com/fermfirxzer' }
    ],
    isPublished: true
  },
  {
    id: 'novel-platform',
    num: 'PROJECT_02',
    title: 'NOVEL READING & WRITING PLATFORM',
    description: 'Social platform for writers and readers with engagement features.',
    longDesc: 'Web platform for publishing, managing, and reading novels with social features like bookmarks, likes, comments, and personal writing profiles.',
    icon: 'layers',
    features: [
      'User authentication and profile management',
      'Chapter-based publishing systems',
      'Social interactions (likes, bookmarks, comments)',
      'RESTful API architecture',
      'Responsive mobile-first design'
    ],
    tech: ['React.js', 'Node.js', 'Express', 'Bootstrap'],
    github: 'https://github.com/fermfirxzer',
    liveUrl: '',
    createdAt: '2026-04-29T13:18:39.365891+00:00',
    contributors: [
      { name: 'fermfirxzer', github: 'https://github.com/fermfirxzer' },
      { name: 's6504062630057', github: 'https://github.com/s6504062630057' }
    ],
    isPublished: true
  },
  {
    id: 'numerical-calculator',
    num: 'PROJECT_03',
    title: 'NUMERICAL METHODS CALCULATOR',
    description: 'Educational tool for visualizing mathematical computations.',
    longDesc: 'Interactive educational application that computes and visualizes numerical methods with real-time dynamic graphing and step-by-step solutions.',
    icon: 'box',
    features: [
      'Multiple solving methods (Bisection, Newton-Raphson, Secant)',
      'Real-time data visualization via Chart.js',
      'Step-by-step solution breakdowns',
      'Client-side high-performance computing'
    ],
    tech: ['React.js', 'Chart.js', 'Tailwind CSS'],
    github: 'https://github.com/fermfirxzer',
    liveUrl: '',
    createdAt: '2026-04-29T13:18:39.365891+00:00',
    contributors: [
      { name: 'fermfirxzer', github: 'https://github.com/fermfirxzer' }
    ],
    isPublished: true
  },
  {
    id: 'java-mining-game',
    num: 'PROJECT_04',
    title: 'JAVA MINING GAME (Object Oriented Programming Subject)',
    description: 'Java desktop mining game project focused on object-oriented design and interactive gameplay logic.',
    longDesc: 'JAVA 2 MINING GAME is a Java-based game project developed using object-oriented programming principles, featuring interactive gameplay mechanics, player actions, and game logic implementation. The project demonstrates core Java concepts such as classes, inheritance, encapsulation, and event handling while creating a simple and engaging desktop game experience.',
    icon: 'box',
    features: [
      'Object-oriented architecture with reusable game entities',
      'Interactive desktop gameplay mechanics',
      'Core Java concepts: inheritance, encapsulation, and event handling',
      'Structured game loop and player action controls'
    ],
    tech: ['Java', 'OOP', 'Desktop UI'],
    github: 'https://github.com/fermfirxzer/JAVA_GAME',
    liveUrl: '',
    createdAt: '2026-04-29T21:48:46.710977+00:00',
    contributors: [
      { name: 'fermfirxzer', github: 'https://github.com/fermfirxzer' }
    ],
    isPublished: true
  }
];

export const getIcon = (icon: string) => {
  const cls = "w-6 h-6 text-brand-red transition-colors duration-200";
  switch (icon) {
    case 'layout': return <Layout className={cls} />;
    case 'layers': return <Layers className={cls} />;
    case 'box': return <Box className={cls} />;
    default: return <Box className={cls} />;
  }
};

export async function fetchProjectById(id: string) {
  // Check local data first
  const localProject = projects.find(p => p.id === id);
  if (localProject) return localProject;

  // Not in local — try fetching from DB
  try {
    const response = await fetch(`/api/projects/${id}`);
    if (!response.ok) throw new Error('Project not found');
    const data = await response.json() as Project;
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
