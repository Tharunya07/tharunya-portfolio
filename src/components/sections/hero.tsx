'use client';

import React from 'react';
import { Terminal } from '@/components/terminal/terminal-intro';
// OR if using static version:
// import { StaticTerminal as Terminal } from '@/components/terminal/static-terminal';

export function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="text-primary">Hello, I'm</span>
              <br />
              <span className="text-accent">Tharunya</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted max-w-2xl">
              Software Engineer & Security Enthusiast pushing the boundaries of 
              technology at the intersection of innovation and impact.
            </p>
            
            <div className="flex flex-wrap gap-4">
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
            
            <div className="text-muted space-y-2">
              <div>📍 Fort Collins, CO, USA</div>
              <div>🎓 CSU Graduate Student</div>
              <div>🚀 Building the Future</div>
            </div>
          </div>
          
          <div className="lg:order-last">
            <Terminal className="max-w-lg mx-auto shadow-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}