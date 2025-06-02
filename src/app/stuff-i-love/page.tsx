// app/stuff-i-love/page.tsx
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Header } from '@/components/layout/header';
import { StuffILoveCards } from '@/components/sections/stuff-i-love-cards';
import { Footer } from '@/components/layout/footer';

function StuffILovePage() {
  return (
    <div className="min-h-screen bg-background text-text transition-colors duration-300">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-primary">Stuff I Love 💚</h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Books, talks, tools, and resources that have shaped my journey as an engineer.
          </p>
        </div>
      </section>

      {/* Stuff I Love Cards */}
      <StuffILoveCards />

      <Footer />
    </div>
  );
}

export default function StuffILove() {
  return (
    <ThemeProvider>
      <StuffILovePage />
    </ThemeProvider>
  );
}