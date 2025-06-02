// app/page.tsx - Landing Page
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Header } from '@/components/layout/header';
import { TerminalHero } from '@/components/sections/terminal-hero';
import { Footer } from '@/components/layout/footer';

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-text transition-colors duration-300">
      <Header />
      <TerminalHero />
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <LandingPage />
    </ThemeProvider>
  );
}