// app/page.tsx
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Header } from '@/components/layout/header';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { TechStack } from '@/components/sections/tech-stack';
import { ProjectSandboxes } from '@/components/sections/project-sandboxes';
import { BlogDiaries } from '@/components/sections/blog-diaries';
import { StuffILoveShelf } from '@/components/sections/stuff-i-love-shelf';
import { VisualTechStackSlider } from '@/components/sections/visual-tech-stack-slider';

function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background text-text transition-colors duration-300">
      <Header />
      <Hero />
      <About />
      
      {/* Original Tech Stack Section */}
      <TechStack />
      
      {/* Enhanced Tech Stack Slider */}
      <VisualTechStackSlider />
      
      {/* Project Sandboxes - Interactive Demos */}
      <ProjectSandboxes />
      
      {/* Blog Diaries - Build Stories */}
      <BlogDiaries />
      
      {/* Stuff I Love Shelf */}
      <StuffILoveShelf />
      
      {/* Updated placeholder for remaining sections */}
      <section className="py-20 px-4 text-center bg-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-primary">Still Cooking... 🚧</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2 text-text">🎯 CTF Game</h3>
              <p className="text-muted">Hidden flags throughout the site</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2 text-text">💼 Experience Timeline</h3>
              <p className="text-muted">Interactive career journey</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2 text-text">📞 Contact Portal</h3>
              <p className="text-muted">Get in touch with style!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <PortfolioPage />
    </ThemeProvider>
  );
}