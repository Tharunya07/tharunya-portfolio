// app/projects/page.tsx
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Header } from '@/components/layout/header';
import { ProjectSandboxes } from '@/components/sections/project-sandboxes';
import { TechStack } from '@/components/sections/tech-stack';
import { Footer } from '@/components/layout/footer';

function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-text transition-colors duration-300">
      <Header />
      
      {/* Project Demonstrations */}
      <ProjectSandboxes />
      
      {/* Tech Stack */}
      <TechStack />

      <Footer />
    </div>
  );
}

export default function Projects() {
  return (
    <ThemeProvider>
      <ProjectsPage />
    </ThemeProvider>
  );
}