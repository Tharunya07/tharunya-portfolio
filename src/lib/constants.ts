export const SITE_CONFIG = {
  name: 'Tharunya Pathipati',
  title: 'Software Engineer & Security Enthusiast',
  description: 'Pushing the boundaries of technology at the intersection of innovation and impact.',
  author: {
    name: 'Tharunya Pathipati',
    email: 'tharunyapathipati@gmail.com',
    linkedin: 'https://www.linkedin.com/in/tharunya-pathipati/',
    github: 'https://github.com/Tharunya07',
    location: 'Fort Collins, CO, USA',
    university: 'Colorado State University',
    degree: 'Master of Science in Computer Information Systems',
  },
  navigation: [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ],
  themes: [
    { id: 'light' as const, emoji: '☀️', name: 'Light Mode' },
    { id: 'hacker' as const, emoji: '🖥️', name: 'Hacker Mode' },
    { id: 'cloud' as const, emoji: '☁️', name: 'Cloud Mode' },
    { id: 'retro' as const, emoji: '🕹️', name: 'Retro Mode' },
  ],
} as const;

export const TECH_STACK = [
  { name: 'Python', icon: '🐍', level: 'Expert', category: 'Programming' },
  { name: 'JavaScript', icon: '⚡', level: 'Advanced', category: 'Programming' },
  { name: 'TypeScript', icon: '📘', level: 'Advanced', category: 'Programming' },
  { name: 'React', icon: '⚛️', level: 'Advanced', category: 'Frontend' },
  { name: 'Next.js', icon: '▲', level: 'Advanced', category: 'Frontend' },
  { name: 'Docker', icon: '🐳', level: 'Advanced', category: 'DevOps' },
  { name: 'AWS', icon: '☁️', level: 'Advanced', category: 'Cloud' },
  { name: 'Linux', icon: '🐧', level: 'Expert', category: 'Systems' },
  { name: 'Node.js', icon: '💚', level: 'Intermediate', category: 'Backend' },
  { name: 'Kubernetes', icon: '⛵', level: 'Intermediate', category: 'DevOps' },
] as const;

export const SKILL_LEVELS = {
  Expert: { color: 'bg-primary', priority: 3 },
  Advanced: { color: 'bg-accent', priority: 2 },
  Intermediate: { color: 'bg-secondary', priority: 1 },
} as const;