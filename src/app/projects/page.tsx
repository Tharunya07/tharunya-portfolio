// app/projects/page.tsx
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Header } from '@/components/layout/header';
import { Projects } from '@/components/sections/projects';
import { TechStack } from '@/components/sections/tech-stack';
import { Footer } from '@/components/layout/footer';

function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-text transition-colors duration-300">
      <Header />
      
      {/* Reduced top spacing */}
      <div className="pt-4">
        {/* Projects Section */}
        <Projects />
        
        {/* Tech Stack */}
        <TechStack />
      </div>

      <Footer />
    </div>
  );
}

export default function ProjectsPageWrapper() {
  return (
    <ThemeProvider>
      <ProjectsPage />
    </ThemeProvider>
  );
}