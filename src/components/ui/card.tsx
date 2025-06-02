// components/ui/card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = false, onClick }: CardProps) {
  const baseClasses = 'bg-surface border border-border rounded-lg p-6 shadow-sm';
  const hoverClasses = hover ? 'hover:shadow-lg transition-all duration-200 hover:border-primary/20 hover:scale-[1.02]' : '';
  const clickClasses = onClick ? 'cursor-pointer' : '';
  const allClasses = `${baseClasses} ${hoverClasses} ${clickClasses} ${className}`;
  
  return (
    <div className={allClasses} onClick={onClick}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function CardTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <h3 className={`text-xl font-bold text-text mb-2 ${className}`}>{children}</h3>;
}

<<<<<<< Updated upstream
// Additional components that might be needed by the new sections
export function CardDescription({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>;
}

=======
// Added the missing CardDescription component
export function CardDescription({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-sm text-muted ${className}`}>{children}</p>;
}

// Added the missing CardFooter component
>>>>>>> Stashed changes
export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mt-4 pt-4 border-t border-border ${className}`}>{children}</div>;
}