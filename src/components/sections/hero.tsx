'use client';

import React from 'react';

export function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 py-20">
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
    </section>
  );
}