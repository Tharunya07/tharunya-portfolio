'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '../theme/theme-provider';

interface TerminalCommand {
  command: string;
  output?: string[];
  delay?: number;
  typeSpeed?: number;
}

const TERMINAL_SEQUENCE: TerminalCommand[] = [
  {
    command: 'whoami',
    output: ['tharunya_pathipati'],
    delay: 500,
    typeSpeed: 80
  },
  {
    command: 'pwd',
    output: ['/home/tharunya/portfolio'],
    delay: 300,
    typeSpeed: 60
  },
  {
    command: 'ls -la',
    output: [
      'total 42',
      'drwxr-xr-x  8 tharunya tharunya  256 Jan 15 10:30 .',
      'drwxr-xr-x  3 tharunya tharunya   96 Jan 15 10:25 ..',
      '-rw-r--r--  1 tharunya tharunya 1337 Jan 15 10:30 about.md',
      'drwxr-xr-x  4 tharunya tharunya  128 Jan 15 10:29 projects/',
      'drwxr-xr-x  3 tharunya tharunya   96 Jan 15 10:28 experience/',
      '-rw-r--r--  1 tharunya tharunya  512 Jan 15 10:30 skills.json',
      '-rwxr-xr-x  1 tharunya tharunya 2048 Jan 15 10:30 portfolio.exe'
    ],
    delay: 400,
    typeSpeed: 40
  },
  {
    command: 'cat welcome.txt',
    output: [
      '╔══════════════════════════════════════════════════════════════╗',
      '║                    WELCOME TO MY PORTFOLIO                   ║',
      '║                                                              ║',
      '║    ████████╗██╗  ██╗ █████╗ ██████╗ ██╗   ██╗███╗   ██╗     ║',
      '║    ╚══██╔══╝██║  ██║██╔══██╗██╔══██╗██║   ██║████╗  ██║     ║',
      '║       ██║   ███████║███████║██████╔╝██║   ██║██╔██╗ ██║     ║',
      '║       ██║   ██╔══██║██╔══██║██╔══██╗██║   ██║██║╚██╗██║     ║',
      '║       ██║   ██║  ██║██║  ██║██║  ██║╚██████╔╝██║ ╚████║     ║',
      '║       ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝     ║',
      '║                                                              ║',
      '║           Software Engineer & Security Enthusiast           ║',
      '║                                                              ║',
      '╚══════════════════════════════════════════════════════════════╝'
    ],
    delay: 600,
    typeSpeed: 20
  },
  {
    command: 'node portfolio.js --initialize',
    output: [
      '🚀 Initializing portfolio system...',
      '📦 Loading projects... ████████████████ 100%',
      '🔧 Setting up theme engine... ████████████████ 100%', 
      '🌟 Activating interactive mode... ████████████████ 100%',
      '✅ Portfolio system ready!',
      '',
      '💡 Tip: Try different themes using the controls above',
      '🎯 Navigate through sections to explore my work',
      '',
      '👋 Welcome to my digital universe!'
    ],
    delay: 800,
    typeSpeed: 30
  }
];

export function TerminalIntro({ onComplete }: { onComplete: () => void }) {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentCommand, setCurrentCommand] = useState('');
  const [currentOutput, setCurrentOutput] = useState<string[]>([]);
  const [isTypingCommand, setIsTypingCommand] = useState(true);
  const [isTypingOutput, setIsTypingOutput] = useState(false);
  const [outputLineIndex, setOutputLineIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [executedCommands, setExecutedCommands] = useState<TerminalCommand[]>([]);
  const { theme } = useTheme();

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Main animation logic
  useEffect(() => {
    if (currentCommandIndex >= TERMINAL_SEQUENCE.length) {
      setIsComplete(true);
      setTimeout(onComplete, 2000);
      return;
    }

    const currentCmd = TERMINAL_SEQUENCE[currentCommandIndex];

    if (isTypingCommand) {
      // Type the command
      const typeCommand = () => {
        const targetCommand = currentCmd.command;
        const currentLength = currentCommand.length;
        
        if (currentLength < targetCommand.length) {
          setCurrentCommand(targetCommand.slice(0, currentLength + 1));
          setTimeout(typeCommand, currentCmd.typeSpeed || 60);
        } else {
          // Command typed, now show output
          setIsTypingCommand(false);
          if (currentCmd.output && currentCmd.output.length > 0) {
            setTimeout(() => {
              setIsTypingOutput(true);
            }, currentCmd.delay || 300);
          } else {
            // No output, move to next command
            setTimeout(moveToNextCommand, currentCmd.delay || 300);
          }
        }
      };

      setTimeout(typeCommand, 100);
    }
  }, [currentCommandIndex, isTypingCommand, currentCommand]);

  // Handle output typing
  useEffect(() => {
    if (!isTypingOutput || currentCommandIndex >= TERMINAL_SEQUENCE.length) return;

    const currentCmd = TERMINAL_SEQUENCE[currentCommandIndex];
    if (!currentCmd.output) return;

    if (outputLineIndex < currentCmd.output.length) {
      const timer = setTimeout(() => {
        setCurrentOutput(prev => [...prev, currentCmd.output![outputLineIndex]]);
        setOutputLineIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      // Output complete, move to next command
      setTimeout(moveToNextCommand, 500);
    }
  }, [isTypingOutput, outputLineIndex, currentCommandIndex]);

  const moveToNextCommand = () => {
    // Save current command to history
    setExecutedCommands(prev => [...prev, {
      command: currentCommand,
      output: currentOutput
    }]);

    // Reset for next command
    setCurrentCommand('');
    setCurrentOutput([]);
    setOutputLineIndex(0);
    setIsTypingCommand(true);
    setIsTypingOutput(false);
    setCurrentCommandIndex(prev => prev + 1);
  };

  const skipAnimation = () => {
    setIsComplete(true);
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
      <div className="w-full max-w-4xl mx-4">
        {/* Terminal Window */}
        <div className="bg-surface border border-border rounded-lg shadow-2xl">
          {/* Terminal Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-sm text-muted font-mono">
              tharunya@portfolio:~$
            </div>
            <button
              onClick={skipAnimation}
              className="text-xs text-muted hover:text-accent transition-colors px-2 py-1 rounded"
            >
              Skip →
            </button>
          </div>

          {/* Terminal Content */}
          <div className="p-6 font-mono text-sm min-h-[400px] max-h-[600px] overflow-y-auto">
            {/* Previous commands */}
            {executedCommands.map((cmd, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center">
                  <span className="text-accent mr-2">$</span>
                  <span className="text-primary">{cmd.command}</span>
                </div>
                {cmd.output && cmd.output.map((line, lineIndex) => (
                  <div key={lineIndex} className="text-text ml-4 whitespace-pre">
                    {line}
                  </div>
                ))}
              </div>
            ))}

            {/* Current command being typed */}
            {!isComplete && (
              <div>
                <div className="flex items-center">
                  <span className="text-accent mr-2">$</span>
                  <span className="text-primary">{currentCommand}</span>
                  {isTypingCommand && showCursor && (
                    <span className="text-accent animate-pulse">|</span>
                  )}
                </div>

                {/* Current output being shown */}
                {currentOutput.map((line, index) => (
                  <div key={index} className="text-text ml-4 whitespace-pre">
                    {line}
                  </div>
                ))}
                
                {isTypingOutput && showCursor && (
                  <div className="text-accent ml-4 animate-pulse">|</div>
                )}
              </div>
            )}

            {/* Completion message */}
            {isComplete && (
              <div className="text-center mt-8">
                <div className="text-accent animate-pulse">
                  🚀 Entering portfolio... 
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-4 text-center">
          <div className="text-sm text-muted mb-2">
            Loading portfolio system... {Math.round((currentCommandIndex / TERMINAL_SEQUENCE.length) * 100)}%
          </div>
          <div className="w-full bg-surface rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentCommandIndex / TERMINAL_SEQUENCE.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}