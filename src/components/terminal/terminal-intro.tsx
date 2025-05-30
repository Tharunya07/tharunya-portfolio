'use client';

import React, { useState, useEffect } from 'react';

const COMMANDS = [
  {
    command: 'whoami',
    output: ['tharunya_pathipati'],
    typeSpeed: 80,
    delay: 1500,
  },
  {
    command: 'ls -la',
    output: [
      'total 24',
      '-rw-r--r-- 1 tharunya tharunya  256 Jan 15 10:30 about.md',
      'drwxr-xr-x 2 tharunya tharunya 4096 Jan 15 10:29 projects',
      'drwxr-xr-x 2 tharunya tharunya 4096 Jan 15 10:28 experience',
      '-rw-r--r-- 1 tharunya tharunya  128 Jan 15 10:30 skills.json'
    ],
    typeSpeed: 60,
    delay: 3000,
  }
];

interface TerminalProps {
  className?: string;
}

export function Terminal({ className = '' }: TerminalProps) {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [displayedCommand, setDisplayedCommand] = useState('');
  const [displayedOutput, setDisplayedOutput] = useState<string[]>([]);
  const [currentOutputLine, setCurrentOutputLine] = useState(0);
  const [isTypingCommand, setIsTypingCommand] = useState(true);
  const [isTypingOutput, setIsTypingOutput] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Cursor blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Type command character by character
  useEffect(() => {
    if (!isTypingCommand) return;

    const currentCommand = COMMANDS[currentCommandIndex];
    const targetCommand = currentCommand.command;

    if (displayedCommand.length < targetCommand.length) {
      const timer = setTimeout(() => {
        setDisplayedCommand(targetCommand.slice(0, displayedCommand.length + 1));
      }, currentCommand.typeSpeed);

      return () => clearTimeout(timer);
    } else {
      // Command typing complete, start output
      setIsTypingCommand(false);
      setTimeout(() => {
        setIsTypingOutput(true);
      }, 200);
    }
  }, [displayedCommand, currentCommandIndex, isTypingCommand]);

  // Type output line by line
  useEffect(() => {
    if (!isTypingOutput) return;

    const currentCommand = COMMANDS[currentCommandIndex];
    
    if (currentOutputLine < currentCommand.output.length) {
      const timer = setTimeout(() => {
        setDisplayedOutput(prev => [...prev, currentCommand.output[currentOutputLine]]);
        setCurrentOutputLine(prev => prev + 1);
      }, 100);

      return () => clearTimeout(timer);
    } else {
      // Output complete, wait then restart with next command
      setTimeout(() => {
        // Reset everything for next command
        setDisplayedCommand('');
        setDisplayedOutput([]);
        setCurrentOutputLine(0);
        setIsTypingCommand(true);
        setIsTypingOutput(false);
        setCurrentCommandIndex((prev) => (prev + 1) % COMMANDS.length);
      }, currentCommand.delay);
    }
  }, [currentOutputLine, currentCommandIndex, isTypingOutput]);

  return (
    <div className={`bg-surface border border-border rounded-lg font-mono text-sm ${className}`}>
      {/* Terminal Header */}
      <div className="flex items-center justify-between p-3 border-b border-border bg-surface/50">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-muted">
          tharunya@portfolio:~
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-4 h-[300px] overflow-hidden">
        {/* Current command being typed */}
        <div className="mb-2">
          <div className="flex items-center">
            <span className="text-accent mr-2">$</span>
            <span className="text-primary">{displayedCommand}</span>
            {isTypingCommand && showCursor && (
              <span className="text-accent">|</span>
            )}
          </div>
        </div>

        {/* Output lines */}
        <div className="space-y-1">
          {displayedOutput.map((line, index) => (
            <div key={index} className="text-text ml-4">
              {line}
            </div>
          ))}
          {isTypingOutput && showCursor && (
            <div className="text-accent ml-4">|</div>
          )}
        </div>
      </div>
    </div>
  );
}