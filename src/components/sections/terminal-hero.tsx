// components/sections/terminal-hero.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Download, Mail, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const TERMINAL_COMMANDS = [
  { command: 'whoami', response: 'Tharunya Pathipati' },
  { 
    command: 'cat about.txt', 
    response: [
      'Software Engineer & Security Enthusiast',
      'Pushing the boundaries of technology at the intersection',
      'of innovation and impact.'
    ]
  },
  { command: 'echo $STATUS', response: 'Available for opportunities' }
];

export function TerminalHero() {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandIndex, setCommandIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  // Terminal animation
  const runCommand = useCallback(async () => {
    if (isTyping) return;
    setIsTyping(true);

    const cmd = TERMINAL_COMMANDS[commandIndex];
    
    // Type command
    for (let i = 0; i <= cmd.command.length; i++) {
      setCurrentCommand(cmd.command.substring(0, i));
      await new Promise(r => setTimeout(r, 80));
    }
    
    await new Promise(r => setTimeout(r, 500));
    setTerminalLines(prev => [...prev, `$ ${cmd.command}`]);
    setCurrentCommand('');
    
    // Add response
    const responses = Array.isArray(cmd.response) ? cmd.response : [cmd.response];
    for (const line of responses) {
      await new Promise(r => setTimeout(r, 200));
      setTerminalLines(prev => [...prev, line]);
    }
    
    await new Promise(r => setTimeout(r, 3000));
    
    const next = (commandIndex + 1) % TERMINAL_COMMANDS.length;
    setCommandIndex(next);
    if (next === 0) {
      await new Promise(r => setTimeout(r, 2000));
      setTerminalLines([]);
    }
    
    setIsTyping(false);
  }, [isTyping, commandIndex]);

  useEffect(() => {
    const timer = setTimeout(runCommand, 1000);
    return () => clearTimeout(timer);
  }, [runCommand]);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-4xl md:text-5xl font-bold">
              <span className="text-primary">Hello</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold">
              I'm <span className="text-accent">Tharunya</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-muted max-w-2xl leading-relaxed">
            Software Engineer & Security Enthusiast pushing the boundaries of technology 
            at the intersection of <span className="text-primary font-semibold">innovation</span> and <span className="text-accent font-semibold">impact</span>.
          </p>

          <div className="flex flex-wrap gap-6 text-sm text-muted">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              Fort Collins, CO, USA
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              CSU Graduate Student
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Building the Future
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/projects">
              <Button size="lg" className="group">
                <ChevronRight className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                Explore Projects
              </Button>
            </Link>
            <Button variant="outline" size="lg" onClick={() => window.open('/resume', '_blank')}>
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </Button>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button variant="ghost" size="sm" onClick={() => window.open('mailto:tharunyapathipati@gmail.com', '_blank')}>
              <Mail className="w-4 h-4 mr-2" />Contact Me
            </Button>
            <Button variant="ghost" size="sm" onClick={() => window.open('https://github.com/Tharunya07', '_blank')}>
              <ExternalLink className="w-4 h-4 mr-2" />GitHub
            </Button>
          </div>
        </div>

        <div className="lg:justify-self-end w-full max-w-lg">
          <div className="bg-surface border border-border rounded-lg shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-sm text-muted font-mono">tharunya@portfolio:~</span>
            </div>
            
            <div className="p-6 font-mono text-sm space-y-1 h-[400px] overflow-hidden">
              {terminalLines.map((line, i) => (
                <div key={`${commandIndex}-${i}`} className={line.startsWith('$') ? 'text-green-400' : 'text-text'}>
                  {line}
                </div>
              ))}
              {(currentCommand || isTyping) && (
                <div className="flex items-center text-green-400">
                  <span>$ {currentCommand}</span>
                  <span className="animate-pulse ml-1">█</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}