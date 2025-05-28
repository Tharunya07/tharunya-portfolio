'use client';

import React from 'react';
import { useTheme } from '@/components/theme/theme-provider';

export function Header() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Tharunya Pathipati</h1>
        
        <nav className="hidden md:flex space-x-6">
          <a href="#hero" className="text-text hover:text-primary transition-colors">Home</a>
          <a href="#about" className="text-text hover:text-primary transition-colors">About</a>
          <a href="#projects" className="text-text hover:text-primary transition-colors">Projects</a>
          <a href="#contact" className="text-text hover:text-primary transition-colors">Contact</a>
        </nav>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setTheme('light')}
            className={`p-2 rounded-lg transition-all ${theme === 'light' ? 'bg-primary text-white' : 'hover:bg-surface'}`}
          >
            ☀️
          </button>
          <button
            onClick={() => setTheme('hacker')}
            className={`p-2 rounded-lg transition-all ${theme === 'hacker' ? 'bg-primary text-white' : 'hover:bg-surface'}`}
          >
            🖥️
          </button>
          <button
            onClick={() => setTheme('cloud')}
            className={`p-2 rounded-lg transition-all ${theme === 'cloud' ? 'bg-primary text-white' : 'hover:bg-surface'}`}
          >
            ☁️
          </button>
          <button
            onClick={() => setTheme('retro')}
            className={`p-2 rounded-lg transition-all ${theme === 'retro' ? 'bg-primary text-white' : 'hover:bg-surface'}`}
          >
            🕹️
          </button>
        </div>
      </div>
    </div>
  );
}