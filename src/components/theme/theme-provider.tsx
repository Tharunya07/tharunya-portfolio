'use client';

import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { SITE_CONFIG } from '@/lib/constants';

export type ThemeId = 'light' | 'hacker' | 'cloud' | 'retro';

interface ThemeContextType {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  toggleTheme: () => void;
  isValidTheme: (theme: string) => theme is ThemeId;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeValue] = useLocalStorage<ThemeId>('portfolio-theme', 'light');

  const isValidTheme = useCallback((theme: string): theme is ThemeId => {
    return ['light', 'hacker', 'cloud', 'retro'].includes(theme);
  }, []);

  const setTheme = useCallback((newTheme: ThemeId) => {
    if (isValidTheme(newTheme)) {
      setThemeValue(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  }, [isValidTheme, setThemeValue]);

  const toggleTheme = useCallback(() => {
    const themes = SITE_CONFIG.themes.map(t => t.id);
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  }, [theme, setTheme]);

  const value = {
    theme,
    setTheme,
    toggleTheme,
    isValidTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}