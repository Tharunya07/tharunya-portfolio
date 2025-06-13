// components/sections/terminal.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Download, Mail, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const TERMINAL_COMMANDS = [
  { command: 'whoami', response: 'Tharunya Pathipati' },
  { 
    command: 'cat achievements.txt', 
    response: [
      '- Global CyberPeace Challenge Winner',
      '- Nokia Software Engineering Intern',
      '- CSU Teaching Assistant',
      '- GDSC Lead - 1000+ students impacted',
      '- 5G Infrastructure & AI Specialist'
    ]
  },
  { command: 'echo $STATUS', response: '- Available for opportunities' }
];

export function Terminal() {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isActive, setIsActive] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const commandIndexRef = useRef(0);
  const isRunningRef = useRef(false);

  useEffect(() => {
    const runTerminalSequence = async () => {
      if (isRunningRef.current || !isActive) return;
      isRunningRef.current = true;

      while (isActive) {
        const cmd = TERMINAL_COMMANDS[commandIndexRef.current];
        
        // Clear current command
        setCurrentCommand('');
        
        // Type command
        for (let i = 0; i <= cmd.command.length; i++) {
          if (!isActive) break;
          setCurrentCommand(cmd.command.substring(0, i));
          await new Promise(resolve => setTimeout(resolve, 200));
        }
        
        if (!isActive) break;
        
        // Pause after typing
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Add command to terminal
        setTerminalLines(prev => [...prev, `$ ${cmd.command}`]);
        setCurrentCommand('');
        
        // Add responses
        const responses = Array.isArray(cmd.response) ? cmd.response : [cmd.response];
        for (const response of responses) {
          if (!isActive) break;
          await new Promise(resolve => setTimeout(resolve, 300));
          setTerminalLines(prev => [...prev, response]);
        }
        
        if (!isActive) break;
        
        // Wait before next command
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Move to next command
        commandIndexRef.current = (commandIndexRef.current + 1) % TERMINAL_COMMANDS.length;
        
        // Clear terminal when starting new cycle
        if (commandIndexRef.current === 0) {
          await new Promise(resolve => setTimeout(resolve, 200));
          if (isActive) {
            setTerminalLines([]);
            await new Promise(resolve => setTimeout(resolve, 300));
          }
        }
      }
      
      isRunningRef.current = false;
    };

    // Start the sequence after a brief delay
    const startDelay = setTimeout(() => {
      runTerminalSequence();
    }, 800);

    return () => {
      clearTimeout(startDelay);
      setIsActive(false);
    };
  }, [isActive]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setIsActive(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

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
             I break things. Then I build <span className="text-primary font-semibold">better </span>ones.
          </p>

          <div className="flex flex-wrap gap-6 text-sm text-muted">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-complement rounded-full"></span>
              Fort Collins, CO, USA
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-complement rounded-full"></span>
              CSU Graduate Student
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-complement rounded-full"></span>
              Weird Flex: Forklift Certified
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
            
            <div className="p-6 font-mono text-sm space-y-1 h-[400px] overflow-y-auto">
              {terminalLines.map((line, index) => (
                <div 
                  key={`line-${index}-${line}`}
                  className={line.startsWith('$') ? 'text-complement font-semibold' : 'text-complement'}
                >
                  {line}
                </div>
              ))}
              
              {/* Current command being typed */}
              <div className="flex items-center text-complement font-semibold">
                <span>$ {currentCommand}</span>
                <span className="animate-pulse ml-1">█</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}