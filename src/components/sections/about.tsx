'use client';

import React from 'react';
import { Shield, Cog, Brain, Code, Users } from 'lucide-react';

export function About() {
  const skills = [
    { icon: Shield, label: 'Cybersecurity' },
    { icon: Cog, label: 'DevOps' },
    { icon: Brain, label: 'Exploring AI ML' },
    { icon: Code, label: 'Full-Stack Development' },
    { icon: Users, label: 'Teaching & Mentoring' }
  ];

  return (
    <section id="about" className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 text-primary">About Me</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-surface border border-border rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-text">Who I Am</h3>
            <p className="text-muted mb-4">
              I&apos;m a creative engineer, currently pursuing 
              my Master&apos;s in Computer Information Systems at Colorado State University.
            </p>
            <p className="text-muted mb-4">
              With experience at companies like Nokia and Anheuser-Busch InBev, I put my energy into 
              building secure, scalable, and efficient systems. I love tackling complex problems and
              finding innovative solutions that make a real impact.
            </p>
            <p className="text-muted">
              When I&apos;m not coding, you&apos;ll find me organizing tech events, teaching a class, baking or watching a good movie.
            </p>
          </div>
          
          <div className="bg-surface border border-border rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-text">What I Do</h3>
            <div className="space-y-4">
              {skills.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center space-x-3">
                  <div className="relative flex h-8 w-8 items-center justify-center">
                    <div className="absolute h-full w-full rounded-full bg-primary/20 animate-pulse"></div>
                    <Icon className="relative h-4 w-4 text-primary" />
                  </div>
                  <span className="text-text">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}