import React from 'react';
import { Layout, Layers, Box } from 'lucide-react';

export interface Contributor {
  name: string;
  github: string;
}

export interface Project {
  id: string;
  num: string;
  title: string;
  description: string;
  longDesc: string;
  icon: 'layout' | 'layers' | 'box';
  features: string[];
  tech: string[];
  github: string;
  contributors: Contributor[];
}

export const projects: Project[] = [
  {
    id: 'movie-ticket-booking',
    num: 'PROJECT_01',
    title: 'MOVIE TICKET BOOKING SYSTEM',
    description: 'A full-stack movie platform with seat selection and stripe payments.',
    longDesc: 'Complete web application for browsing movies, selecting seats, managing showtimes, and purchasing tickets with real payment processing and QR verification.',
    icon: 'layout',
    features: [
      'Movie browsing with showtime scheduling',
      'Interactive seat selection map',
      'Secure online payments via Stripe API',
      'QR-based ticket verification system',
      'Admin dashboard for showtime management'
    ],
    tech: ['Next.js', 'Tailwind CSS', 'MongoDB', 'Stripe', 'Vercel'],
    github: 'https://github.com/fermfirxzer',
    contributors: [
      { name: 'fermfirxzer', github: 'https://github.com/fermfirxzer' },
      { name: 'jirayus', github: 'https://github.com/fermfirxzer' }
    ]
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
    contributors: [
      { name: 'fermfirxzer', github: 'https://github.com/fermfirxzer' },
      { name: 's6504062630057', github: 'https://github.com/s6504062630057' }
    ]
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
    contributors: [
      { name: 'fermfirxzer', github: 'https://github.com/fermfirxzer' }
    ]
  }
];

export const getIcon = (icon: string) => {
  switch (icon) {
    case 'layout': return <Layout className="w-10 h-10 text-brand-red" />;
    case 'layers': return <Layers className="w-10 h-10 text-brand-red" />;
    case 'box': return <Box className="w-10 h-10 text-brand-red" />;
    default: return <Box className="w-10 h-10 text-brand-red" />;
  }
};

export async function fetchProjects() {
  try {
    const response = await fetch('/api/projects');
    if (!response.ok) throw new Error('Failed to fetch projects');
    const data = await response.json() as Project[];
    if (data && data.length > 0) return data;
    // Fallback to local mock data if DB is empty
    return projects;
  } catch (error) {
    console.error('Error fetching projects, falling back to local data:', error);
    return projects;
  }
}

export async function fetchProjectById(id: string) {
  try {
    const response = await fetch(`/api/projects/${id}`);
    if (!response.ok) throw new Error('Project not found');
    const data = await response.json() as Project;
    if (data && data.id) return data;
    // Fallback to local mock data if DB is empty
    return projects.find(p => p.id === id) || null;
  } catch (error) {
    console.error('Error fetching project, falling back to local data:', error);
    return projects.find(p => p.id === id) || null;
  }
}
