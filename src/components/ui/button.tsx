// components/ui/button.tsx - Updated with all needed sizes
'use client';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  size?: 'sm' | 'md' | 'lg' | 'icon';
=======
  size?: 'sm' | 'md' | 'lg' | 'icon'; // Added 'icon' size
>>>>>>> Stashed changes
=======
  size?: 'sm' | 'md' | 'lg' | 'icon'; // Added 'icon' size
>>>>>>> Stashed changes
  isLoading?: boolean;
}

export function Button({
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
 
  const variants = {
    primary: 'bg-primary text-white hover:opacity-90 shadow-lg',
    secondary: 'bg-secondary text-white hover:opacity-90',
    outline: 'border border-border bg-surface hover:bg-primary/10 text-text',
    ghost: 'bg-transparent hover:bg-surface/50 text-text',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    icon: 'h-10 w-10 p-0', // Added icon size for icon-only buttons
=======
    icon: 'h-10 w-10 p-0', // Icon size for square buttons
>>>>>>> Stashed changes
=======
    icon: 'h-10 w-10 p-0', // Icon size for square buttons
>>>>>>> Stashed changes
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${isLoading ? 'cursor-not-allowed' : ''} ${className}`;

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}