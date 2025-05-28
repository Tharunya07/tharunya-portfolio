'use client';

import React from 'react';

export function About() {
  return (
    <section id="about" className="py-20 px-4">
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
    </section>
  );
}