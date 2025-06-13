// app/myspace/page.tsx
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Header } from '@/components/layout/header';
import { MySpaceContent } from '@/components/sections/myspace-content';
import { Footer } from '@/components/layout/footer';

function MySpacePage() {
  return (
    <div className="min-h-screen bg-background text-text transition-colors duration-300">
      <Header />
    
      <section className="py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-primary">My Space</h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            A curated corner of everything that moves me, tech that excites me, people who uplift me, and communities that remind me why I do what I do.
          </p>
        </div>
      </section>

      {/* Content */}
      <MySpaceContent />

      <Footer />
    </div>
  );
}

export default function MySpace() {
  return (
    <ThemeProvider>
      <MySpacePage />
    </ThemeProvider>
  );
}