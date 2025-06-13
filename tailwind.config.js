/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Your existing colors
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        text: 'rgb(var(--color-text) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        complement: 'rgb(var(--color-complement) / <alpha-value>)',
        
        // Additional colors for UI components
        foreground: 'rgb(var(--color-text) / <alpha-value>)',
        card: 'rgb(var(--color-surface) / <alpha-value>)',
        'card-foreground': 'rgb(var(--color-text) / <alpha-value>)',
        popover: 'rgb(var(--color-surface) / <alpha-value>)',
        'popover-foreground': 'rgb(var(--color-text) / <alpha-value>)',
        'primary-foreground': 'rgb(var(--color-background) / <alpha-value>)',
        'secondary-foreground': 'rgb(var(--color-text) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--color-muted) / <alpha-value>)',
        'accent-foreground': 'rgb(var(--color-text) / <alpha-value>)',
        destructive: 'hsl(0 18.2% 20.2%)',
        'destructive-foreground': 'hsl(210 40% 98%)',
        input: 'rgb(var(--color-border) / <alpha-value>)',
        ring: 'rgb(var(--color-primary) / <alpha-value>)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounceSubtle 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgb(var(--color-primary))' },
          '100%': { boxShadow: '0 0 20px rgb(var(--color-primary)), 0 0 30px rgb(var(--color-primary))' },
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
      },
    },
  },
  plugins: [],
};