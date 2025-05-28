export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  accent: string;
  muted: string;
  border: string;
}

export interface Theme {
  name: string;
  id: string;
  colors: ThemeColors;
}

export type ThemeId = 'light' | 'hacker' | 'cloud' | 'retro';