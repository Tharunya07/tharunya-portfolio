// components/layout/footer.tsx
'use client';

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
    <footer className="border-t border-border bg-background py-4">
      <div className="max-w-7xl mx-auto px-4">
        {/* Single row layout */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left: Copyright */}
          <div className="text-sm text-muted order-2 md:order-1">
            © {currentYear} Tharunya Pathipati. All rights reserved.
          </div>

          {/* Center: Social Links */}
          <div className="flex items-center gap-3 order-1 md:order-2">
            {socialLinks.map((social) => (
              <Button
                key={social.href}
                variant="ghost"
                size="icon"
                onClick={() => window.open(social.href, '_blank')}
                className="h-8 w-8 hover:bg-primary/10"
                title={social.label}
              >
                {social.icon}
              </Button>
            ))}
          </div>

          {/* Right: Built with + License */}
          <div className="flex items-center gap-4 text-xs text-muted order-3">
            <span>Built with Next.js & TypeScript</span>
            <span>•</span>
            <Button
              variant="ghost"
              className="h-auto p-0 text-xs text-muted hover:text-primary hover:underline"
              onClick={() => window.open('https://opensource.org/licenses/MIT', '_blank')}
            >
              MIT License
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}