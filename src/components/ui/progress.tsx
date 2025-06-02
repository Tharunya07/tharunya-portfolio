// src/components/ui/progress.tsx
import React from 'react';

interface ProgressProps {
  value?: number;
  className?: string;
  max?: number;
}

export function Progress({ value = 0, className = '', max = 100 }: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  return (
    <div className={`relative h-4 w-full overflow-hidden rounded-full bg-surface border border-border ${className}`}>
      <div
        className="h-full bg-primary transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}