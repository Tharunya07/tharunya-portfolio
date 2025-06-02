// components/layout/footer.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { 
      icon: <Github className="w-4 h-4" />, 
      href: 'https://github.com/Tharunya07',
      label: 'GitHub'
    },
    { 
      icon: <Linkedin className="w-4 h-4" />, 
      href: 'https://www.linkedin.com/in/tharunya-pathipati/',
      label: 'LinkedIn'
    },
    { 
      icon: <Mail className="w-4 h-4" />, 
      href: 'mailto:tharunyapathipati@gmail.com',
      label: 'Email'
    },
  ];

  return (
    <footer className="border-t border-border bg-surface py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left: Copyright */}
          <div className="text-sm text-muted">
            © {currentYear} Tharunya Pathipati. All rights reserved.
          </div>

          {/* Center: Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Button
                key={social.href}
                variant="ghost"
                size="icon"
                onClick={() => window.open(social.href, '_blank')}
                className="h-8 w-8"
              >
                {social.icon}
              </Button>
            ))}
          </div>

          {/* Right: Built with */}
          <div className="text-xs text-muted">
            Built with Next.js & TypeScript
          </div>
        </div>

        {/* Bottom: License */}
        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted">
            Open source under{' '}
            <Button
              variant="ghost"
              className="h-auto p-0 text-xs text-primary hover:underline"
              onClick={() => window.open('https://opensource.org/licenses/MIT', '_blank')}
            >
              MIT License
            </Button>
          </p>
        </div>
      </div>
    </footer>
  );
}