// app/about/page.tsx
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Header } from '@/components/layout/header';
import { About } from '@/components/sections/about';
import { ExperienceTimeline } from '@/components/sections/experience-timeline';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Simplified inline explore cards
function ExploreSection() {
  return (
    <section className="py-8 px-4 bg-surface">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-6 text-primary">Explore More</h2>
       
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Link href="/misc" className="group block">
            <div className="bg-background border border-border rounded-lg p-4 hover:shadow-md transition-all hover:border-primary/30">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💚</span>
                <div className="text-left flex-1">
                  <h3 className="font-semibold text-text group-hover:text-primary transition-colors">Stuff I Love</h3>
                  <p className="text-sm text-muted">Books, tools, and resources</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
          <Link href="/misc" className="group block">
            <div className="bg-background border border-border rounded-lg p-4 hover:shadow-md transition-all hover:border-primary/30">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📔</span>
                <div className="text-left flex-1">
                  <h3 className="font-semibold text-text group-hover:text-primary transition-colors">Build Diaries</h3>
                  <p className="text-sm text-muted">Real project stories</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        </div>
        <Link href="/projects">
          <Button variant="outline" className="group">
            View Projects & Tech Stack
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

// Main page component - removed tech stack
function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-text">
      <Header />
      
      {/* About section with minimal top spacing */}
      <div className="max-w-6xl mx-auto px-4 pt-4 pb-8">
        <About />
      </div>

      {/* Experience Timeline - Override its padding */}
      <div className="[&>section]:py-8">
        <ExperienceTimeline />
      </div>

      {/* Explore More - Compact */}
      <ExploreSection />

      <Footer />
    </div>
  );
}

// Default export with ThemeProvider
export default function AboutPageWrapper() {
  return (
    <ThemeProvider>
      <AboutPage />
    </ThemeProvider>
  );
}