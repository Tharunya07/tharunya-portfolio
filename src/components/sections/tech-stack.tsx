'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const TECH_STACK = [
  { name: 'Python', icon: '🐍', level: 'Expert', category: 'Programming' },
  { name: 'JavaScript', icon: '⚡', level: 'Advanced', category: 'Programming' },
  { name: 'TypeScript', icon: '📘', level: 'Advanced', category: 'Programming' },
  { name: 'React', icon: '⚛️', level: 'Advanced', category: 'Frontend' },
  { name: 'Docker', icon: '🐳', level: 'Advanced', category: 'DevOps' },
  { name: 'AWS', icon: '☁️', level: 'Advanced', category: 'Cloud' },
  { name: 'Linux', icon: '🐧', level: 'Expert', category: 'Systems' },
  { name: 'Node.js', icon: '💚', level: 'Intermediate', category: 'Backend' },
];

const SKILL_LEVELS = {
  Expert: 'bg-primary',
  Advanced: 'bg-accent', 
  Intermediate: 'bg-secondary',
};

export function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories = ['All', ...Array.from(new Set(TECH_STACK.map(tech => tech.category)))];
  const filteredTechs = selectedCategory === 'All' 
    ? TECH_STACK 
    : TECH_STACK.filter(tech => tech.category === selectedCategory);

  return (
    <section className="py-20 px-4 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 text-primary">
          Tech Stack
        </h2>
        
        <p className="text-center text-muted mb-12 max-w-2xl mx-auto">
          Technologies I use to build amazing digital experiences
        </p>

        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-2 p-1 bg-surface rounded-lg border border-border">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-muted hover:text-text hover:bg-primary/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTechs.map((tech, index) => (
            <Card
              key={tech.name}
              hover
              className="text-center group"
            >
              <CardContent className="p-4">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                  {tech.icon}
                </div>
                <h3 className="font-bold text-text mb-2">{tech.name}</h3>
                <span 
                  className={`text-xs px-2 py-1 rounded-full text-white ${
                    SKILL_LEVELS[tech.level as keyof typeof SKILL_LEVELS]
                  }`}
                >
                  {tech.level}
                </span>
                <div className="text-xs text-muted mt-1">{tech.category}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}