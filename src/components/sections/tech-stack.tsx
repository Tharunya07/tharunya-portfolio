'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';

const TECH_STACK = [
  // Programming Languages
  { name: 'Python', category: 'Programming', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  { name: 'JavaScript', category: 'Programming', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
  { name: 'TypeScript', category: 'Programming', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  { name: 'Java', category: 'Programming', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
  { name: 'C++', category: 'Programming', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
  
  // Frontend
  { name: 'React', category: 'Frontend', color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200' },
  { name: 'Next.js', category: 'Frontend', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200' },
  { name: 'HTML/CSS', category: 'Frontend', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' },
  
  // Backend & Database
  { name: 'Node.js', category: 'Backend', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  { name: 'Flask', category: 'Backend', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200' },
  { name: 'PostgreSQL', category: 'Backend', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  { name: 'MongoDB', category: 'Backend', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  
  // DevOps & light
  { name: 'Docker', category: 'DevOps', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  { name: 'Kubernetes', category: 'DevOps', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' },
  { name: 'AWS', category: 'light', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
  { name: 'Jenkins', category: 'DevOps', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
  
  // Systems & Security
  { name: 'Linux', category: 'Systems', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
  { name: 'Cybersecurity', category: 'Security', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
  { name: 'Network Security', category: 'Security', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
  
  // AI/ML
  { name: 'Machine Learning', category: 'AI/ML', color: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200' },
  { name: 'TensorFlow', category: 'AI/ML', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' },
  { name: 'OpenCV', category: 'AI/ML', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
];

export function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories = ['All', 'Programming', 'Frontend', 'Backend', 'DevOps', 'light', 'Systems', 'Security', 'AI/ML'];
  const filteredTechs = selectedCategory === 'All' 
    ? TECH_STACK 
    : TECH_STACK.filter(tech => tech.category === selectedCategory);

  return (
    <section className="py-16 px-4 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-primary">Tech Stack</h2>
          <p className="text-muted max-w-2xl mx-auto">
            Technologies I use to build amazing digital experiences
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2 p-1 bg-background rounded-lg border border-border max-w-4xl">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
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
        
        {/* Tech Stack Grid */}
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {filteredTechs.map((tech) => (
            <div
              key={tech.name}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 cursor-default ${tech.color}`}
            >
              {tech.name}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-2xl mx-auto">
          <div>
            <div className="text-2xl font-bold text-primary mb-1">5+</div>
            <div className="text-sm text-muted">Languages</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary mb-1">15+</div>
            <div className="text-sm text-muted">Technologies</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary mb-1">6</div>
            <div className="text-sm text-muted">Major Projects</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary mb-1">2+</div>
            <div className="text-sm text-muted">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
}