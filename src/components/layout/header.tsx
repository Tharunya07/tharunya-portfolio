// components/layout/header.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Menu, X, ChevronDown } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMiscOpen, setIsMiscOpen] = useState(false);
  const miscRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
    { label: 'Resume', href: '/resume' },
  ];

  const miscItems = [
    { label: 'My Space', href: '/myspace' },
    { label: 'Blogs', href: '/blogs' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const isMiscActive = () => {
    return miscItems.some(item => pathname.startsWith(item.href));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (miscRef.current && !miscRef.current.contains(event.target as Node)) {
        setIsMiscOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo - Links to LinkedIn */}
        <button
          onClick={() => window.open('https://www.linkedin.com/in/tharunya-pathipati/', '_blank')}
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <span className="font-bold text-xl text-primary">Tharunya Pathipati</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(item.href)
                  ? 'text-primary border-b-2 border-primary pb-1'
                  : 'text-muted-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
          
          {/* Improved Misc Dropdown */}
          <div 
            ref={miscRef}
            className="relative"
          >
            <button
              onClick={() => setIsMiscOpen(!isMiscOpen)}
              onMouseEnter={() => setIsMiscOpen(true)}
              className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                isMiscActive()
                  ? 'text-primary border-b-2 border-primary pb-1'
                  : 'text-muted-foreground'
              }`}
            >
              Misc
              <ChevronDown className={`w-3 h-3 transition-transform ${isMiscOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Improved Dropdown Menu */}
            {isMiscOpen && (
              <div 
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-2 z-50"
                onMouseEnter={() => setIsMiscOpen(true)}
                onMouseLeave={() => setIsMiscOpen(false)}
              >
                {miscItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMiscOpen(false)}
                    className={`block px-4 py-3 text-sm transition-colors hover:bg-surface hover:text-primary ${
                      isActive(item.href) ? 'text-primary bg-surface' : 'text-muted-foreground'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Small visual indicator */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-background border-l border-t border-border rotate-45"></div>
              </div>
            )}
          </div>
        </nav>

        {/* Theme Toggle & Mobile Menu */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="flex flex-col space-y-4 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href) ? 'text-primary' : 'text-muted-foreground'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Misc Items */}
            <div className="border-t border-border pt-4">
              <div className="text-xs font-semibold text-muted mb-2 uppercase tracking-wider">Misc</div>
              {miscItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block py-2 text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href) ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}