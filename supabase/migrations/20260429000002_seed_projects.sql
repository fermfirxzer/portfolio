-- Migration: Seed initial project data
-- Created: 2026-04-29

INSERT INTO projects (id, num, title, description, long_desc, icon, features, tech, github) VALUES
(
  'movie-ticket-booking',
  'PROJECT_01',
  'MOVIE TICKET BOOKING SYSTEM',
  'A full-stack movie platform with seat selection and stripe payments.',
  'Complete web application for browsing movies, selecting seats, managing showtimes, and purchasing tickets with real payment processing and QR verification.',
  'layout',
  ARRAY[
    'Movie browsing with showtime scheduling',
    'Interactive seat selection map',
    'Secure online payments via Stripe API',
    'QR-based ticket verification system',
    'Admin dashboard for showtime management'
  ],
  ARRAY['Next.js', 'Tailwind CSS', 'MongoDB', 'Stripe', 'Vercel'],
  'https://github.com/fermfirxzer'
),
(
  'novel-platform',
  'PROJECT_02',
  'NOVEL READING & WRITING PLATFORM',
  'Social platform for writers and readers with engagement features.',
  'Web platform for publishing, managing, and reading novels with social features like bookmarks, likes, comments, and personal writing profiles.',
  'layers',
  ARRAY[
    'User authentication and profile management',
    'Chapter-based publishing systems',
    'Social interactions (likes, bookmarks, comments)',
    'RESTful API architecture',
    'Responsive mobile-first design'
  ],
  ARRAY['React.js', 'Node.js', 'Express', 'Bootstrap'],
  'https://github.com/fermfirxzer'
),
(
  'numerical-calculator',
  'PROJECT_03',
  'NUMERICAL METHODS CALCULATOR',
  'Educational tool for visualizing mathematical computations.',
  'Interactive educational application that computes and visualizes numerical methods with real-time dynamic graphing and step-by-step solutions.',
  'box',
  ARRAY[
    'Multiple solving methods (Bisection, Newton-Raphson, Secant)',
    'Real-time data visualization via Chart.js',
    'Step-by-step solution breakdowns',
    'Client-side high-performance computing'
  ],
  ARRAY['React.js', 'Chart.js', 'Tailwind CSS'],
  'https://github.com/fermfirxzer'
);

INSERT INTO project_contributors (project_id, name, github) VALUES
('movie-ticket-booking', 'fermfirxzer',    'https://github.com/fermfirxzer'),
('movie-ticket-booking', 'jirayus',        'https://github.com/fermfirxzer'),
('novel-platform',       'fermfirxzer',    'https://github.com/fermfirxzer'),
('novel-platform',       's6504062630057', 'https://github.com/s6504062630057'),
('numerical-calculator', 'fermfirxzer',    'https://github.com/fermfirxzer');
