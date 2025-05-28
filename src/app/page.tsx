'use client';

import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';

// Types
type ThemeId = 'light' | 'hacker' | 'cloud' | 'retro';

interface ThemeContextType {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  toggleTheme: () => void;
}

// Context (same working code)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeId>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as ThemeId;
    if (savedTheme && ['light', 'hacker', 'cloud', 'retro'].includes(savedTheme)) {
      setTheme(savedTheme);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('portfolio-theme', theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    const themes: ThemeId[] = ['light', 'hacker', 'cloud', 'retro'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Header Component
function Header() {
  const { theme, setTheme } = useTheme();
  
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Tharunya Pathipati</h1>
        
        <nav className="hidden md:flex space-x-6">
          <a href="#hero" className="text-text hover:text-primary transition-colors">Home</a>
          <a href="#about" className="text-text hover:text-primary transition-colors">About</a>
          <a href="#projects" className="text-text hover:text-primary transition-colors">Projects</a>
          <a href="#contact" className="text-text hover:text-primary transition-colors">Contact</a>
        </nav>
        
        <div className="flex space-x-2">
          {[
            { id: 'light', emoji: '☀️' },
            { id: 'hacker', emoji: '🖥️' },
            { id: 'cloud', emoji: '☁️' },
            { id: 'retro', emoji: '🕹️' }
          ].map(({ id, emoji }) => (
            <button
              key={id}
              onClick={() => setTheme(id as ThemeId)}
              className={`p-2 rounded-lg transition-all ${
                theme === id ? 'bg-primary text-white' : 'hover:bg-surface'
              }`}
              title={`Switch to ${id} theme`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

// Hero Section
function Hero() {
  return (
    <div id="hero" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-primary">Hello, I'm</span>
          <br />
          <span className="text-accent">Tharunya</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted mb-8 max-w-3xl mx-auto">
          Software Engineer & Security Enthusiast pushing the boundaries of 
          technology at the intersection of innovation and impact.
        </p>
        
        <div className="flex justify-center flex-wrap gap-4 mb-8">
          <button className="bg-primary text-white px-8 py-4 rounded-lg hover:opacity-90 transition-all shadow-lg">
            🚀 Explore Projects
          </button>
          <button className="border border-border bg-surface px-8 py-4 rounded-lg hover:bg-primary/10 transition-all">
            📄 Download Resume
          </button>
          <button className="bg-accent text-white px-8 py-4 rounded-lg hover:opacity-90 transition-all shadow-lg">
            💬 Contact Me
          </button>
        </div>
        
        <div className="text-muted space-x-6">
          <span>📍 Fort Collins, CO, USA</span>
          <span>🎓 CSU Graduate Student</span>
          <span>🚀 Building the Future</span>
        </div>
      </div>
    </div>
  );
}

// About Section
function About() {
  return (
    <div id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">About Me</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-surface border border-border rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-text">Who I Am</h3>
            <p className="text-muted mb-4">
              I'm a passionate software engineer and cybersecurity enthusiast currently pursuing 
              my Master's in Computer Information Systems at Colorado State University.
            </p>
            <p className="text-muted mb-4">
              With experience at companies like Nokia and Anheuser-Busch InBev, I specialize in 
              building scalable systems, automating workflows, and securing digital infrastructures.
            </p>
            <p className="text-muted">
              When I'm not coding, you'll find me organizing tech events, mentoring students, 
              or exploring the latest in AI and cloud technologies.
            </p>
          </div>
          
          <div className="bg-surface border border-border rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-text">What I Do</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🔒</span>
                <span className="text-text">Cybersecurity & Network Security</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">☁️</span>
                <span className="text-text">Cloud Computing & DevOps</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🤖</span>
                <span className="text-text">AI/ML & Data Analytics</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🌐</span>
                <span className="text-text">Full-Stack Development</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🎓</span>
                <span className="text-text">Teaching & Mentoring</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tech Stack Section
function TechStack() {
  const technologies = [
    { name: 'Python', icon: '🐍', level: 'Expert' },
    { name: 'JavaScript', icon: '⚡', level: 'Advanced' },
    { name: 'Docker', icon: '🐳', level: 'Advanced' },
    { name: 'AWS', icon: '☁️', level: 'Advanced' },
    { name: 'Linux', icon: '🐧', level: 'Expert' },
    { name: 'React', icon: '⚛️', level: 'Advanced' },
    { name: 'Node.js', icon: '💚', level: 'Intermediate' },
    { name: 'Kubernetes', icon: '⛵', level: 'Intermediate' }
  ];

  return (
    <div className="py-20 px-4 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">Tech Stack</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {technologies.map((tech) => (
            <div 
              key={tech.name}
              className="bg-surface border border-border rounded-lg p-6 text-center hover:scale-105 transition-transform"
            >
              <div className="text-4xl mb-3">{tech.icon}</div>
              <h3 className="font-bold text-text mb-2">{tech.name}</h3>
              <span className={`text-sm px-2 py-1 rounded ${
                tech.level === 'Expert' ? 'bg-primary text-white' :
                tech.level === 'Advanced' ? 'bg-accent text-white' :
                'bg-secondary text-white'
              }`}>
                {tech.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Portfolio Component
function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background text-text transition-colors duration-300">
      <Header />
      <Hero />
      <About />
      <TechStack />
      
      <div className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-primary">More Sections Coming Soon! 🚧</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2 text-text">🚀 Projects</h3>
              <p className="text-muted">Wiresnitch, CipherYou, CyHelp</p>
            </div>
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2 text-text">💼 Experience</h3>
              <p className="text-muted">Nokia, CSU, Anheuser-Busch</p>
            </div>
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2 text-text">📞 Contact</h3>
              <p className="text-muted">Get in touch!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <PortfolioPage />
    </ThemeProvider>
  );
}